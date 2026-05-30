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
  resumeUrl: 'https://drive.google.com/file/d/1bALG9scCL53wAwPA5VFM_N4yXRSDOtyr/view?usp=sharing',
  socials: {
    github: 'https://github.com/GSHitesh',
    linkedin: 'https://linkedin.com/in/sai-hitesh-gorantla',
    email: 'mailto:gorantlahitesh01@gmail.com',
  },
  summary:
    'Results-driven Software Engineer with 2+ years delivering production back-end systems, REST/SOAP API integrations, and end-to-end automation. Proficient in Python, Django, Docker, and microservices, with a track record of shipping scalable services that cut cost and accelerate delivery. Strong across CI/CD (Jenkins, GitHub Actions, JFrog), observability (Grafana, Prometheus, Loki), and bare-metal Linux operations on RHEL, Rocky, and SLES.',
  highlights: [
    { label: 'Years building backends', value: '2+' },
    { label: 'Developer efficiency lifted', value: '~90%' },
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
      'Developed a custom Slack ChatOps bot to orchestrate multi-stage Jenkins pipelines and stream real-time alerts, boosting developer efficiency by ~90% by eliminating manual dashboard monitoring.',
      'Orchestrated infrastructure bring-up for compute and networking hardware, scripting post-deployment validations to ensure systems met strict baseline standards.',
      'Streamlined software delivery by building a parameterized RPM packaging framework and build/sign/publish pipeline, cutting onboarding timelines to under a day.',
      'Deployed comprehensive system observability (Grafana, Prometheus, Loki) alongside automated OS provisioning (RHEL, Rocky, SLES), enabling proactive failure mitigation across bare-metal and VM environments.',
      'Troubleshot and root-caused production issues using log analysis and staging reproduction; fed permanent fixes into the automated validation pipeline to eliminate recurrence.',
    ],
    stack: ['Python', 'Jenkins', 'Slack API', 'Docker', 'rpmbuild', 'JFrog', 'Grafana', 'Prometheus', 'Loki', 'iLO', 'HPCM', 'Linux', 'Bash', 'CI/CD'],
  },
  {
    company: 'ITILITE Technologies',
    role: 'Associate Software Engineer',
    period: 'Sept 2022 — Feb 2024',
    location: 'Bengaluru, Karnataka',
    bullets: [
      'Designed and shipped REST and SOAP APIs in Python/Django for partner integrations, strengthening client connectivity and unlocking new revenue channels.',
      'Integrated a SOAP API with a Terminal Service OT travel vendor, lifting company commissions by 2.5% on routed bookings.',
      'Migrated PCI credit-card data securely to GDS Smartpoint via Django and SOAP, eliminating ₹50L+ in annual payment-gateway expenses.',
      'Diagnosed and resolved production incidents across hotel and bus booking flows, driving a 20% gain in operational performance and SLA adherence.',
      'Refactored hotel refund categorization and cancellation logic in Python, reducing customer-support inquiries and improving refund-cycle accuracy.',
    ],
    stack: ['Python', 'Django', 'SOAP', 'REST', 'MySQL', 'Docker', 'GDS Smartpoint'],
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
    items: ['Python', 'C++', 'Bash', 'Shell Scripting', 'SQL', 'Groovy'],
  },
  {
    title: 'Frameworks',
    icon: Server,
    items: ['Django', 'Django REST', 'Flask'],
  },
  {
    title: 'APIs & Integration',
    icon: GitBranch,
    items: ['REST', 'SOAP', 'JSON', 'XML', 'Microservices', 'Postman', 'Webhooks'],
  },
  {
    title: 'CI/CD & DevOps',
    icon: Workflow,
    items: ['Jenkins', 'GitHub Actions', 'JFrog Artifactory', 'Docker', 'Ansible', 'Git', 'rpmbuild', 'Shell Automation'],
  },
  {
    title: 'Observability',
    icon: Activity,
    items: ['Grafana', 'Prometheus', 'Loki', 'Zabbix', 'Log Aggregation', 'Alerting'],
  },
  {
    title: 'Infrastructure & Hardware',
    icon: Cpu,
    items: ['HPE iLO', 'HPCM', 'Hypervisors', 'Bare-metal Provisioning', 'NIC & Switch Config', 'Linux (RHEL · Rocky · SLES)'],
  },
  {
    title: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'SQLite'],
  },
  {
    title: 'Cloud & Platforms',
    icon: Cloud,
    items: ['AWS (EC2 · S3 · IAM)', 'Linux', 'GitHub Pages'],
  },
  {
    title: 'Practices',
    icon: ShieldCheck,
    items: ['Agile / Scrum', 'Code Review', 'TDD', 'SDLC', 'Mentoring', 'Incident Response'],
  },
  {
    title: 'Collaboration',
    icon: Container,
    items: ['Jira', 'Confluence', 'Slack', 'GitHub'],
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
