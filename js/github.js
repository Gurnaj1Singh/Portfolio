// GitHub API integration — fetches public repos, caches in sessionStorage for 30 min.

const CACHE_KEY = 'gh_repos_v1';
const CACHE_TTL_MS = 30 * 60 * 1000;

export async function fetchRepos(username) {
  const cached = readCache();
  if (cached && cached.user === username) return cached.repos;

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('GitHub API rate limit reached. Please try again in a bit.');
    }
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const raw = await res.json();
  const repos = raw
    .filter((r) => !r.fork && !r.archived && !r.private)
    .map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      watchers: r.watchers_count,
      openIssues: r.open_issues_count,
      topics: r.topics || [],
      updatedAt: r.updated_at,
      pushedAt: r.pushed_at,
      createdAt: r.created_at,
      size: r.size,
      license: r.license?.spdx_id,
    }));

  writeCache(username, repos);
  return repos;
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(user, repos) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ user, repos, ts: Date.now() }));
  } catch {
    // Cache write is best-effort — ignore quota errors.
  }
}

export function sortRepos(repos, key) {
  const arr = [...repos];
  switch (key) {
    case 'stars':
      return arr.sort((a, b) => b.stars - a.stars || b.forks - a.forks);
    case 'forks':
      return arr.sort((a, b) => b.forks - a.forks || b.stars - a.stars);
    case 'name':
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'updated':
    default:
      return arr.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));
  }
}

export function filterByLanguage(repos, language) {
  if (!language || language === 'All') return repos;
  return repos.filter((r) => r.language === language);
}

export function languageCounts(repos) {
  const counts = new Map();
  for (const r of repos) {
    if (!r.language) continue;
    counts.set(r.language, (counts.get(r.language) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}
