import {
  profile, socials, doList, techStack, proficiency,
  education, experience, highlights, languageColor,
} from './data.js';
import { fetchRepos, sortRepos, filterByLanguage, languageCounts } from './github.js';

/* -------------------- helpers -------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
};
const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
const relTime = (iso) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [
    [60, 'second'], [60, 'minute'], [24, 'hour'],
    [30, 'day'], [12, 'month'], [Infinity, 'year'],
  ];
  let val = diff;
  for (const [f, label] of units) {
    if (val < f) {
      const n = Math.max(1, Math.round(val));
      return `${n} ${label}${n === 1 ? '' : 's'} ago`;
    }
    val /= f;
  }
  return '';
};

/* -------------------- theme -------------------- */
function initTheme() {
  const btn = $('#themeToggle');
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* -------------------- header / nav -------------------- */
function initHeader() {
  const header = $('#siteHeader');
  const menuBtn = $('#menuBtn');
  const nav = $('.nav');
  const navLinks = $$('.nav-list a');

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.forEach((l) =>
    l.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );

  // Scrollspy
  const sections = ['about', 'skills', 'experience', 'projects', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

/* -------------------- hero typing -------------------- */
function initHeroSub() {
  const target = $('#heroSub');
  const text = profile.summary;
  target.innerHTML = '';
  const caret = el('span', { class: 'caret' });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    target.textContent = text;
    return;
  }
  target.append(caret);
  let i = 0;
  const tick = () => {
    if (i >= text.length) return;
    caret.before(text.charAt(i));
    i++;
    setTimeout(tick, 14 + Math.random() * 22);
  };
  setTimeout(tick, 250);
}

/* -------------------- socials -------------------- */
function initSocials() {
  const row = $('#socialRow');
  const mini = $('#miniSocial');
  const footer = $('#footerSocial');
  socials.forEach((s) => {
    const make = () =>
      el(
        'a',
        {
          href: s.url,
          target: s.url.startsWith('http') ? '_blank' : '',
          rel: 'noopener noreferrer',
          'aria-label': s.name,
          title: s.name,
          html: s.icon,
        }
      );
    row.append(el('li', {}, make()));
    mini.append(el('li', {}, make()));
    footer.append(el('li', {}, make()));
  });
}

/* -------------------- avatar -------------------- */
function initAvatar() {
  const img = $('#heroAvatar');
  img.src = profile.avatar;
  img.alt = profile.name;
  img.addEventListener('error', () => {
    img.replaceWith(el('div', { class: 'avatar-fallback', html: 'GS' }));
  }, { once: true });
}

/* -------------------- skills -------------------- */
const boltSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';

function renderSkills() {
  const list = $('#doList');
  doList.forEach((text) => {
    list.append(
      el('li', {},
        el('span', { class: 'bolt', html: boltSvg, 'aria-hidden': 'true' }),
        el('span', {}, text)
      )
    );
  });

  const grid = $('#techGrid');
  techStack.forEach((t) => {
    grid.append(
      el('div', { class: 'tech', title: t.name },
        el('i', { class: t.icon, 'aria-hidden': 'true' }),
        el('span', {}, t.name)
      )
    );
  });

  const bars = $('#proficiencyBars');
  proficiency.forEach((p) => {
    const fill = el('span', { class: 'bar-fill' });
    bars.append(
      el('li', { class: 'bar-item' },
        el('div', { class: 'bar-head' },
          el('strong', {}, p.name),
          el('span', {}, p.value + '%')
        ),
        el('div', { class: 'bar-track' }, fill)
      )
    );
    // Animate width when bars enter viewport
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill.style.width = p.value + '%';
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(fill);
  });
}

/* -------------------- education & experience -------------------- */
function renderTimeline(targetId, items, opts = {}) {
  const ol = $(targetId);
  items.forEach((item) => {
    const card = el('div', { class: 't-card' },
      el('div', { class: 't-head' },
        el('div', {},
          el('div', { class: 't-role' }, opts.role ? item[opts.role] : item.role || item.degree),
          el('div', { class: 't-org' }, opts.org ? item[opts.org] : item.company || item.school)
        ),
        el('div', { class: 't-date' }, item.date)
      ),
      item.desc ? el('p', { class: 't-desc' }, item.desc) : null,
      item.bullets && item.bullets.length
        ? el('ul', { class: 't-bullets' }, ...item.bullets.map((b) => el('li', {}, b)))
        : null
    );
    ol.append(el('li', {}, card));
  });
}

/* -------------------- highlights -------------------- */
function renderHighlights() {
  const grid = $('#highlightGrid');
  highlights.forEach((h) => {
    grid.append(
      el('article', { class: 'h-card reveal' },
        el('div', { class: 'emblem', 'aria-hidden': 'true' }, h.badge),
        el('h3', {}, h.title),
        el('p', {}, h.desc),
        el('div', { class: 'h-links' },
          ...h.links.map((l) =>
            el('a', { href: l.url, target: '_blank', rel: 'noopener' }, l.label,
              el('span', { html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>' })
            )
          )
        )
      )
    );
  });
}

/* -------------------- projects -------------------- */
const state = {
  repos: [],
  language: 'All',
  sort: 'updated',
};

const repoIconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
const starSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>';
const forkSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>';
const extSvg = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

function renderProjects() {
  const grid = $('#projectsGrid');
  const stateEl = $('#projectsState');
  const visible = sortRepos(filterByLanguage(state.repos, state.language), state.sort);

  grid.innerHTML = '';
  stateEl.textContent = '';

  if (visible.length === 0) {
    stateEl.textContent = 'No repositories match this filter.';
    return;
  }

  visible.forEach((r) => grid.append(renderRepoCard(r)));
  requestAnimationFrame(() => {
    $$('.repo-card', grid).forEach((card, i) => {
      card.style.animation = `fadeUp 0.5s var(--ease-out) ${Math.min(i * 40, 400)}ms both`;
    });
  });
}

function renderRepoCard(r) {
  const langColor = r.language ? (languageColor[r.language] || 'var(--accent)') : 'transparent';

  const header = el('div', { class: 'repo-head' },
    el('span', { class: 'repo-icon', html: repoIconSvg }),
    el('div', {},
      el('div', { class: 'repo-name' }, r.name),
      el('div', { class: 'repo-updated', style: 'font-size:0.76rem;color:var(--text-muted)' },
        'Updated ' + relTime(r.pushedAt))
    )
  );

  const desc = el('p', { class: 'repo-desc' }, r.description || 'No description provided.');

  const topics = r.topics.length
    ? el('div', { class: 'repo-topics' },
        ...r.topics.slice(0, 5).map((t) => el('span', { class: 'topic' }, t)))
    : null;

  const meta = el('div', { class: 'repo-meta' },
    r.language
      ? el('span', { class: 'lang' },
          el('span', { class: 'lang-dot', style: `background:${langColor}` }),
          r.language)
      : el('span', { class: 'lang', style: 'color:var(--text-muted)' }, '—'),
    el('div', { class: 'repo-stats' },
      el('span', { html: starSvg, title: 'Stars' }, ' ' + r.stars),
      el('span', { html: forkSvg, title: 'Forks' }, ' ' + r.forks)
    )
  );

  const actions = el('div', { class: 'repo-actions' },
    el('a', { href: r.url, target: '_blank', rel: 'noopener', class: 'primary', onclick: (e) => e.stopPropagation() },
      'Code', el('span', { html: extSvg })),
    r.homepage
      ? el('a', { href: r.homepage, target: '_blank', rel: 'noopener', onclick: (e) => e.stopPropagation() },
          'Live demo', el('span', { html: extSvg }))
      : null
  );

  const card = el('article',
    {
      class: 'repo-card',
      tabindex: '0',
      role: 'button',
      'aria-label': `Open details for ${r.name}`,
      onclick: () => openRepoModal(r),
      onkeydown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRepoModal(r); }
      },
    },
    header, desc, topics, meta, actions
  );
  return card;
}

function renderLanguageChips() {
  const chips = $('#languageChips');
  chips.innerHTML = '';
  const langs = languageCounts(state.repos);

  const make = (name, count, isActive) =>
    el('button', {
      class: 'chip' + (isActive ? ' active' : ''),
      type: 'button',
      onclick: () => {
        state.language = name;
        renderLanguageChips();
        renderProjects();
      },
    }, name, count != null ? el('span', { class: 'count' }, count) : null);

  chips.append(make('All', state.repos.length, state.language === 'All'));
  langs.forEach((l) => chips.append(make(l.name, l.count, state.language === l.name)));
}

function renderSkeletons(count = 6) {
  const grid = $('#projectsGrid');
  grid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const sk = el('article', { class: 'repo-card skeleton', 'aria-hidden': 'true' },
      el('div', { class: 'repo-head' }, el('span', { class: 'bar', style: 'width:40%;height:16px' })),
      el('div', { class: 'bar', style: 'width:90%' }),
      el('div', { class: 'bar', style: 'width:70%' }),
      el('div', { class: 'bar', style: 'width:50%' })
    );
    grid.append(sk);
  }
}

async function initProjects() {
  const stateEl = $('#projectsState');
  const sortSel = $('#sortSelect');

  sortSel.addEventListener('change', () => {
    state.sort = sortSel.value;
    renderProjects();
  });

  renderSkeletons();
  stateEl.textContent = 'Loading the latest from github.com/' + profile.handle + '…';

  try {
    const repos = await fetchRepos(profile.handle);
    state.repos = repos;
    renderLanguageChips();
    renderProjects();
    if (repos.length === 0) {
      stateEl.textContent = 'No public repositories found.';
    }
  } catch (err) {
    stateEl.className = 'projects-state error';
    stateEl.innerHTML =
      `<strong>Couldn't load GitHub repositories.</strong><br>${err.message} ` +
      `<a href="https://github.com/${profile.handle}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Open GitHub</a>`;
    $('#projectsGrid').innerHTML = '';
  }
}

/* -------------------- modal -------------------- */
const modal = $('#repoModal');
function openRepoModal(r) {
  $('#modalTitle').textContent = r.name;
  $('#modalDesc').textContent = r.description || 'No description provided.';
  const meta = $('#modalMeta');
  meta.innerHTML = '';
  const langColor = r.language ? (languageColor[r.language] || 'var(--accent)') : null;
  if (r.language) {
    meta.append(el('span', { class: 'chip' },
      el('span', { class: 'lang-dot', style: `display:inline-block;margin-right:6px;background:${langColor}` }),
      r.language));
  }
  meta.append(el('span', { class: 'chip', html: `${starSvg} ${r.stars} stars` }));
  meta.append(el('span', { class: 'chip', html: `${forkSvg} ${r.forks} forks` }));
  if (r.license) meta.append(el('span', { class: 'chip' }, r.license));
  meta.append(el('span', { class: 'chip' }, 'Updated ' + relTime(r.pushedAt)));
  r.topics.slice(0, 6).forEach((t) => meta.append(el('span', { class: 'topic' }, t)));

  const actions = $('#modalActions');
  actions.innerHTML = '';
  actions.append(el('a', { class: 'btn btn-primary', href: r.url, target: '_blank', rel: 'noopener' },
    'View on GitHub', el('span', { html: extSvg })));
  if (r.homepage) {
    actions.append(el('a', { class: 'btn btn-outline', href: r.homepage, target: '_blank', rel: 'noopener' },
      'Live demo', el('span', { html: extSvg })));
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('[data-close]').focus();
}
function closeRepoModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}
function initModal() {
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]')) closeRepoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeRepoModal();
  });
}

/* -------------------- contact form -------------------- */
function initContactForm() {
  const form = $('#contactForm');
  const note = $('#formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    $$('.field', form).forEach((f) => f.classList.remove('invalid'));
    let ok = true;
    if (!name) { form.querySelector('#cf-name').closest('.field').classList.add('invalid'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.querySelector('#cf-email').closest('.field').classList.add('invalid'); ok = false; }
    if (!message) { form.querySelector('#cf-message').closest('.field').classList.add('invalid'); ok = false; }
    if (!ok) {
      note.textContent = 'Please fill in the highlighted fields.';
      note.className = 'form-note err';
      return;
    }

    // No backend — open the user's mail client with a prefilled draft.
    const subject = `Hello from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app — thanks!';
    note.className = 'form-note ok';
    form.reset();
  });
}

/* -------------------- reveal on scroll -------------------- */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$('.reveal').forEach((n) => io.observe(n));
}

/* -------------------- footer year -------------------- */
function initFooter() {
  $('#year').textContent = new Date().getFullYear();
}

/* -------------------- inject keyframes for card stagger -------------------- */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .avatar-fallback {
    width: 100%; height: 100%; border-radius: 50%;
    display: grid; place-items: center; background: var(--grad);
    color: #fff; font-weight: 700; font-size: 4rem;
    border: 4px solid var(--bg);
  }
`;
document.head.append(styleTag);

/* -------------------- bootstrap -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initAvatar();
  initHeroSub();
  initSocials();
  renderSkills();
  renderTimeline('#educationTimeline', education);
  renderTimeline('#experienceTimeline', experience);
  renderHighlights();
  initModal();
  initContactForm();
  initFooter();
  initReveal();
  initProjects();
});
