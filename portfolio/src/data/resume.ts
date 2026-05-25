import {
  Activity,
  Briefcase,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Server,
  Terminal,
  Container,
  Cloud,
  Workflow,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

export const profile = {
  name: 'Sai Hitesh Gorantla',
  handle: 'GSHitesh',
  role: 'Software Engineer',
  tagline: 'Backend systems · API integration · Automation',
  location: 'Bengaluru, Karnataka',
  email: 'gorantlahitesh01@gmail.com',
  phone: '+91 ••••• •3807',
  socials: {
    github: 'https://github.com/GSHitesh',
    linkedin: 'https://linkedin.com/in/sai-hitesh-gorantla',
    email: 'mailto:gorantlahitesh01@gmail.com',
  },
  summary:
    'Software engineer with 2+ years of experience in back-end systems, API integration, and automation. Proficient in Python, Django, Docker, and microservices architecture, with a proven ability to design scalable and efficient solutions. Skilled in CI/CD pipelines, Agile methodologies, and solving complex technical challenges.',
  highlights: [
    { label: 'Years building backends', value: '2+' },
    { label: 'Engineering efficiency lifted', value: '+6%' },
    { label: 'Gateway cost saved', value: '₹50L+' },
    { label: 'Commission uplift', value: '+2.5%' },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  bullets: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: 'Hewlett Packard Enterprise',
    role: 'System Engineer 2',
    period: 'Feb 2024 — Present',
    location: 'Bengaluru, Karnataka',
    bullets: [
      'Streamlined build processes by integrating Slack with Jenkins, enabling email notifications and boosting engineering efficiency by 6%.',
      'Deployed automated OS installations across nodes, reducing manual efforts and accelerating system deployment.',
      'Rectified environmental inconsistencies, ensuring adherence to organizational standards and minimizing downtime.',
      'Resolved critical infrastructure defects, improving system reliability and operational stability.',
      'Mentored team members on best practices, fostering a collaborative and high-performing environment.',
    ],
    stack: ['Python', 'Jenkins', 'Slack API', 'Linux', 'Bash', 'CI/CD'],
  },
  {
    company: 'ITILITE Technologies',
    role: 'Associate Software Engineer',
    period: 'Sept 2022 — Feb 2024',
    location: 'Bengaluru, Karnataka',
    bullets: [
      'Designed and developed APIs for seamless client integration, enhancing connectivity and operational efficiency.',
      'Implemented SOAP API integration with a Terminal Service OT travel vendor, increasing company commissions by 2.5%.',
      'Migrated credit card data securely to GDS Smartpoint using Django and SOAP API, reducing payment gateway expenses by ₹50L+.',
      'Troubleshot and resolved production issues in hotel and bus bookings, achieving a 20% boost in operational performance.',
      'Optimized hotel refund categorization and cancellation policies using Python, reducing customer inquiries.',
      'Developed SQL-based financial tracking systems for monthly expense monitoring, enhancing client decision-making.',
    ],
    stack: ['Python', 'Django', 'SOAP', 'REST', 'MySQL', 'Docker'],
  },
];

export type Project = {
  title: string;
  date: string;
  description: string;
  bullets: string[];
  stack: string[];
  accent: 'violet' | 'cyan' | 'pink' | 'lime';
  href?: string;
};

export const projects: Project[] = [
  {
    title: 'Recipe Sharing Platform',
    date: 'October 2023',
    description:
      'A robust Django REST API powering a recipe sharing community with profiles, search, and secure auth.',
    bullets: [
      'Engineered a Django REST API enabling user registration and rich interaction.',
      'Built user profiles, fuzzy search, and JWT-secured authentication flows.',
      'Containerized with Docker, deployed on AWS, with full Postman API docs.',
    ],
    stack: ['Python', 'Django REST', 'Docker', 'AWS', 'PostgreSQL'],
    accent: 'violet',
  },
  {
    title: 'Encrypto · Simplified File Encryption',
    date: 'September 2021',
    description:
      'A zero-install web app for client-side AES file encryption with a built-in strong password generator.',
    bullets: [
      'AES-based encryption pipeline running fully in the browser via CryptoJS.',
      'Integrated secure password generator to assist key creation.',
      'Polished UX focused on a one-click encrypt/decrypt workflow.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'CryptoJS'],
    accent: 'cyan',
  },
];

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Scripting',
    icon: Code2,
    items: ['Python', 'C++', 'Bash', 'Shell Scripting', 'SQL'],
  },
  {
    title: 'Frameworks',
    icon: Server,
    items: ['Django', 'Django REST', 'Flask'],
  },
  {
    title: 'CI/CD & DevOps',
    icon: Workflow,
    items: ['Jenkins', 'Git', 'JFrog Artifactory', 'Docker', 'Postman'],
  },
  {
    title: 'Observability',
    icon: Activity,
    items: ['Grafana', 'Prometheus', 'Loki', 'Zabbix'],
  },
  {
    title: 'Infrastructure & Hardware',
    icon: Cpu,
    items: ['iLO', 'Hypervisors', 'Bare-metal Systems', 'HPCM', 'Linux (RHEL · Rocky · SLES)'],
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL'],
  },
  {
    title: 'Collaboration',
    icon: Container,
    items: ['Jira', 'Confluence', 'Agile / Scrum'],
  },
];

export const skillIcons: Record<string, LucideIcon> = {
  Backend: Server,
  API: GitBranch,
  Automation: Terminal,
  Cloud: Cloud,
  Security: ShieldCheck,
  Work: Briefcase,
};

export const education = [
  {
    school: 'Vellore Institute of Technology',
    degree: 'Bachelor of Technology — Information Technology',
    period: 'July 2019 — June 2023',
    location: 'Vellore, Tamil Nadu',
  },
];

export const certifications = [
  {
    title: 'Meta Back-End Developer Professional Certificate',
    issuer: 'Coursera · Meta',
    year: '2023',
  },
  {
    title: 'Artificial Intelligence Foundations',
    issuer: 'NASSCOM',
    year: '2021',
  },
  {
    title: 'The Web Developer Bootcamp',
    issuer: 'Udemy',
    year: '2021',
  },
];
