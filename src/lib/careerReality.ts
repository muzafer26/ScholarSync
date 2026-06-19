export interface CareerRealityInfo {
  dailyReality: string[];
  beginnersUnderestimate: string[];
  whoShouldAvoid: string[];
  transitionPaths: string[];
}

export const careerReality: Record<string, CareerRealityInfo> = {
  "frontend-developer": {
    dailyReality: [
      "Monday: Designer changed spacing system. Entire dashboard alignment breaks.",
      "Tuesday: Safari renders layout differently from Chrome.",
      "Wednesday: Backend API response changes. UI crashes unexpectedly.",
      "Thursday: Accessibility audit fails.",
      "Friday: Refactoring legacy React components."
    ],
    beginnersUnderestimate: [
      "The complexity of writing highly performant, scalable, and responsive CSS layouts.",
      "Web accessibility standards (WAI-ARIA, semantic markup) required for enterprise software.",
      "The deep vanilla JavaScript mechanics (closures, event loop, memory leaks) required before using frameworks."
    ],
    whoShouldAvoid: [
      "People who dislike visual layout details and UI pixel alignment adjustments.",
      "People who get frustrated by constantly changing CSS browser compatibility behaviors.",
      "People wanting mostly backend, database, or heavy algorithmic systems work."
    ],
    transitionPaths: [
      "Full Stack Developer (by learning server-side databases)",
      "Product Engineer (by focusing on user-centered shipping)",
      "Mobile App Developer (by utilizing React Native/Flutter frameworks)",
      "UX Engineer (by combining styling expertise with Figma and interaction design)"
    ]
  },
  "backend-developer": {
    dailyReality: [
      "Monday: Payment API latency spikes.",
      "Tuesday: Database query takes 8 seconds.",
      "Wednesday: Authentication bug appears.",
      "Thursday: Memory leak investigation.",
      "Friday: Production deployment review."
    ],
    beginnersUnderestimate: [
      "The difficulty of designing database structures that can scale to millions of rows.",
      "Understanding networking protocols, CORS policies, status codes, and server connection pools.",
      "Designing robust error-handling pipelines that fail gracefully without crashing the process."
    ],
    whoShouldAvoid: [
      "People who need instant visual feedback to stay motivated.",
      "People who dislike thinking about data structures, serialization formats, or concurrency.",
      "People who prefer front-facing design and interface aesthetics."
    ],
    transitionPaths: [
      "Full Stack Developer (by learning frontend React/Vue)",
      "System Architect (by designing large distributed applications)",
      "DevOps/Cloud Engineer (by specializing in infrastructure automation)",
      "Database Administrator (by focusing on data structure optimization)"
    ]
  },
  "devops-engineer": {
    dailyReality: [
      "Monday: CI pipeline failing.",
      "Tuesday: Unexpected cloud bill increase.",
      "Wednesday: Container crash investigation.",
      "Thursday: Security patch rollout.",
      "Friday: Monitoring alert review."
    ],
    beginnersUnderestimate: [
      "The degree of deep Linux system internals required to deploy software.",
      "Networking principles like subnets, gateway routings, CIDR blocks, and DNS setups.",
      "The operational stress and ownership of responding to production system alerts."
    ],
    whoShouldAvoid: [
      "People who want a traditional 9-to-5 without operational on-call duties.",
      "People who dislike debugging networks, shell scripting, or system logs.",
      "People who prefer building customer features over automation pipelines."
    ],
    transitionPaths: [
      "Site Reliability Engineer (SRE) (by specializing in server reliability)",
      "Cloud Architect (by design-scaling multi-cloud enterprise frameworks)",
      "Security Engineer (by specializing in penetration & system defense)",
      "Platform Engineer (by building internal developer tooling templates)"
    ]
  },
  "cloud-engineer": {
    dailyReality: [
      "Monday: Auditing AWS billing alerts and cleaning up orphan EBS volumes.",
      "Tuesday: Configuring multi-region replication for S3 buckets.",
      "Wednesday: IAM permission updates to enforce least-privilege principles.",
      "Thursday: Debugging VPC peering issues between staging and production networks.",
      "Friday: Migrating legacy VM workloads to serverless functions."
    ],
    beginnersUnderestimate: [
      "The sheer volume of vendor-specific cloud services and constant service deprecations.",
      "Configuring complex permission trees (IAM, Service Roles) correctly.",
      "Cost optimization - how quickly cloud databases and server instances consume budget."
    ],
    whoShouldAvoid: [
      "People who get overwhelmed by massive provider dashboards (AWS Console, Azure Portal).",
      "People who prefer writing pure application code over infrastructure setup.",
      "People who dislike continuously renewing vendor certifications."
    ],
    transitionPaths: [
      "DevOps Engineer (by integrating automation and pipelines)",
      "Cloud Architect (by designing high-level infrastructure layouts)",
      "FinOps Specialist (by focus-auditing enterprise cloud costs)"
    ]
  },
  "ai-engineer": {
    dailyReality: [
      "Monday: Cleaning and parsing 50GB of dirty data files from a customer system.",
      "Tuesday: Debugging why the PyTorch training model script ran out of GPU memory.",
      "Wednesday: Writing post-processing validation code to strip prompt injection attempts.",
      "Thursday: Testing token usage costs across different LLM APIs.",
      "Friday: Monitoring model output statistics for prediction drift issues."
    ],
    beginnersUnderestimate: [
      "The extreme amount of mathematical foundations (Linear Algebra, Calculus, Statistics) required.",
      "The time spent doing raw data cleanup vs training models (often 80/20 ratio).",
      "The high computational cost and environment complexity of deploying model nodes."
    ],
    whoShouldAvoid: [
      "People looking for a quick, code-free way to build products.",
      "People who dislike math, statistics, or reading scientific research papers.",
      "People who want predictable software behavior over statistical models."
    ],
    transitionPaths: [
      "Machine Learning Platform Engineer (by optimizing model hosting pipelines)",
      "Data Engineer (by designing database warehouses and pipeline workflows)",
      "AI Product Manager (by steering machine learning features conceptually)",
      "Research Scientist (by developing novel statistical model architectures)"
    ]
  },
  "cybersecurity-analyst": {
    dailyReality: [
      "Monday: Auditing security log alerts from firewall nodes.",
      "Tuesday: Performing a vulnerability scan on a staging server subnet.",
      "Wednesday: Writing a report detailing risk mitigations for an outdated library.",
      "Thursday: Conducting a phishing simulation campaign for internal users.",
      "Friday: Investigating a brute-force SSH attempt on a database gateway."
    ],
    beginnersUnderestimate: [
      "The volume of false positive security alerts that must be manually screened.",
      "The strict compliance, paperwork, and reporting guidelines required in corporate security.",
      "The need to keep up with daily zero-day exploit vulnerabilities."
    ],
    whoShouldAvoid: [
      "People who prefer pure coding over auditing, configuring networks, and compliance writing.",
      "People who cannot handle high-stress situations during server breach alarms.",
      "People expecting a Hollywood-style hacking experience."
    ],
    transitionPaths: [
      "Penetration Tester (Ethical Hacker) (by specializing in security offense)",
      "Security Architect (by designing secure networks and infrastructure)",
      "DevSecOps Engineer (by integrating security checks into CI/CD pipelines)"
    ]
  },
  "java-developer": {
    dailyReality: [
      "Monday: Debugging memory leaks in garbage collector logs for a legacy banking app.",
      "Tuesday: Migrating Spring Boot modules from version 2 to 3 and resolving dependency conflicts.",
      "Wednesday: Optimizing SQL connection pooling to handle heavy transaction throughput.",
      "Thursday: Aligning API schemas with strict corporate enterprise architecture policies.",
      "Friday: Writing JUnit tests to maintain 90% code coverage requirements."
    ],
    beginnersUnderestimate: [
      "The verbosity of Java boilerplate code and strict Object-Oriented design patterns.",
      "JVM internals - configuring garbage collection and managing heap memory allocations.",
      "Complexity of the Spring Boot ecosystem, autowiring, and build tools like Maven/Gradle."
    ],
    whoShouldAvoid: [
      "People who prefer quick, minimal-code scripting over highly structured type systems.",
      "Developers looking to build lightweight static client websites or quick startup MVPs.",
      "Those who dislike enterprise bureaucracy and strict design patterns (Dependency Injection)."
    ],
    transitionPaths: [
      "Backend System Architect (by specializing in enterprise API networks)",
      "Cloud Solutions Architect (by migrating Spring applications to AWS/Azure platforms)",
      "Full Stack Developer (by learning React/Angular client integrations)"
    ]
  },
  "full-stack-developer": {
    dailyReality: [
      "Monday: Connecting a React form component to a Node/Express backend API endpoint.",
      "Tuesday: Setting up Prisma schema migrations to sync Postgres database tables.",
      "Wednesday: Debugging state hydration mismatches on a Next.js Server Side Rendered view.",
      "Thursday: Configuring Redis cache policies to reduce API call overhead.",
      "Friday: Deploying staging builds via Docker and reviewing frontend web vitals."
    ],
    beginnersUnderestimate: [
      "The mental context-switching required between browser environments and server runtime environments.",
      "The complexity of managing state synchronization and database connection pools simultaneously.",
      "Modern bundlers, monorepos, and CSS compilation configs (Webpacker, Vite, Turborepo)."
    ],
    whoShouldAvoid: [
      "People who get easily overwhelmed by learning multiple frameworks and languages at once.",
      "Developers who prefer absolute specialization (e.g., deep CSS detail or low-level algorithms only).",
      "Those who dislike keeping up with both frontend and backend breaking updates."
    ],
    transitionPaths: [
      "Technical Lead / Engineering Manager (by managing full-stack product lifecycles)",
      "Startup CTO (by owning the entire technical architecture and deployments)",
      "Solutions Architect (by designing clean end-to-end cloud platforms)"
    ]
  },
  "data-scientist": {
    dailyReality: [
      "Monday: Sourcing and cleaning missing values from customer SQL records.",
      "Tuesday: Evaluating feature correlations and selecting variables for a regression model.",
      "Wednesday: Writing Jupyter notebooks to prototype random forest prediction pipelines.",
      "Thursday: Discussing model metrics (Precision, Recall, ROC-AUC) with business stakeholders.",
      "Friday: Wrapping models in FastAPI endpoints and monitoring latency statistics."
    ],
    beginnersUnderestimate: [
      "The amount of time spent doing data ingestion and feature engineering (often 85%).",
      "Mathematical proofs - statistical significance, p-values, and hypothesis testing basics.",
      "Translating predictive model outputs into actionable business decisions."
    ],
    whoShouldAvoid: [
      "People who expect clean datasets and simple API calls without statistical validation.",
      "Those who dislike mathematical proofs, statistical equations, and algebra.",
      "Developers who want to build client-facing visual features rather than mathematical models."
    ],
    transitionPaths: [
      "Machine Learning Engineer (by translating model prototypes into robust production code)",
      "AI Researcher (by designing new neural architectures and algorithms)",
      "Analytics Director (by aligning data systems with high-level strategies)"
    ]
  },
  "mobile-developer": {
    dailyReality: [
      "Monday: Aligning cross-platform flex layout elements in React Native to match Figma drafts.",
      "Tuesday: Debugging platform-specific native crashes on Android vs iOS modules.",
      "Wednesday: Connecting push notification event listeners to Apple APNS and Google FCM gateways.",
      "Thursday: Optimizing image caching routines to minimize on-device memory footprints.",
      "Friday: Submitting beta builds to Apple TestFlight and Google Play Console."
    ],
    beginnersUnderestimate: [
      "The tediousness of App Store review guidelines and bundle provisioning profiles.",
      "Handling intermittent offline device states, data synchronization, and device caching.",
      "Testing interfaces across hundreds of device screen sizes and OS distributions."
    ],
    whoShouldAvoid: [
      "People who dislike waiting for slow app build times, simulators, and mobile reviews.",
      "Developers who want fast web releases without dealing with Apple/Google platforms.",
      "Those who prefer server-side database tuning or API engineering over user-facing UI."
    ],
    transitionPaths: [
      "Cross-Platform Specialist (by mastering Swift/Kotlin native bridges)",
      "UI/UX Architect (by designing native gesture systems and animations)",
      "Product Lead (by managing mobile client product releases)"
    ]
  },
  "ux-designer": {
    dailyReality: [
      "Monday: Running user interviews to gather insights on a checkout page flow.",
      "Tuesday: Building high-fidelity responsive wireframes and prototypes in Figma.",
      "Wednesday: Documenting typography and grid styles for the engineering team's design system.",
      "Thursday: Setting up A/B tests to monitor click-through rates and scroll depths.",
      "Friday: Presenting design iterations to engineering leads and adjusting layouts based on scope."
    ],
    beginnersUnderestimate: [
      "The amount of documentation and alignment meetings needed vs pure aesthetic drawing.",
      "Designing accessible layouts that adhere strictly to WCAG color and contrast ratios.",
      "Iterating and throwing away designs based on telemetry data rather than personal taste."
    ],
    whoShouldAvoid: [
      "People who want to write production code (HTML, CSS, React) instead of designing layouts.",
      "Those who take design feedback personally and dislike constant visual iterations.",
      "People who prefer making artistic graphics over functional, data-driven interfaces."
    ],
    transitionPaths: [
      "Product Designer (by combining user research with product strategy)",
      "Design Systems Lead (by defining global UI patterns for engineering frameworks)",
      "UX Researcher (by focusing entirely on user behavior studies and usability tests)"
    ]
  },
  "qa-tester": {
    dailyReality: [
      "Monday: Writing manual test cases for a new user authentication page flow.",
      "Tuesday: Scripting automated end-to-end browser tests using Playwright or Cypress.",
      "Wednesday: Testing API payloads and status codes using Postman collections.",
      "Thursday: Running regression tests on release candidate builds to identify bug blockers.",
      "Friday: Logging detailed bug reports with step-by-step reproduction scripts in Jira."
    ],
    beginnersUnderestimate: [
      "The need for programming skills to write automated test suites and mock APIs.",
      "The repetitive nature of manual testing and verifying minor bug fixes across platforms.",
      "Communicating product failures constructively to engineers without causing friction."
    ],
    whoShouldAvoid: [
      "People who expect QA to be purely manual click-testing without any scripting.",
      "Developers who only want to build new features and dislike checking edge cases.",
      "Those who lack attention to detail and patience for repetitive quality verification."
    ],
    transitionPaths: [
      "Automation Engineer (by designing large-scale integration test grids)",
      "Release Manager (by overseeing CI/CD build promotion and quality gates)",
      "Backend Developer (by leveraging code mastery and testing knowledge)"
    ]
  },
  "data-analyst": {
    dailyReality: [
      "Monday: Writing SQL joins to pull monthly sales metrics for the marketing division.",
      "Tuesday: Designing clean charts and interactive layouts in Tableau or Power BI.",
      "Wednesday: Cleaning duplicate customer entries using Pandas scripts in Python.",
      "Thursday: Analyzing traffic funnel drops and writing summaries for business stakeholders.",
      "Friday: Preparing slide decks with data insights for strategy reviews."
    ],
    beginnersUnderestimate: [
      "The absolute necessity of writing highly efficient SQL queries on large databases.",
      "The importance of soft skills and presentation confidence when describing metrics.",
      "Dealing with dirty, incomplete, or legacy data sources with no documentation."
    ],
    whoShouldAvoid: [
      "People who prefer building software applications over analyzing numbers and charts.",
      "Those who dislike business meetings, report writing, or slide presentations.",
      "Developers who want to work in isolation without cross-team communications."
    ],
    transitionPaths: [
      "Data Scientist (by mastering machine learning models and predictive statistics)",
      "Business Intelligence Engineer (by designing scalable data warehouse pipelines)",
      "Product Manager (by leveraging metrics to guide product development)"
    ]
  },
  "game-developer": {
    dailyReality: [
      "Monday: Scripting player controller movements and jump curves in Unity or Unreal Engine.",
      "Tuesday: Debugging why physics colliders are triggering incorrect game actions.",
      "Wednesday: Profiling frame rates and optimizing draw calls to prevent lag on target devices.",
      "Thursday: Integrating audio sound cues and particle effects to game events.",
      "Friday: Packaging game builds for playtesting and reviewing game designer feedback."
    ],
    beginnersUnderestimate: [
      "The heavy linear algebra, vector math, and physics formulas required for gameplay coding.",
      "The extreme competition and lower average salaries compared to enterprise web dev.",
      "The complexity of managing asset pipelines, textures, and memory allocations."
    ],
    whoShouldAvoid: [
      "People who want easy, fast setups without dealing with complex 3D math and physics.",
      "Developers who cannot handle crunch cycles, tight release dates, and intense debugging.",
      "Those seeking high starting salaries and low barriers to entry."
    ],
    transitionPaths: [
      "Gameplay Programmer (by specializing in player mechanics and systems)",
      "Graphics Engineer (by writing custom shaders and rendering pipelines)",
      "Technical Artist (by bridging 3D modeling and engine scripting tools)"
    ]
  },
  "technical-writer": {
    dailyReality: [
      "Monday: Interviewing API engineers to understand a new endpoints release.",
      "Tuesday: Writing tutorial guides and markdown pages for the developer portal.",
      "Wednesday: Editing existing system architecture docs to match updated network layouts.",
      "Thursday: Testing code snippets in tutorial docs to ensure they run without errors.",
      "Friday: Reviewing PR comments on documentation files and merging updates."
    ],
    beginnersUnderestimate: [
      "The depth of coding knowledge required to write accurate guides for developers.",
      "How much research, interviews, and code testing is done compared to actual writing.",
      "Structuring information logically so developers can scan and find details instantly."
    ],
    whoShouldAvoid: [
      "People who want to write creative stories or marketing copy rather than technical guides.",
      "Those who dislike reading documentation, playing with terminal tools, or testing code.",
      "Developers who want to write production code all day without writing explanations."
    ],
    transitionPaths: [
      "Developer Advocate / Evangelist (by speaking at events and helping community developers)",
      "Product Manager (by translating user needs and documentation into product plans)",
      "API Platform Specialist (by designing clean developer interfaces and SDK schemas)"
    ]
  }
};

export const getCareerReality = (slug: string): CareerRealityInfo | null => {
  return careerReality[slug] || null;
};
