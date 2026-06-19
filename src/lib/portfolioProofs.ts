export interface ProofLevel {
  title: string;
  description: string;
  deliverables: string[];
  evaluationCriteria: string[];
}

export interface PortfolioProof {
  skillName: string;
  beginner: ProofLevel;
  intermediate: ProofLevel;
  advanced: ProofLevel;
}

export const portfolioProofs: Record<string, PortfolioProof> = {
  "HTML": {
    skillName: "HTML",
    beginner: {
      title: "Semantic Recipe Page",
      description: "Structure a detailed cooking recipe using HTML5 semantic elements (article, section, header, figure, time).",
      deliverables: ["No generic div wrappers used for layout", "Proper image alt text and figcaptions", "WAI-ARIA landmark tags included"],
      evaluationCriteria: ["HTML validates without warnings", "Document outlines properly in reader modes", "Contrast ratio is correct"]
    },
    intermediate: {
      title: "Structured Job Application Portal",
      description: "Build a comprehensive application form with inputs, validation states, fieldsets, and keyboard navigation.",
      deliverables: ["Keyboard tab index forms sequence", "Dynamic input types (tel, email, date)", "Labels linked with input IDs"],
      evaluationCriteria: ["Forms submit cleanly with native validations", "Accessible error announcements", "Responsive layouts"]
    },
    advanced: {
      title: "WAI-ARIA Accessible Site Blueprint",
      description: "Create a fully screen-reader accessible documentation site skeleton meeting WCAG 2.1 AAA benchmarks.",
      deliverables: ["Custom aria-expanded drawers and popups", "Skip-to-content links", "Screen reader live region status tags"],
      evaluationCriteria: ["100/100 Lighthouse Accessibility score", "VoiceOver reads layouts in correct chronological order", "No keyboard trap loops"]
    }
  },
  "CSS": {
    skillName: "CSS",
    beginner: {
      title: "Custom Tribute Page Layout",
      description: "Design a personal tribute page utilizing custom fonts, spacing rules, borders, and fluid styling blocks.",
      deliverables: ["Fluid padding and margin settings", "Clean custom web font integration", "Cohesive color scheme"],
      evaluationCriteria: ["No inline style overrides", "Responsive text sizing based on viewport sizes", "Clean stylesheet layouts"]
    },
    intermediate: {
      title: "CSS Grid Dashboard",
      description: "Build an complex dashboard landing page utilizing CSS Grid and Flexbox alignment properties.",
      deliverables: ["Dynamic layout columns that warp to smaller viewports", "CSS Custom Properties (Variables) for theming", "Flexbox navigation bars"],
      evaluationCriteria: ["Grid layouts adapt without media query overrides", "Consistent layout spacing ratios", "No layout overflow scrollbars"]
    },
    advanced: {
      title: "Themed SaaS Component Library Layout",
      description: "Produce a dark/light system architecture featuring custom animations, transitions, and hover-triggered glassmorphism cards.",
      deliverables: ["Prefers-color-scheme logic toggles", "Keyframe animations detailing button loads", "Responsive typography grids"],
      evaluationCriteria: ["Animation execution does not trigger layout reflows", "Modular variable architecture", "Zero accessibility color violations"]
    }
  },
  "JavaScript": {
    skillName: "JavaScript",
    beginner: {
      title: "Local Storage Habit Tracker",
      description: "Create a habit tracker app utilizing DOM manipulation and local storage saving cycles.",
      deliverables: ["Dynamic DOM lists creations and deletions", "Event listeners capturing checkboxes", "Local storage save/load logic"],
      evaluationCriteria: ["Clean model and UI state boundaries", "No global scope pollution", "Event delegation used on items"]
    },
    intermediate: {
      title: "Debounced API Weather Dashboard",
      description: "Develop a weather lookup search bar calling public APIs, featuring search debouncing and loading state animations.",
      deliverables: ["Async fetch api handler", "Custom input debounce wrapper", "Interactive data state overlays"],
      evaluationCriteria: ["Duplicate requests canceled safely", "Strict query input sanitization", "Graceful API fail recoveries"]
    },
    advanced: {
      title: "State-Driven Canvas Engine",
      description: "Construct a client-side vector drawing workspace managing drawing history, undo/redo states, and SVG exports.",
      deliverables: ["Internal state registry tracking shapes", "Undo/redo action stacks", "Vector export coordinates compiler"],
      evaluationCriteria: ["No memory leaks or dangling event bindings", "Zero performance lag on 100+ shapes", "Accurate export scales"]
    }
  },
  "React": {
    skillName: "React",
    beginner: {
      title: "Interactive Expense Tracker",
      description: "Build a client-side transaction logger that registers incomes/expenses, filters lists by category, and visualizes totals.",
      deliverables: ["State-driven item list with dynamic totals", "Category dropdown filtering & deletion utility", "Clean browser storage synchronization"],
      evaluationCriteria: ["No direct DOM manipulation in code", "Correct usage of useState and useEffect hooks", "Proper key attributes on map render elements"]
    },
    intermediate: {
      title: "System Admin Dashboard",
      description: "Develop a multi-view dashboard fetching and rendering metrics from a public API, containing charts, search filters, and profile forms.",
      deliverables: ["Responsive sidebar navigation grid layout", "Interactive data chart displaying API metrics", "Validating settings forms with status feed"],
      evaluationCriteria: ["Consistent global layout styling", "Graceful API loading and fetch error states", "Performance optimized list renders using useMemo"]
    },
    advanced: {
      title: "Multi-tenant SaaS Workspace",
      description: "Engineer an advanced workspace featuring mock workspaces, drag-and-drop task boards, workspace search, and user permission limits.",
      deliverables: ["Workspace layout with drag-and-drop state updates", "Optimistic UI renders on item edits", "Custom client route guards"],
      evaluationCriteria: ["Zero unnecessary component re-renders", "Clean modular context state architecture", "Fully keyboard-accessible modals"]
    }
  },
  "TypeScript": {
    skillName: "TypeScript",
    beginner: {
      title: "Type-Safe Utility Library",
      description: "Convert a collection of raw JavaScript array and object helper functions into a fully typed and compiled utility library.",
      deliverables: ["Defined interfaces for function inputs", "Strict type assertions in build outputs", "Unit testing code mapping assertions"],
      evaluationCriteria: ["Zero uses of the 'any' type keyword", "TypeScript compiler runs with strict settings", "Proper export definitions"]
    },
    intermediate: {
      title: "REST API Client SDK Wrapper",
      description: "Create a strongly-typed npm library wrapping around a public JSON REST API with generic types, error handlers, and union types.",
      deliverables: ["Generic network request wrapper", "Declared response interfaces for all routes", "Custom union error classifications"],
      evaluationCriteria: ["Client handles network failures cleanly", "Response objects strongly match API fields", "Clean build package compilation"]
    },
    advanced: {
      title: "Strict Validation Pipeline",
      description: "Construct a runtime type validation parsing library mapping unstructured payloads to validated application objects.",
      deliverables: ["Generics mapper function pipelines", "Conditional and mapped type helpers", "Detailed schema validation error lists"],
      evaluationCriteria: ["Validation executes in under 2ms", "Comprehensive unit tests covering invalid entries", "Strict return types mapped"]
    }
  },
  "Next.js": {
    skillName: "Next.js",
    beginner: {
      title: "Static MDX Blog Portfolio",
      description: "Assemble a high-performance personal portfolio site using MDX files for content posts and Next.js App Router.",
      deliverables: ["Static page generation router rules", "MDX page templates", "Optimized static metadata configuration"],
      evaluationCriteria: ["100/100 Lighthouse performance metrics", "Clean directory structures", "Images render via Next/Image tags"]
    },
    intermediate: {
      title: "Server-Action E-commerce Catalog",
      description: "Create a product catalog retrieving records, filtering items via URL search queries, and submitting cart orders using Server Actions.",
      deliverables: ["Server Component data fetch queries", "Server Action form endpoints", "Optimistic UI order list updates"],
      evaluationCriteria: ["Server logs show zero client database queries", "State is saved to browser queries", "Smooth component loading skeletons"]
    },
    advanced: {
      title: "Multi-tenant SaaS Workspace Portal",
      description: "Engineer a multi-tenant portal using subdomains, database schema streaming, middleware authentication guards, and optimized layouts.",
      deliverables: ["Custom middleware routing subdomains", "Layout server configurations parsing context", "Optimistic state updates on layout grids"],
      evaluationCriteria: ["Authentication tokens validate securely in middleware", "Zero layout drift on data loads", "Efficient memory consumption"]
    }
  },
  "Python": {
    skillName: "Python",
    beginner: {
      title: "Terminal Budget CSV Logger",
      description: "Write an interactive command-line budget logger parsing local CSV transactions.",
      deliverables: ["CLI selection prompt configurations", "CSV reading/writing file utilities", "Try-except validation handling errors"],
      evaluationCriteria: ["Resource handlers use pythonic 'with' statements", "Data inputs sanitize cleanly", "Code compiles with zero PEP8 violations"]
    },
    intermediate: {
      title: "Concurrent Web Scraper Pipeline",
      description: "Construct an asynchronous pipeline scraping static directory pages and compiling structural datasets.",
      deliverables: ["Asynchronous network parsing script", "Data parser extracting selector records", "Output exports to clean JSON files"],
      evaluationCriteria: ["Pipeline conforms to scrapers target limits", "Graceful parsing of empty selectors", "Raw data formats correctly cleaned"]
    },
    advanced: {
      title: "Task Queue API Service",
      description: "Build an asynchronous FastAPI backend managing background worker tasks using Redis queuing libraries.",
      deliverables: ["Asynchronous job routing paths", "Distributed task queue configurations", "Database state tracking updates"],
      evaluationCriteria: ["Worker processing handles CPU spikes cleanly", "API validated inputs strictly", "Database queries are non-blocking"]
    }
  },
  "SQL": {
    skillName: "SQL",
    beginner: {
      title: "Student Enrollment Database",
      description: "Design a relational schema representing courses, students, and class enrollments using primary and foreign keys.",
      deliverables: ["SQL file declaring 3+ interrelated tables", "Mock seed script with 50 rows of data", "Custom queries running inner and left joins"],
      evaluationCriteria: ["Proper foreign key constraints configured", "Normalized tables eliminating duplicate records", "Clean query syntax layout"]
    },
    intermediate: {
      title: "Analytics Dashboard Database backend",
      description: "Write aggregates and advanced queries retrieving monthly sales metrics, user signups, and cohort retention.",
      deliverables: ["Queries using GROUP BY, HAVING, and aggregate functions", "Calculations tracking month-over-month sales trends", "Custom VIEW summaries mapping metrics"],
      evaluationCriteria: ["Correct use of dates and timestamp operations", "No database query syntax performance bottlenecks", "Graceful handling of null entries"]
    },
    advanced: {
      title: "Query Optimization Case Study",
      description: "Audit a sluggish mock query system, diagnosing bottlenecks using EXPLAIN plans and configuring indexes.",
      deliverables: ["EXPLAIN execution analysis text writeup", "Schema index configurations", "Performance metrics proving 10x query speedups"],
      evaluationCriteria: ["Accurate identification of index scans over table scans", "No redundant indexes configured", "Detailed explanation of join algorithm decisions"]
    }
  },
  "Docker": {
    skillName: "Docker",
    beginner: {
      title: "App Containerization Package",
      description: "Write a clean Dockerfile packaging a simple web page server for deployment.",
      deliverables: ["Multi-stage build script minimizing image weight", "User configurations running on non-privileged access", "Environment variable injection hooks"],
      evaluationCriteria: ["Image build is split to utilize layer cache", "No credentials stored inside the Dockerfile", "Final image size is highly optimized"]
    },
    intermediate: {
      title: "Multi-Service Container Orchestration",
      description: "Compose a multi-container local stack launching a web client, database, and cache.",
      deliverables: ["Docker Compose configuration file", "Isolated internal network declarations", "Health checks for backend services"],
      evaluationCriteria: ["Services launch sequentially matching dependencies", "Database files save correctly to persistent volumes", "Internal network remains isolated from host"]
    },
    advanced: {
      title: "Production Container Build Suite",
      description: "Deploy an optimized multi-container microservice system to a cloud registry.",
      deliverables: ["CI pipeline building container tags", "Image scanning verifying package security", "Configured compose manifest for runtime environments"],
      evaluationCriteria: ["Zero vulnerabilities detected in scan audits", "Successful registry tags deployment", "Dynamic logs integration configured"]
    }
  },
  "Kubernetes": {
    skillName: "Kubernetes",
    beginner: {
      title: "Single-node Web App Deployment",
      description: "Deploy a single-node web application on a local cluster utilizing pods, services, and dynamic configuration keys.",
      deliverables: ["Deployment manifest file", "NodePort service mapping port routing", "ConfigMap configuring app properties"],
      evaluationCriteria: ["Pods start cleanly without runtime loops", "Services direct connection traffic", "Configurations bind correctly"]
    },
    intermediate: {
      title: "Microservice Ingress Controller",
      description: "Orchestrate a microservice stack inside a cluster using path-based ingress, namespace isolations, and secret encryption.",
      deliverables: ["Ingress rules manifest routing subpaths", "TLS certificates integration configuration", "Separate namespace deployment plans"],
      evaluationCriteria: ["Ingress maps traffic cleanly to targets", "Secrets are base64-configured safely", "No namespace access leaks"]
    },
    advanced: {
      title: "GitOps Self-Healing Cluster Architecture",
      description: "Design an auto-scaling production cluster managed by GitOps controllers, autoscaling metrics, and network policies.",
      deliverables: ["ArgoCD app deployment configurations", "Autoscaling manifests mapping CPU metrics", "Network security policies limiting pods traffic"],
      evaluationCriteria: ["Cluster synchronizes state from repo in 15s", "Auto-scalers handle traffic spikes", "Restricted pods block illicit calls"]
    }
  },
  "AWS": {
    skillName: "AWS",
    beginner: {
      title: "Static Portfolio Deployment",
      description: "Host a personal static portfolio site securely using cloud storage and a global content delivery network.",
      deliverables: ["Storage bucket configuration with private files", "Cloudfront CDN distribution redirecting requests", "Custom DNS domain configuration with SSL certificate"],
      evaluationCriteria: ["Bucket is secure with no public exposure flags", "HTTPS is enforced across all domains", "CDN correctly caches media files"]
    },
    intermediate: {
      title: "VPC App Server & Database",
      description: "Set up a secure application node with an isolated backend database server within a virtual private network.",
      deliverables: ["Isolated private subnet database configuration", "Security groups filtering port access", "Application runner instance inside a public subnet"],
      evaluationCriteria: ["Database is unreachable from the public internet", "SSH access is restricted to verified IPs", "Automated system backup rules configured"]
    },
    advanced: {
      title: "High-Availability Architecture",
      description: "Provision a multi-zone server layout with an automated load balancer and auto-scaling capabilities.",
      deliverables: ["Auto-scaling policies matching CPU usage", "Load balancer distributing traffic across availability zones", "Terraform configuration scripting the architecture"],
      evaluationCriteria: ["Simulated node crash causes zero downtime", "Stateless application configuration", "IAM permissions follow least privilege principles"]
    }
  },
  "PyTorch": {
    skillName: "PyTorch",
    beginner: {
      title: "Linear Regression Engine",
      description: "Train a simple single-layer regression model to predict housing prices based on dataset features.",
      deliverables: ["Custom dataset loader pipeline", "Training loop minimizing mean squared error", "Predictions charting accuracy outputs"],
      evaluationCriteria: ["Correct normalization of training features", "Optimization learning rates configure cleanly", "Model converges with no overfitting"]
    },
    intermediate: {
      title: "Image Classification Classifier",
      description: "Construct a multi-layer convolutional network identifying image categories from a dataset.",
      deliverables: ["CNN architecture layers script", "Validation steps checking test accuracy", "Performance confusion matrix dashboard"],
      evaluationCriteria: ["Layers handle dimension updates correctly", "Data augmentation reduces overfitting risks", "Correct usage of validation mode flags"]
    },
    advanced: {
      title: "Text Generator Model Fine-Tuner",
      description: "Adapt a transformer model to generate domain-specific text summaries using customized datasets.",
      deliverables: ["Text tokenizer script matching vocabulary rules", "Fine-tuning scripts updating model weights", "Output testing page checking accuracy"],
      evaluationCriteria: ["Gradient accumulation handles hardware memory constraints", "Model weights validate without exploding loss", "Clean summaries generated consistently"]
    }
  },
  "Git": {
    skillName: "Git",
    beginner: {
      title: "Merge Conflict Resolution Sandbox",
      description: "Establish a mock git repository containing split branches, editing identical files to practice manual merge conflict resolution.",
      deliverables: ["Git logs confirming branch creations", "Committed conflict indicators manually cleared", "Successful main branch merge operations"],
      evaluationCriteria: ["Code has zero active conflict indicators", "Merge logs show chronological updates", "Clean history graphs"]
    },
    intermediate: {
      title: "GitHub Actions Auto-Release Pipeline",
      description: "Design a repository automation workflow triggered by code updates, executing lints, tests, and bundling release builds.",
      deliverables: ["GitHub Actions configuration file", "Pipeline steps testing code states", "Successful compilation badges"],
      evaluationCriteria: ["Failed tests block release deployments", "Secrets are referenced via repository keys", "Telemetry records build durations"]
    },
    advanced: {
      title: "Monorepo Git Hook Suite",
      description: "Build a pre-commit and pre-push workflow validation suite managing linting audits and branch restriction protocols.",
      deliverables: ["Husky and lint-staged config script blocks", "Push verification blocking non-standard commits", "Sparse-checkout scripts managing directories"],
      evaluationCriteria: ["Unformatted code commits are blocked automatically", "Lints trigger automatically on files in commit", "Branch guards block push to main"]
    }
  },
  "Figma": {
    skillName: "Figma",
    beginner: {
      title: "Component Portfolio Design System",
      description: "Draft a collection of digital user interface elements showcasing consistent styles.",
      deliverables: ["Defined color and typography variables", "Interactive button component variants", "Clear design grid guides"],
      evaluationCriteria: ["Buttons use auto-layout spacing rules", "Color palettes meet AA contrast standards", "Consistent grid layouts applied"]
    },
    intermediate: {
      title: "Usability Prototype Study",
      description: "Create an interactive product prototype testing user flows and responsive views.",
      deliverables: ["Framer prototype linking app screens", "Responsive layout adjustments", "User testing summary logs"],
      evaluationCriteria: ["Resizing matches mobile screen widths", "Prototype runs with zero broken navigation paths", "Usability issues clearly fixed in designs"]
    },
    advanced: {
      title: "Accessible SaaS Application System",
      description: "Engineer a comprehensive application layout system complying with accessibility criteria.",
      deliverables: ["SaaS dashboard UI framework design", "Accessible form inputs validation status designs", "Figma library documentation guide"],
      evaluationCriteria: ["Text contrast passes WCAG compliance audits", "Focus indicators configured for keyboards", "Design files document layouts for developers"]
    }
  },
  "Linux": {
    skillName: "Linux",
    beginner: {
      title: "Automated Directory Backup Script",
      description: "Write a Bash shell script backing up target directories, creating archived tarball files, and configuring cron automation logs.",
      deliverables: ["Shell script archiving source directories", "Backup log records indicating success", "Cron configuration scheduling scripts"],
      evaluationCriteria: ["Script validates target folders exist", "Archive files restrict user access", "Logs append state dates correctly"]
    },
    intermediate: {
      title: "Secure SSH & User Audits Suite",
      description: "Configure user access limits on an app node, restricting shell interfaces and auditing SSH configuration details.",
      deliverables: ["Hardened SSH daemon configuration script", "Limited user profile settings", "Automated system authorization auditor script"],
      evaluationCriteria: ["Direct root log-in is disabled", "SSH port routing limits unauthorized access", "Auditor flags user permission leaks"]
    },
    advanced: {
      title: "Kernel Telemetry Monitor Daemon",
      description: "Develop a lightweight Linux service monitoring system resources, writing output stats to an ingestion API.",
      deliverables: ["Systemd daemon script configuration", "System memory and CPU metric parsed data", "Error logs shipping local crashes"],
      evaluationCriteria: ["Service runs with low CPU usage (< 1%)", "Graceful process shutdown configurations", "Telemetry reports match network limits"]
    }
  },
  "Networking": {
    skillName: "Networking",
    beginner: {
      title: "Local Subnet CIDR Planner",
      description: "Calculate network addresses, mask configurations, and IP allocation scopes for a mock multi-department office.",
      deliverables: ["Subnet range design schema sheet", "CIDR mask calculations table", "Router IP gateway assignment logs"],
      evaluationCriteria: ["Calculations prevent overlapping IP ranges", "Host limits conform to specifications", "Gateway configurations map correctly"]
    },
    intermediate: {
      title: "Multi-Tier VPC Topology Plan",
      description: "Design a logical virtual network topology isolating backend components behind gateways and firewall structures.",
      deliverables: ["Public and private subnet routing maps", "Firewall network access control listings", "NAT gateway configuration settings"],
      evaluationCriteria: ["Backend subnets are isolated from public routes", "Firewalls filter unauthorized port queries", "Subnet definitions map cleanly"]
    },
    advanced: {
      title: "DNS Resolver & Load Balancer Simulator",
      description: "Write a script simulating a round-robin DNS parser routing incoming queries to multiple mock servers, checking system states.",
      deliverables: ["Mock DNS resolver lookup dictionary", "Round-robin server allocation logic script", "Automatic health check server bypass code"],
      evaluationCriteria: ["Bypass redirects traffic away from offline nodes", "Resolver handles concurrent mock queries cleanly", "Equal traffic routing distribution"]
    }
  },
  "Mathematics": {
    skillName: "Mathematics",
    beginner: {
      title: "Matrix Transformation Visualizer",
      description: "Develop a Python utility calculating and visualizing 2D matrix transformation transformations on vector points.",
      deliverables: ["Vector product calculation utility", "Transformation matrices multiplication script", "Plotted charts mapping vector offsets"],
      evaluationCriteria: ["Computations handle division by zero errors", "Graph labels match plotting grids", "Code compiles cleanly"]
    },
    intermediate: {
      title: "A/B Testing Statistical Audit",
      description: "Write a statistical notebook processing test cohort conversion rates, calculating p-values and confidence criteria.",
      deliverables: ["Cohort conversion datasets parsing script", "Calculations reporting p-values and z-scores", "Hypothesis reject/accept validation decisions"],
      evaluationCriteria: ["P-values math matches standard libraries", "Confidence limits calculate correctly", "Conclusions are statistically valid"]
    },
    advanced: {
      title: "Gradient Descent Optimization Model",
      description: "Implement a custom gradient descent optimization algorithm finding function minimums without relying on framework models.",
      deliverables: ["Custom derivative gradient calculation functions", "Iterative training optimizations loop", "Chart tracking convergence speeds"],
      evaluationCriteria: ["Optimization converges cleanly within thresholds", "Dynamic learning rate schedules prevent divergence", "Detailed gradient logic comments"]
    }
  }
};

export function getPortfolioProofs(skillName: string): PortfolioProof | undefined {
  const norm = skillName.trim().toUpperCase();
  for (const key of Object.keys(portfolioProofs)) {
    if (key.toUpperCase() === norm || portfolioProofs[key].skillName.toUpperCase() === norm) {
      return portfolioProofs[key];
    }
  }
  return undefined;
}
