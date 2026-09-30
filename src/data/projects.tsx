import {
  Activity,
  Accessibility,
  Database,
  FileSearch,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Smartphone,
  TestTube2,
} from "lucide-react";
import { ReactNode } from "react";

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: ReactNode;
  github?: string;
  live: string;
  isDemo: boolean;
};

const icon = (Icon: typeof TestTube2) => <Icon className="size-full" />;

const skills = {
  playwright: { title: "Playwright", bg: "#2e8b57", fg: "#fff", icon: icon(TestTube2) },
  typescript: { title: "TypeScript", bg: "#3178c6", fg: "#fff", icon: icon(FileSearch) },
  github: { title: "GitHub Actions", bg: "#24292f", fg: "#fff", icon: icon(GitBranch) },
  react: { title: "React", bg: "#20232a", fg: "#61dafb", icon: icon(LayoutDashboard) },
  node: { title: "Node.js", bg: "#3c873a", fg: "#fff", icon: icon(Activity) },
  postgres: { title: "PostgreSQL", bg: "#336791", fg: "#fff", icon: icon(Database) },
  api: { title: "API Testing", bg: "#7c3aed", fg: "#fff", icon: icon(Activity) },
  mobile: { title: "Mobile QA", bg: "#0f766e", fg: "#fff", icon: icon(Smartphone) },
  accessibility: { title: "Accessibility", bg: "#b45309", fg: "#fff", icon: icon(Accessibility) },
  performance: { title: "Performance", bg: "#be123c", fg: "#fff", icon: icon(Gauge) },
};

const mockup = (title: string, accent: string, labels: string[]) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#0b1220"/><stop offset="1" stop-color="#172554"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#background)"/>
      <rect x="52" y="46" width="1096" height="708" rx="24" fill="#101827" stroke="#334155" stroke-width="2"/>
      <rect x="52" y="46" width="1096" height="68" rx="24" fill="#172033"/>
      <circle cx="92" cy="80" r="9" fill="#f87171"/><circle cx="122" cy="80" r="9" fill="#fbbf24"/><circle cx="152" cy="80" r="9" fill="#34d399"/>
      <text x="198" y="88" fill="#e2e8f0" font-size="24" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <rect x="82" y="146" width="238" height="568" rx="16" fill="#172033"/>
      <rect x="108" y="180" width="128" height="16" rx="8" fill="${accent}"/>
      ${labels.map((label, index) => `<rect x="108" y="${236 + index * 58}" width="164" height="14" rx="7" fill="#475569"/><text x="108" y="${278 + index * 58}" fill="#94a3b8" font-size="14" font-family="Arial, sans-serif">${label}</text>`).join("")}
      <rect x="356" y="146" width="760" height="150" rx="16" fill="#172033"/>
      <text x="390" y="190" fill="#94a3b8" font-size="16" font-family="Arial, sans-serif">DEMO PLACEHOLDER</text>
      <text x="390" y="242" fill="#f8fafc" font-size="32" font-family="Arial, sans-serif" font-weight="700">Quality overview</text>
      <rect x="390" y="316" width="214" height="160" rx="16" fill="#172033"/><rect x="628" y="316" width="214" height="160" rx="16" fill="#172033"/><rect x="866" y="316" width="214" height="160" rx="16" fill="#172033"/>
      <text x="414" y="356" fill="#94a3b8" font-size="15" font-family="Arial, sans-serif">PASS RATE</text><text x="414" y="424" fill="${accent}" font-size="48" font-family="Arial, sans-serif" font-weight="700">96%</text>
      <text x="652" y="356" fill="#94a3b8" font-size="15" font-family="Arial, sans-serif">OPEN ISSUES</text><text x="652" y="424" fill="#fbbf24" font-size="48" font-family="Arial, sans-serif" font-weight="700">12</text>
      <text x="890" y="356" fill="#94a3b8" font-size="15" font-family="Arial, sans-serif">RUNS</text><text x="890" y="424" fill="#60a5fa" font-size="48" font-family="Arial, sans-serif" font-weight="700">248</text>
      <rect x="356" y="506" width="760" height="208" rx="16" fill="#172033"/>
      <path d="M396 660 C470 610 500 670 570 600 S700 640 760 574 S910 620 1068 548" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <line x1="396" y1="682" x2="1068" y2="682" stroke="#334155" stroke-width="2"/>
    </svg>
  `)}`;

const DemoNote = () => (
  <div className="mb-8 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-200">
    Demo placeholder: this example is included to demonstrate the project layout and should be replaced with Yousif&apos;s real work.
  </div>
);

const ProjectStory = ({
  overview,
  responsibilities,
  achievements,
}: {
  overview: string;
  responsibilities: string[];
  achievements: string[];
}) => (
  <div className="space-y-8 text-muted-foreground">
    <DemoNote />
    <section>
      <h5 className="mb-3 text-lg font-semibold text-foreground">Overview</h5>
      <p className="leading-relaxed">{overview}</p>
    </section>
    <section>
      <h5 className="mb-3 text-lg font-semibold text-foreground">Example responsibilities</h5>
      <ul className="list-disc space-y-2 pl-5 leading-relaxed">
        {responsibilities.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
    <section>
      <h5 className="mb-3 text-lg font-semibold text-foreground">Example achievements</h5>
      <ul className="list-disc space-y-2 pl-5 leading-relaxed">
        {achievements.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  </div>
);

const projects: Project[] = [
  {
    id: "release-readiness-demo",
    category: "Demo QA dashboard",
    title: "Release Readiness Dashboard",
    src: mockup("Release Readiness", "#38bdf8", ["Overview", "Test runs", "Risks", "Releases"]),
    screenshots: [],
    skills: { frontend: [skills.react, skills.typescript], backend: [skills.node, skills.postgres] },
    github: "https://example.com",
    live: "https://example.com",
    isDemo: true,
    content: <ProjectStory overview="A sample release-quality workspace that brings automated test status, open defects, and delivery risks into one reviewable view." responsibilities={["Defined release gates for critical customer journeys.", "Organized smoke, regression, and exploratory test evidence.", "Prepared concise go/no-go summaries for stakeholders."]} achievements={["Demonstrates a consistent way to communicate release confidence.", "Shows how QA signals can be grouped by severity and ownership.", "Provides a realistic example of dashboard-oriented project content."]} />,
  },
  {
    id: "test-case-demo",
    category: "Demo test management",
    title: "Test Case Workspace",
    src: mockup("Test Case Workspace", "#a78bfa", ["Suites", "Cases", "Runs", "Reports"]),
    screenshots: [],
    skills: { frontend: [skills.react, skills.typescript], backend: [skills.node, skills.postgres] },
    github: "https://example.com",
    live: "https://example.com",
    isDemo: true,
    content: <ProjectStory overview="A demo workspace for arranging test scenarios, linking evidence, and tracking execution across a release cycle." responsibilities={["Created test cases from acceptance criteria and edge cases.", "Grouped coverage by feature, risk, and platform.", "Reviewed test results with product and engineering partners."]} achievements={["Illustrates a full test-case lifecycle in a project dialog.", "Demonstrates technology chips for both client and service layers.", "Keeps the card, modal, and scrolling detail interactions exercised."]} />,
  },
  {
    id: "mobile-checkout-demo",
    category: "Demo mobile QA",
    title: "Mobile Checkout QA Lab",
    src: mockup("Mobile Checkout QA", "#34d399", ["Devices", "Cart", "Payment", "Orders"]),
    screenshots: [],
    skills: { frontend: [skills.mobile, skills.typescript], backend: [skills.api, skills.node] },
    github: "https://example.com",
    live: "https://example.com",
    isDemo: true,
    content: <ProjectStory overview="A sample mobile-commerce quality initiative covering responsive checkout behavior, payment scenarios, and post-order confirmation." responsibilities={["Documented device and browser coverage for high-risk flows.", "Tested error messages, recovery paths, and interrupted payments.", "Reported findings with recordings and precise reproduction steps."]} achievements={["Demonstrates how mobile QA work can be represented in a portfolio.", "Includes realistic quality responsibilities without representing real client work.", "Preserves the animated project-card experience across varied categories."]} />,
  },
  {
    id: "api-monitor-demo",
    category: "Demo API quality",
    title: "API Health Monitor",
    src: mockup("API Health Monitor", "#fb7185", ["Endpoints", "Contracts", "Alerts", "History"]),
    screenshots: [],
    skills: { frontend: [skills.typescript, skills.react], backend: [skills.api, skills.postgres] },
    github: "https://example.com",
    live: "https://example.com",
    isDemo: true,
    content: <ProjectStory overview="A placeholder project for monitoring API availability, response contracts, and reliability trends across connected services." responsibilities={["Outlined contract checks for successful and failing responses.", "Defined alert thresholds for availability and response-time regressions.", "Validated error handling and data integrity with representative test data."]} achievements={["Shows an API-focused example alongside UI testing work.", "Demonstrates a project narrative with measurable-looking quality signals.", "Keeps the technology dock populated with relevant tools."]} />,
  },
  {
    id: "accessibility-demo",
    category: "Demo accessibility review",
    title: "Accessibility Review Toolkit",
    src: mockup("Accessibility Review", "#fbbf24", ["Audits", "Keyboard", "Contrast", "Findings"]),
    screenshots: [],
    skills: { frontend: [skills.accessibility, skills.react], backend: [skills.typescript, skills.github] },
    github: "https://example.com",
    live: "https://example.com",
    isDemo: true,
    content: <ProjectStory overview="A sample accessibility review workflow that helps teams record findings, verify keyboard paths, and track remediation progress." responsibilities={["Checked keyboard navigation, focus behavior, and semantic structure.", "Reviewed colour contrast and accessible error feedback.", "Converted findings into actionable issues for delivery teams."]} achievements={["Adds an accessibility-focused example to the demo portfolio.", "Demonstrates detailed project content with responsibilities and outcomes.", "Preserves the responsive dialog layout for longer content."]} />,
  },
  {
    id: "defect-triage-demo",
    category: "Demo defect workflow",
    title: "Defect Triage Workspace",
    src: mockup("Defect Triage", "#f97316", ["Inbox", "Priority", "Owners", "Trends"]),
    screenshots: [],
    skills: { frontend: [skills.react, skills.typescript], backend: [skills.node, skills.postgres] },
    github: "https://example.com",
    live: "https://example.com",
    isDemo: true,
    content: <ProjectStory overview="A demo defect-management view for sorting incoming issues, assessing customer impact, and tracking follow-up through resolution." responsibilities={["Classified issues by severity, reproducibility, and affected user flow.", "Prepared concise triage notes for engineering handoff.", "Reviewed trends to identify recurring quality risks."]} achievements={["Completes the project grid with a realistic QA operations example.", "Exercises external-link controls using safe example destinations.", "Makes clear that all content is temporary demonstration material."]} />,
  },
];

export default projects;
