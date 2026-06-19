export interface CareerActionPlan {
  title: string;
  days: { day: string; task: string; description: string }[];
}

export const careerActionPlans: Record<string, CareerActionPlan> = {
  "frontend-developer": {
    title: "Frontend Developer",
    days: [
      { day: "Day 1", task: "Learn semantic HTML", description: "Understand why semantic markup is vital for SEO and screen readers." },
      { day: "Day 2", task: "Create a portfolio page", description: "Draft your structural page profile skeleton with pure text and links." },
      { day: "Day 3", task: "Learn Flexbox", description: "Master alignments, direction, justify, and responsive flexing rules." },
      { day: "Day 4", task: "Clone a landing page", description: "Try to replicate a simple static dashboard layout visually." },
      { day: "Day 5", task: "Deploy using GitHub Pages", description: "Make your page live and reachable via a real public URL." },
      { day: "Day 6", task: "Request feedback", description: "Show your live link to peers or community forums for input." },
      { day: "Day 7", task: "Refactor project", description: "Clean up CSS nesting, variables, and optimize your semantic tags." }
    ]
  },
  "backend-developer": {
    title: "Backend Developer",
    days: [
      { day: "Day 1", task: "Learn HTTP basics", description: "Master status codes, headers, and HTTP verbs (GET/POST/PUT/DELETE)." },
      { day: "Day 2", task: "Build simple API", description: "Set up a server to return hardcoded JSON messages on request endpoints." },
      { day: "Day 3", task: "Connect database", description: "Setup SQLite or PostgreSQL locally and write basic credentials/tables." },
      { day: "Day 4", task: "Implement CRUD", description: "Write server endpoints to Create, Read, Update, and Delete rows." },
      { day: "Day 5", task: "Deploy API", description: "Host your REST API server live on a service like Render or Koyeb." },
      { day: "Day 6", task: "Add authentication", description: "Integrate basic JWT signing token checks on protected routes." },
      { day: "Day 7", task: "Write documentation", description: "Create a README explaining endpoints, inputs, and example requests." }
    ]
  },
  "devops-engineer": {
    title: "DevOps Engineer",
    days: [
      { day: "Day 1", task: "Bash and CLI basics", description: "Master file manipulations, SSH keys, user permissions, and grep searching." },
      { day: "Day 2", task: "Write a simple script", description: "Write a bash automation script that copies backup logs to a directory." },
      { day: "Day 3", task: "Learn Docker basics", description: "Install Docker and write a simple Dockerfile to containerize a static app." },
      { day: "Day 4", task: "CI pipeline check", description: "Configure a basic GitHub Action script to run tests on every commit." },
      { day: "Day 5", task: "Run Nginx load balancing", description: "Set up local reverse proxy configurations routing to port targets." },
      { day: "Day 6", task: "Monitor VM logs", description: "Trace real-time logs using journalctl, systemctl, and check system resource bounds." },
      { day: "Day 7", task: "Deploy simple container", description: "Host a containerized web server on a free-tier virtual machine." }
    ]
  },
  "cloud-engineer": {
    title: "Cloud Engineer",
    days: [
      { day: "Day 1", task: "Create provider sandbox", description: "Register a free AWS or Azure tier, setting budget alerts at $1 limit." },
      { day: "Day 2", task: "Configure IAM users", description: "Set up a secondary IAM admin user with restricted API key permissions." },
      { day: "Day 3", task: "Provision virtual server", description: "Start an EC2 VM node, setting ingress ports only for your home IP." },
      { day: "Day 4", task: "Setup Object Storage", description: "Create a private secure bucket, uploading assets via the CLI tools." },
      { day: "Day 5", task: "Deploy a serverless call", description: "Deploy a lightweight AWS Lambda function triggered via an API endpoint." },
      { day: "Day 6", task: "Trace cloud logs", description: "Inspect system executions in CloudWatch to understand serverless runtimes." },
      { day: "Day 7", task: "Clean up unused resources", description: "Terminate instances and delete volumes to avoid unexpected invoices." }
    ]
  },
  "ai-engineer": {
    title: "AI Engineer",
    days: [
      { day: "Day 1", task: "Set up Python Environment", description: "Initialize a Jupyter Notebook sandbox with pandas and NumPy libraries." },
      { day: "Day 2", task: "Call foundation API", description: "Write a python script querying OpenAI or Anthropic API endpoints." },
      { day: "Day 3", task: "Build system prompt rules", description: "Design a model instruction system returning structured JSON formats." },
      { day: "Day 4", task: "Scrub data pipelines", description: "Use pandas to clean out null rows and anomalies from a mock database CSV." },
      { day: "Day 5", task: "Verify vector search", description: "Insert text chunks into a lightweight vector memory store like ChromaDB." },
      { day: "Day 6", task: "Guard against injections", description: "Build string check rules to flag prompt overrides and leak attacks." },
      { day: "Day 7", task: "Deploy simple agent UI", description: "Create a simple web interface showcasing model calls using Streamlit." }
    ]
  },
  "cybersecurity-analyst": {
    title: "Cybersecurity Analyst",
    days: [
      { day: "Day 1", task: "Linux permissions audit", description: "Inspect standard user access controls, absolute file permissions, and active groups." },
      { day: "Day 2", task: "Scan open ports with Nmap", description: "Scan local sandbox machines to flag open ports and active services." },
      { day: "Day 3", task: "Inspect web vulnerabilities", description: "Read details of SQL injection (SQLi) and cross-site scripting (XSS)." },
      { day: "Day 4", task: "Capture network packets", description: "Use Wireshark to capture packets on a local interface and inspect headers." },
      { day: "Day 5", task: "Configure local firewall", description: "Create firewall rule profiles blocking all inputs except ports 80/443." },
      { day: "Day 6", task: "Audit authentication failure logs", description: "Read system logs to flag brute force attempts and record origins." },
      { day: "Day 7", task: "Draft security response report", description: "Write a summary detailing how to fix the vulnerabilities found in your audit." }
    ]
  },
  "java-developer": {
    title: "Java Developer",
    days: [
      { day: "Day 1", task: "Install JDK and IDE", description: "Set up Java 17+ and IntelliJ IDEA Community Edition, printing Hello World." },
      { day: "Day 2", task: "Understand OOP concepts", description: "Build a class structure representing bank accounts with encapsulation." },
      { day: "Day 3", task: "Learn Java Collections", description: "Practice using List, Set, and Map interfaces to store and filter user records." },
      { day: "Day 4", task: "Set up a Maven project", description: "Create a basic Maven configuration and import external JSON parsing packages." },
      { day: "Day 5", task: "Build a Spring Boot API", description: "Generate a Spring Boot starter project and expose a hello message REST endpoint." },
      { day: "Day 6", task: "Add JPA database integration", description: "Connect Spring Boot to an H2 database and fetch data rows." },
      { day: "Day 7", task: "Write JUnit assertions", description: "Create test cases verifying endpoint responses and calculation logic." }
    ]
  },
  "full-stack-developer": {
    title: "Full Stack Developer",
    days: [
      { day: "Day 1", task: "Draft Frontend UI", description: "Create a responsive React dashboard layout with a mock table state." },
      { day: "Day 2", task: "Initialize Backend Server", description: "Set up a Node.js Express server that returns JSON data on an API route." },
      { day: "Day 3", task: "Enable CORS and Fetch", description: "Fetch API endpoints from React and render results dynamically." },
      { day: "Day 4", task: "Set up Postgres and Prisma", description: "Define a schema model in Prisma and migrate it to a PostgreSQL database." },
      { day: "Day 5", task: "Build CRUD routes", description: "Connect Express routes to Prisma query models to save user inputs." },
      { day: "Day 6", task: "Implement user auth", description: "Integrate JWT token validation on backend controllers." },
      { day: "Day 7", task: "Containerize and Deploy", description: "Write a Docker Compose file bundling both components and push them live." }
    ]
  },
  "data-scientist": {
    title: "Data Scientist",
    days: [
      { day: "Day 1", task: "Install Anaconda and Jupyter", description: "Configure a Python environment with Pandas, NumPy, and Scikit-Learn libraries." },
      { day: "Day 2", task: "Query and parse CSV records", description: "Load a dataset using Pandas, count null properties, and replace empty entries." },
      { day: "Day 3", task: "Data visualizations", description: "Plot distribution diagrams and correlations using Matplotlib and Seaborn." },
      { day: "Day 4", task: "Feature engineering", description: "Encode categorical variables and normalize numerical column properties." },
      { day: "Day 5", task: "Train regression model", description: "Fit a Linear Regression model in Scikit-Learn to predict pricing indices." },
      { day: "Day 6", task: "Evaluate predictions", description: "Calculate R-squared and Mean Squared Error metrics on test partitions." },
      { day: "Day 7", task: "Document insights", description: "Prepare a Jupyter Notebook detailing recommendations and model parameters." }
    ]
  },
  "mobile-developer": {
    title: "Mobile Developer",
    days: [
      { day: "Day 1", task: "Configure React Native / Expo", description: "Install Expo CLI and run a starter app template on your personal phone." },
      { day: "Day 2", task: "Build interface layout", description: "Create a scrollable catalog list with custom cards using StyleSheet layout." },
      { day: "Day 3", task: "Manage client state", description: "Add state toggles to mark catalog entries as favorites." },
      { day: "Day 4", task: "Query external endpoints", description: "Fetch dynamic product lists from a public REST API inside an effect." },
      { day: "Day 5", task: "Add Async Storage caching", description: "Persist favorite list entries on-device between app reboots." },
      { day: "Day 6", task: "Integrate phone gestures", description: "Add Swipeable list gestures or pull-to-refresh interactions." },
      { day: "Day 7", task: "Package app bundle", description: "Run expo prebuild to create the production app distribution folders." }
    ]
  },
  "ux-designer": {
    title: "UX Designer",
    days: [
      { day: "Day 1", task: "Define User Persona", description: "Identify target audiences for a booking app and list their key frustrations." },
      { day: "Day 2", task: "Draw paper wireframes", description: "Sketch three alternative layout ideas for the checkout page." },
      { day: "Day 3", task: "Build Figma layout grid", description: "Configure Figma styles with responsive grids, typography, and color systems." },
      { day: "Day 4", task: "Design interactive prototype", description: "Convert mock designs into clickable UI workflows linking key screens." },
      { day: "Day 5", task: "Run usability reviews", description: "Have three peers test the interactive flows and list navigation issues." },
      { day: "Day 6", task: "Incorporate feedback", description: "Refine button sizing, text hierarchy, and micro-copy details." },
      { day: "Day 7", task: "Export redlines for engineers", description: "Document margins, colors, and layout rules for front-end integration." }
    ]
  },
  "qa-tester": {
    title: "QA Tester",
    days: [
      { day: "Day 1", task: "Analyze requirements", description: "Read a feature specification and write a checklist of positive and negative cases." },
      { day: "Day 2", task: "Execute manual checks", description: "Manually test a form, logging visual errors and validation omissions." },
      { day: "Day 3", task: "Learn Postman API checks", description: "Draft API test assertions verifying status codes and JSON models." },
      { day: "Day 4", task: "Configure Playwright automation", description: "Set up a test script that navigates browser screens automatically." },
      { day: "Day 5", task: "Write automation assertions", description: "Program tests verifying element visibility after clicking buttons." },
      { day: "Day 6", task: "Run full regression suite", description: "Execute the entire test suite on a staging build, recording logs." },
      { day: "Day 7", task: "File structured bug tickets", description: "Draft a bug report in markdown with clear steps to replicate, environment, and logs." }
    ]
  },
  "data-analyst": {
    title: "Data Analyst",
    days: [
      { day: "Day 1", task: "Practice basic SQL query structures", description: "Write SELECT, WHERE, and ORDER BY commands on a dummy table." },
      { day: "Day 2", task: "Write SQL aggregation filters", description: "Use GROUP BY, HAVING, and SUM calculations to compute monthly revenue." },
      { day: "Day 3", task: "Write SQL table joins", description: "Combine customer and transaction tables to identify top purchasing states." },
      { day: "Day 4", task: "Clean data in Excel/Sheets", description: "Find duplicate rows, filter errors, and apply pivot tables." },
      { day: "Day 5", task: "Design BI dashboard wireframe", description: "Layout the essential charts for a business dashboard on paper." },
      { day: "Day 6", task: "Build dashboard in Power BI / Tableau", description: "Connect your database data and create interactive charts." },
      { day: "Day 7", task: "Publish executive summary", description: "Draft a short business report summarizing your three main recommendations." }
    ]
  },
  "game-developer": {
    title: "Game Developer",
    days: [
      { day: "Day 1", task: "Install engine and editor", description: "Setup Unity or Unreal Engine and verify default project templates." },
      { day: "Day 2", task: "Implement movement controller", description: "Write script handles moving a player character across a grid." },
      { day: "Day 3", task: "Physics and collisions", description: "Add static boundary objects and verify correct player collision triggers." },
      { day: "Day 4", task: "Design basic game loop", description: "Script spawn rates, score metrics, and loss conditions." },
      { day: "Day 5", task: "Add visual textures and audio", description: "Import free meshes/sprites and trigger sounds on collisions." },
      { day: "Day 6", task: "Optimize game frame rates", description: "Profile draw call bottlenecks and clean up redundant calculations." },
      { day: "Day 7", task: "Build executable game pack", description: "Compile a desktop build of your prototype and run testing passes." }
    ]
  },
  "technical-writer": {
    title: "Technical Writer",
    days: [
      { day: "Day 1", task: "Choose project repo", description: "Select an open-source project and clone it to write documentation updates." },
      { day: "Day 2", task: "Write installation readme", description: "Rewrite the installation guide to be bullet-proof on clean machines." },
      { day: "Day 3", task: "Interview design leads", description: "Gather technical specifications on how the core API endpoints authenticate." },
      { day: "Day 4", task: "Draft REST endpoint guide", description: "Create a markdown guide with clear curl commands and JSON outputs." },
      { day: "Day 5", task: "Incorporate feedback", description: "Revise terminology and correct code details with development team." },
      { day: "Day 6", task: "Verify markdown styling formatting", description: "Lint files to ensure style rules match target style manuals." },
      { day: "Day 7", task: "Submit Pull Request", description: "Create a branch and request reviews for your documentation changes." }
    ]
  }
};

export const getCareerActionPlan = (slug: string): CareerActionPlan | null => {
  return careerActionPlans[slug] || null;
};
