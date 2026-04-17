// Personal data — extracted from the original DeveloperFolio bundle.
// Update here; everything else reads from this module.

export const profile = {
  name: 'Gurnaj Singh',
  handle: 'Gurnaj1Singh',
  title: 'Computer Science Student',
  tagline: 'Full-stack developer exploring AI & open-source technologies',
  summary:
    "Software Engineering student at NIT Jalandhar specializing in the intersection of Scalable Web Systems and Applied AI. Currently architecting high-performance backends with FastAPI and PostgreSQL, while researching Reinforcement Learning and Semantic Analysis to bridge the gap between robust software and intelligent automation.",
  location: 'Jalandhar, Punjab, India',
  email: 'gurnajsinghmann@gmail.com',
  phone: '+91-7717352608',
  resume: 'assets/files/resume.pdf',
  avatar: 'https://avatars.githubusercontent.com/Gurnaj1Singh',
};

export const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/Gurnaj1Singh',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gurnaj-singh/',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>',
  },
  {
    name: 'Email',
    url: 'mailto:gurnajsinghmann@gmail.com',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/24238406/gurnaj-singh-mann',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.36 20.25v-4.86h1.64V22H3v-6.61h1.63v4.86h12.73zM6.3 14.55l8 1.7.35-1.6-8-1.7-.35 1.6zm1.05-3.8l7.4 3.45.7-1.48-7.4-3.48-.7 1.5zm2.05-3.6l6.28 5.25 1.05-1.26L10.4 6l-1 1.16zM13.44 3.3 12.1 4.28 17 11l1.35-.96L13.44 3.3zM6.13 17.77h8.15v-1.64H6.13v1.64z"/></svg>',
  },
  {
    name: 'Kaggle',
    url: 'https://www.kaggle.com/gurnajsinghmann',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.235 0-.352-.117-.352-.352V.353C5.153.118 5.27 0 5.505 0h2.431c.234 0 .351.118.351.353v14.343l6.203-6.272c.165-.165.329-.246.492-.246h3.233c.141 0 .229.058.269.175.041.14.022.258-.059.351l-6.365 6.176 6.672 8.486c.093.128.11.257.093.492z"/></svg>',
  },
];

// "What I do" — skills section
export const professionalExperience = [
  {
    category: 'Full-Stack Orchestration',
    project: 'Assignment Master',
    description: 'Developed an end-to-end academic management ecosystem featuring automated workflow pipelines, role-based access control (RBAC), and complex state management for multi-user synchronization.',
    stack: ['React', 'Node.js', 'Redis', 'PostgreSQL'],
    complexity: 'High',
  },
  {
    category: 'Frontend Architecture',
    description: 'Architecting high-performance, responsive interfaces using React.js and Tailwind CSS, prioritizing component reusability and UX consistency.',
    stack: ['React', 'Tailwind CSS', 'Headless UI'],
  },
  {
    category: 'Backend & Systems',
    description: 'Engineering scalable RESTful microservices with FastAPI and optimizing relational schemas in MySQL for high-concurrency environments.',
    stack: ['FastAPI', 'MySQL', 'SQLAlchemy', 'Pydantic'],
  },
  {
    category: 'Computer Vision & AI',
    description: 'Implementing biometric security solutions, including real-time facial recognition and geofencing-based attendance verification systems.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
  },
];

// Tech stack — uses devicon icon classes (bundled via CDN).
export const techStack = [
  { name: 'HTML5', icon: 'devicon-html5-plain colored' },
  { name: 'CSS3', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'React', icon: 'devicon-react-original colored' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { name: 'Python', icon: 'devicon-python-plain colored' },
  { name: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
  { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-plain colored' },
  { name: 'OpenCV', icon: 'devicon-opencv-plain colored' },
  { name: 'Git', icon: 'devicon-git-plain colored' },
  { name: 'GitHub', icon: 'devicon-github-original' },
  { name: 'Docker', icon: 'devicon-docker-plain colored' },
  { name: 'Linux', icon: 'devicon-linux-plain colored' },
];

export const education = [
  {
    school: 'DR. B.R. Ambedkar National Institute of Technology, Jalandhar',
    degree: 'B.Tech in Computer Science & Engineering',
    date: 'Sep 2022 – Jun 2026',
    desc: 'Ongoing',
  },
  {
    school: 'St. Fateh Singh Convent School',
    degree: 'Higher Secondary (11th & 12th)',
    date: '2019 – 2021',
    desc: 'Graduated with an overall 90.8%.',
  },
  {
    school: "St. Xavier's High School",
    degree: 'Secondary Schooling (till 10th)',
    date: 'Till 2019',
    desc: 'Graduated with an overall 94%.',
  },
];

export const experience = [
  {
    role: 'Computer Science & Engineering',
    company: 'NIT Jalandhar',
    date: 'Aug 2022 – May 2026',
    desc: 'Specializing in Scalable Systems and Applied Machine Learning.',
    bullets: [
      'Architecting a Major Project: Semantic Plagiarism Detector utilizing SBERT models for deep contextual analysis and text embeddings.',
      'Developed a production-grade Biometric Attendance System integrating real-time Facial Recognition and location-based verification.',
      'Maintaining a 7.14 CGPA while completing advanced specializations in Machine Learning and Deep Learning (Andrew Ng).',
    ],
  },
  {
    role: 'Full-Stack & AI Engineer (Independent)',
    company: 'Project Lab · GitHub',
    date: '2023 – Present',
    desc: 'Engineering high-concurrency applications and autonomous AI agents.',
    bullets: [
      'Developed "Assignment Master," an ecosystem featuring RBAC, dynamic submission engines, and optimized PostgreSQL schemas using SQLAlchemy.',
      'Designing a Reinforcement Learning agent for Mini Militia, focusing on autonomous navigation and real-time decision-making for AI streaming.',
      'Engineered scalable REST APIs with FastAPI, implementing Dependency Injection and connection pooling for high-throughput environments.',
      'Managing a Linux-first development workflow, including automated security auditing and system-level scripting.',
    ],
  },
];

// Certifications — two sources merged at render time.
// `coursera` entries are enriched live from api.coursera.org (title, image,
// issuer, description). Only the three fields below are needed per entry.
// `manual` entries are shown as-is.
export const certifications = {
  coursera: [
    {
      slug: 'introduction-git-github',      // from coursera.org/learn/<slug>
      credentialId: 'WRT82BFXA4H3',         // from the verify URL
      completedOn: '2024-08-17',            // ISO date (YYYY-MM-DD)
      skills: [
        'Git',
        'GitHub',
        'Version Control',
        'Command-Line Interface',
        'Code Review',
        'Continuous Integration',
        'Collaborative Software',
      ],
    },
    {
      slug: 'machine-learning',      // from coursera.org/learn/<slug>
      credentialId: 'B2HVPNR52NY1',         // from the verify URL
      completedOn: '2025-08-21',            // ISO date (YYYY-MM-DD)
      skills: [
        'Jupyter',
        'Unsupervised Learning',
        'Artificial Intelligence',
        'Data Preprocessing',
        'Regression Analysis',
        'Predictive Modeling',
        'Python Programming',
        'Supervised Learning',
        'Machine Learning',
        'Classification Algorithms',
        'NumPy',
        'Scikit Learn (Machine Learning Library)',
      ],
    },
    {
      slug: 'advanced-learning-algorithms',      // from coursera.org/learn/<slug>
      credentialId: '9G1R1C9CT3QM',         // from the verify URL
      completedOn: '2025-12-25',            // ISO date (YYYY-MM-DD)
      skills: [
        'Logistic Regression',
        'Tensorflow',
        'Decision Tree Learning',
        'Machine Learning', 
        'Data Ethics',
        'Artificial Neural Networks',
        'Artificial Intelligence',
        'Random Forest Algorithm',
        'Performance Tuning',
        'Applied Machine Learning',
        'Classification Algorithms',
        'Transfer Learning',
      ],
    },
  ],
  manual: [
    // {
    //   title: 'Face Recognition Attendance System',
    //   issuer: 'NIT Jalandhar',
    //   date: '2025-01',
    //   url: 'https://...',              // credential / project link
    //   logo: null,                      // optional: 'assets/images/logo.png'
    //   skills: ['OpenCV', 'Python'],
    //   description: 'Short blurb describing what was accomplished.',
    // },
  ],
};

export const highlights = [
  {
    badge: 'CV',
    title: 'Face-Recognition Attendance System',
    desc: 'A full-stack hostel attendance workflow with face recognition via OpenCV + Python, plus location & time verification — paired with a React front-end and FastAPI back-end.',
    links: [
      { label: 'Repository', url: 'https://github.com/Gurnaj1Singh/Face-Recognition-based-attendance-system' },
    ],
  },
  {
    badge: '♞',
    title: 'React Chess Game',
    desc: 'A responsive chess game built with React and deployed on GitHub Pages — move validation, legal-move hints, and tidy UI.',
    links: [
      { label: 'Play', url: 'https://gurnaj1singh.github.io/chess/' },
      { label: 'Source', url: 'https://github.com/Gurnaj1Singh/chess' },
    ],
  },
  {
    badge: 'AUTH',
    title: 'Authentication System',
    desc: 'A sign-up / sign-in flow implementing session management and password best-practices — built as a learning project to understand auth end-to-end.',
    links: [
      { label: 'Repository', url: 'https://github.com/Gurnaj1Singh/Authentication-System' },
    ],
  },
];

// Colors for common languages in the project list.
export const languageColor = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Dart: '#00B4AB',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
};
