export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  GCP = "gcp",
  VIM = "vim",
  VERCEL = "vercel",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: { id: 1, name: "js", label: "JavaScript", shortDescription: "Supports browser-side test utilities, assertions, and application behavior validation.", color: "#f0db4f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  [SkillNames.TS]: { id: 2, name: "ts", label: "TypeScript", shortDescription: "Adds reliable types to test automation, fixtures, page objects, and application code.", color: "#007acc", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  [SkillNames.HTML]: { id: 3, name: "html", label: "HTML", shortDescription: "Provides semantic structure for UI validation and accessibility testing.", color: "#e34c26", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  [SkillNames.CSS]: { id: 4, name: "css", label: "CSS", shortDescription: "Defines responsive presentation, visual states, and layout behavior across devices.", color: "#563d7c", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  [SkillNames.REACT]: { id: 5, name: "react", label: "React", shortDescription: "Builds component interfaces that can be tested at unit, integration, and UI levels.", color: "#61dafb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  [SkillNames.VUE]: { id: 6, name: "vue", label: "Vue", shortDescription: "Supports reactive interface development and component-focused quality checks.", color: "#41b883", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  [SkillNames.NEXTJS]: { id: 7, name: "nextjs", label: "Next.js", shortDescription: "Combines React application structure with server rendering, routing, and API capabilities.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  [SkillNames.TAILWIND]: { id: 8, name: "tailwind", label: "Tailwind", shortDescription: "Enables consistent responsive styling and rapid verification of design states.", color: "#38bdf8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  [SkillNames.NODEJS]: { id: 9, name: "nodejs", label: "Node.js", shortDescription: "Runs automation utilities, test services, and JavaScript tooling outside the browser.", color: "#6cc24a", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  [SkillNames.EXPRESS]: { id: 10, name: "express", label: "Express", shortDescription: "Provides lightweight HTTP services for API testing and integration scenarios.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  [SkillNames.POSTGRES]: { id: 11, name: "postgres", label: "PostgreSQL", shortDescription: "Supports relational data validation, test-data preparation, and database checks.", color: "#336791", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  [SkillNames.MONGODB]: { id: 12, name: "mongodb", label: "MongoDB", shortDescription: "Supports document-data validation and flexible test-data workflows.", color: "#336791", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  [SkillNames.GIT]: { id: 13, name: "git", label: "Git", shortDescription: "Tracks code changes and keeps test work reviewable and reproducible.", color: "#f1502f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  [SkillNames.GITHUB]: { id: 14, name: "github", label: "GitHub", shortDescription: "Hosts source code, pull-request reviews, issues, and automated quality workflows.", color: "#000000", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  [SkillNames.PRETTIER]: { id: 15, name: "prettier", label: "Prettier", shortDescription: "Keeps source and test code consistently formatted across environments.", color: "#f7b93a", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg" },
  [SkillNames.NPM]: { id: 16, name: "npm", label: "NPM", shortDescription: "Manages JavaScript dependencies and repeatable project scripts.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  [SkillNames.FIREBASE]: { id: 17, name: "firebase", label: "Firebase", shortDescription: "Provides managed backend services for authentication and data-flow testing.", color: "#ffca28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  [SkillNames.WORDPRESS]: { id: 18, name: "wordpress", label: "WordPress", shortDescription: "Powers content-managed websites with testable themes, plugins, and publishing workflows.", color: "#007acc", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  [SkillNames.LINUX]: { id: 19, name: "linux", label: "Linux", shortDescription: "Provides stable environments for automation, diagnostics, and deployment.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  [SkillNames.DOCKER]: { id: 20, name: "docker", label: "Docker", shortDescription: "Creates repeatable application and test environments across local and CI systems.", color: "#2496ed", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  [SkillNames.NGINX]: { id: 21, name: "nginx", label: "NginX", shortDescription: "Routes web traffic and supports testing of proxy, caching, and deployment behavior.", color: "#008000", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  [SkillNames.AWS]: { id: 22, name: "aws", label: "AWS", shortDescription: "Provides cloud infrastructure for scalable application quality checks.", color: "#ff9900", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg" },
  [SkillNames.GCP]: { id: 25, name: "gcp", label: "Google Cloud", shortDescription: "Provides managed services for deployment, data, monitoring, and test environments.", color: "#4285f4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  [SkillNames.VIM]: { id: 23, name: "vim", label: "Vim", shortDescription: "Supports terminal-based editing for configuration, scripts, and diagnostics.", color: "#e34c26", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg" },
  [SkillNames.VERCEL]: { id: 24, name: "vercel", label: "Vercel", shortDescription: "Deploys web applications with preview environments suited to release verification.", color: "#6cc24a", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2024",
    endDate: "Present",
    title: "Software QA Engineer (Demo)",
    company: "Demo Commerce Platform",
    description: [
      "Designed a risk-based test plan for checkout, account, and order-management workflows.",
      "Built repeatable regression checklists that reduced manual release verification time.",
      "Logged clear defects with reproduction steps, expected results, and severity guidance.",
      "Partnered with developers and product stakeholders during sprint reviews and release readiness checks.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.JS,
      SkillNames.GIT,
      SkillNames.GITHUB,
      SkillNames.POSTGRES,
    ],
  },
  {
    id: 2,
    startDate: "2023",
    endDate: "2024",
    title: "QA Automation Specialist (Demo)",
    company: "Demo SaaS Workspace",
    description: [
      "Created smoke-test scenarios for authentication, permissions, and core collaboration flows.",
      "Introduced structured test data and environment checks to make test runs more reliable.",
      "Tracked quality trends across releases and shared concise risk summaries with the delivery team.",
      "Validated API contracts and UI behavior across desktop and mobile breakpoints.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.GIT,
    ],
  },
  {
    id: 3,
    startDate: "2022",
    endDate: "2023",
    title: "Quality Assurance Analyst (Demo)",
    company: "Demo Digital Services Team",
    description: [
      "Translated user stories into practical functional, usability, and acceptance test scenarios.",
      "Performed exploratory testing to identify edge cases before feature releases.",
      "Maintained a regression suite and documented release evidence for key user journeys.",
      "Helped teams prioritize defects by balancing user impact, frequency, and business risk.",
    ],
    skills: [
      SkillNames.HTML,
      SkillNames.CSS,
      SkillNames.JS,
      SkillNames.GIT,
      SkillNames.GITHUB,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

