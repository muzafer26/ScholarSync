import type { Career } from '@/types';

export const careers: Career[] = [
  {
    id: 'career-1',
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    field: 'Technology',
    subfield: 'Web Development',
    description: 'Build the user-facing side of websites and web applications. Frontend developers work with HTML, CSS, JavaScript, and modern frameworks like React.',
    shortDescription: 'Build the visual components of websites and apps.',
    avgSalaryIndia: 'Entry: ₹4–7 LPA | Mid: ₹8–15 LPA | Sr: ₹16–25+ LPA',
    avgSalaryGlobal: 'Entry: $50K–$75K | Mid: $80K–$120K | Sr: $130K–$160K+',
    demandTrend: 'rising',
    relatedCareers: ['career-4'],
    tags: ['coding', 'web', 'frontend', 'react', 'javascript', 'html', 'css', 'typescript', 'nextjs'],
    aliases: ['react developer', 'nextjs developer', 'web developer', 'ui developer', 'javascript developer', 'frontend engineer', 'solidjs', 'wordpress developer', 'shopify developer'],
    icon: 'Monitor',
    roadmapShUrl: 'https://roadmap.sh/frontend',
    overview: 'Frontend development centers on user experience. Engineers program client interfaces and translate design layouts into functional, high-performance web pages.',
    whatItDoes: 'Frontend developers construct layouts, handle interaction events, manage state synchronization, and ensure cross-browser styling parity.',
    timeToJobReady: '6–9 months',
    skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js'],
    stages: [
      {
        id: 'f1',
        title: 'Internet & HTML',
        description: 'Learn how the web works and basic markup.',
        duration: '2 weeks',
        skills: ['HTML', 'HTTP'],
        resources: [],
        milestones: ['Build a basic HTML site'],
        order: 1,
        whyExists: 'Every website relies on the client-server request model. Before styling elements, you must understand document markup and standard networking protocols.',
        whyThisStep: 'HTML defines the structure and accessibility profile of all web pages, while HTTP governs how client browsers fetch resources from remote servers.',
        whyNow: 'Before attempting layout styling (CSS) or dynamic interactions (JavaScript), you must understand how to declare structural elements on a page.',
        whyBeforeNext: 'Learning layout systems (CSS) without understanding the underlying HTML structure results in broken, unmanageable style inheritance.',
        realWorldUsage: 'Used by all frontend teams to establish semantic page skeletons, proper SEO structures, and standard anchor/form elements.',
        sources: ['roadmap.sh', 'MDN Web Docs', 'W3C Specifications'],
        suggestedProjects: [
          'Basic Personal Portfolio Outline (pure semantic HTML without styles).',
          'A multi-input Registration Form utilizing proper labels, fieldsets, and validation attributes.'
        ],
        expectedOutcome: 'You can compose accessible document layouts and explain basic client-server network requests.',
        commonMistakes: [
          'Using non-semantic <div> tags everywhere instead of proper <header>, <nav>, <main>, and <footer> tags.',
          'Neglecting form element label associations, creating broken accessibility tags.'
        ],
        readyToMoveOn: [
          'Can declare a complete, semantic document skeleton without referencing online examples.',
          'Understand how browsers resolve HTTP GET and POST request methods.',
          'Can implement accessibility attributes (alt, lang) correctly on media.'
        ]
      },
      {
        id: 'f2',
        title: 'Styling (CSS)',
        description: 'Learn to style web pages and layout systems.',
        duration: '1 month',
        skills: ['CSS', 'Flexbox', 'Grid'],
        resources: [],
        milestones: ['Clone a landing page'],
        order: 2,
        whyExists: 'Modern users demand accessible and responsive designs. Flexbox and CSS Grid are core browser layout specifications required to position elements cleanly.',
        whyThisStep: 'Modern screen layout requires flexible container modules. CSS Grid and Flexbox are native browser specifications that replace fragile float-based formatting.',
        whyNow: 'Static layouts should be mastered before learning dynamic frontend frameworks like React to avoid bloat and complex styling refactoring.',
        whyBeforeNext: 'Adding JavaScript reactivity is pointless if the underlying document elements cannot be positioned or adapted to varying screen sizes.',
        realWorldUsage: 'Constructing landing pages, responsive navbars, dashboard grid layouts, and alignment of application cards.',
        sources: ['roadmap.sh', 'MDN Web Docs', 'CSS-Tricks'],
        suggestedProjects: [
          'A responsive product pricing comparison card grid with mobile-first media queries.',
          'A pixel-perfect clone of a curated minimalist software landing page.'
        ],
        expectedOutcome: 'You can build fluid, responsive page alignments on any display size using pure layout specifications.',
        commonMistakes: [
          'Overusing absolute positioning for basic alignments, leading to layout breakage on smaller viewports.',
          'Relying on styling frameworks like Tailwind before mastering basic block/inline margin/padding behaviors.'
        ],
        readyToMoveOn: [
          'Can build a responsive 3-column bento layout using CSS Grid without breaking container alignment.',
          'Understand margins, padding, box-sizing rules, and border properties.',
          'Can configure custom typography scale utilizing fluid units.'
        ]
      },
      {
        id: 'f3',
        title: 'JavaScript Basics',
        description: 'Make websites interactive with JS.',
        duration: '2 months',
        skills: ['JavaScript', 'DOM Manipulation'],
        resources: [],
        milestones: ['Build an interactive calculator'],
        order: 3,
        whyExists: 'Static markup must become dynamic. JavaScript enables state-driven DOM updates and API calls directly inside the browser.',
        whyThisStep: 'JavaScript is the only programming language native to web browsers, allowing developers to catch user events and dynamically rewrite parts of the screen.',
        whyNow: 'Mastery of fundamental JS concepts (closures, array methods, async/await) is prerequisite to React to prevent struggles with framework syntax.',
        whyBeforeNext: 'React uses JavaScript expressions and lifecycle mechanisms. Attempting to build React component trees without solid JS fundamentals results in severe logic and memory leak issues.',
        realWorldUsage: 'Fetching API payloads, rendering dynamic tables, handling client validation, and managing frontend state transitions.',
        sources: ['roadmap.sh', 'MDN Web Docs', 'javascript.info'],
        suggestedProjects: [
          'An Interactive Task Planner that stores state persistently in browser localStorage.',
          'A real-time search filter interface reading from a mock JSON API response.'
        ],
        expectedOutcome: 'You can hook event handlers, manipulate page elements, and run async request cycles using vanilla code.',
        commonMistakes: [
          'Jumping into component ecosystems without understanding closures, scope chains, array behaviors, and JavaScript event loop executions.',
          'Failing to handle API errors, causing application crashes.'
        ],
        readyToMoveOn: [
          'Can confidently use map, filter, and reduce array methods to transform data.',
          'Understand asynchronous executions, Promise chaining, and async/await syntax.',
          'Can attach event handlers and alter DOM classes cleanly.'
        ]
      },
      {
        id: 'f4',
        title: 'React Ecosystem',
        description: 'Build component-driven user interfaces.',
        duration: '2 months',
        skills: ['React', 'State Management'],
        resources: [],
        milestones: ['Build a dynamic Dashboard'],
        order: 4,
        whyExists: 'Manual DOM management becomes unmaintainable at scale. Declarative component UI libraries like React reduce logic bugs and coordinate state.',
        whyThisStep: 'React provides a virtual DOM layer that handles UI synchronization automatically. Building component trees makes frontend code modular and testable.',
        whyNow: 'Learn React after gaining vanilla JavaScript maturity so you can tell where the language ends and the framework begins.',
        whyBeforeNext: 'You must understand build processes, modular layout, and components before preparing a portfolio or technical interview cases.',
        realWorldUsage: 'Building modern single-page applications (SPAs), SaaS control panels, and interactive dashboards.',
        sources: ['roadmap.sh', 'React Official Docs', 'Vercel Guides'],
        suggestedProjects: [
          'A modular SaaS Dashboard fetching multiple server endpoints, featuring dark mode state settings.',
          'A multi-step checkout wizard with nested state synchronization.'
        ],
        expectedOutcome: 'You can design decoupled, reactive component hierarchies and consume API inputs without side-effect infinite loop bugs.',
        commonMistakes: [
          'Directly mutating state variables instead of invoking functional updater hooks.',
          'Triggering infinite rerender iterations by omitting reference dependencies in useEffect Hooks.'
        ],
        readyToMoveOn: [
          'Can differentiate between state properties and read-only props.',
          'Can lift state parameters upward to synchronize adjacent child components.',
          'Understand controlled component inputs for secure form submissions.'
        ]
      },
      {
        id: 'f5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Deploy 3 Portfolio Projects', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'Hiring is based on proof of execution. You must compile and deploy distinct projects to pass portfolio vetting stages.',
        whyThisStep: 'Technical competency must be displayed publicly. Live urls and clean Git commits show recruiters that you can ship features independently.',
        whyNow: 'Job applications should start only after you have multiple verified projects proving your command over layout and state.',
        whyBeforeNext: 'This is the final checkpoint to validate real-world readiness.',
        realWorldUsage: 'Preparing for technical whiteboard assessments, building case studies, and shipping production deployments via Vercel/Netlify.',
        sources: ['roadmap.sh', 'GitHub Documentation', 'Tech Interview Handbook'],
        suggestedProjects: [
          'A comprehensive personal portfolio site containing deep visual case studies for your major works.',
          'Deploying all case projects live with public link verifications.'
        ],
        expectedOutcome: 'You possess live URLs, robust README project documentations, and are equipped to answer core layout and system design questions.',
        commonMistakes: [
          'Spamming generic applications without aligning projects and cover descriptions with technical needs.',
          'Leaving portfolio sites broken on mobile devices, showing poor design attention.'
        ],
        readyToMoveOn: [
          'Have at least 3 live projects deployed with complete documentation on architecture choices.',
          'Can explain optimization practices like image compression, code-splitting, and caching.',
          'Understand basic collaborative Git version workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-2',
    title: 'Backend Developer',
    slug: 'backend-developer',
    field: 'Technology',
    subfield: 'Web Development',
    description: 'Build the server-side logic, databases, and APIs that power web applications. Backend developers focus on architecture, performance, and security.',
    shortDescription: 'Build the APIs and databases powering the web.',
    avgSalaryIndia: 'Entry: ₹5–8 LPA | Mid: ₹9–18 LPA | Sr: ₹19–30+ LPA',
    avgSalaryGlobal: 'Entry: $60K–$85K | Mid: $90K–$130K | Sr: $140K–$170K+',
    demandTrend: 'rising',
    relatedCareers: ['career-4', 'career-10'],
    tags: ['coding', 'web', 'backend', 'node', 'nodejs', 'sql', 'python', 'api'],
    aliases: ['node developer', 'python developer', 'django developer', 'api developer', 'backend engineer', 'server engineer', 'golang developer', 'c++ developer'],
    icon: 'Code',
    roadmapShUrl: 'https://roadmap.sh/backend',
    overview: 'Backend development is the core architecture of web platforms. Developers construct server code and maintain databases to manage secure data transport.',
    whatItDoes: 'Backend engineers configure databases, code server logic APIs, handle authentication cycles, and manage deployment containers.',
    timeToJobReady: '6–9 months',
    skillsRequired: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Docker', 'AWS'],
    stages: [
      {
        id: 'b1',
        title: 'Programming Fundamentals',
        description: 'Learn a backend language like Node.js or Python.',
        duration: '2 months',
        skills: ['JavaScript', 'Python'],
        resources: [],
        milestones: ['Build a CLI application'],
        order: 1,
        whyExists: 'Before managing data pipelines or servers, you must master basic programming constructs like control flow, memory structures, and error handling.',
        whyThisStep: 'Backend development requires a strong scripting foundation to design logic algorithms, handle data collections, and catch runtime exceptions.',
        whyNow: 'You cannot configure web servers or databases if you cannot write basic functions or clean async code.',
        whyBeforeNext: 'Relational databases require logical operations and data type management that are learned in programming fundamentals.',
        realWorldUsage: 'Writing application logic, data loops, conditional responses, and parsing incoming parameters.',
        sources: ['roadmap.sh', 'MDN Web Docs', 'javascript.info'],
        suggestedProjects: [
          'CLI Task Manager that writes entries to a local JSON file.',
          'Mock Inventory Calculator script verifying store replenishment rules.'
        ],
        expectedOutcome: 'You can write functional and object-oriented scripts to solve data processing problems.',
        commonMistakes: [
          'Omitting proper error try-catch logs, leading to script crashes on bad inputs.',
          'Not understanding asynchronous loops, resulting in blocked execution paths.'
        ],
        readyToMoveOn: [
          'Can write scripts containing logical splits, functions, and error handling.',
          'Understand variables scope rules and asynchronous promise resolutions.',
          'Can manipulate arrays and objects confidently.'
        ]
      },
      {
        id: 'b2',
        title: 'Databases & SQL',
        description: 'Learn to store and query data.',
        duration: '1 month',
        skills: ['SQL', 'PostgreSQL'],
        resources: [],
        milestones: ['Design a relational schema'],
        order: 2,
        whyExists: 'Server memory is transient. Relational database design and structured query operations are necessary to persist and query domain records safely.',
        whyThisStep: 'Every business needs data persistence. SQL provides the structured language to read, write, and index relation models.',
        whyNow: 'After learning variable data flow, you must store those variables persistently in a real database.',
        whyBeforeNext: 'Exposing API server endpoints requires fetching data from a database; hence databases must be learned first.',
        realWorldUsage: 'Creating user tables, running analytical joins, and optimizing select queries.',
        sources: ['roadmap.sh', 'PostgreSQL Manual', 'W3Schools SQL'],
        suggestedProjects: [
          'E-Commerce Database Schema showing relational maps between Users, Orders, and Items.',
          'Write raw SQL queries calculating monthly platform revenue using joins and aggregate filters.'
        ],
        expectedOutcome: 'You can design normal-form schemas and write database join queries to extract reports.',
        commonMistakes: [
          'Failing to specify database primary and foreign keys, resulting in orphaned data rows.',
          'Creating flat, un-normalized table schemas that duplicate data redundantly.'
        ],
        readyToMoveOn: [
          'Can draft relation tables with proper constraints and keys.',
          'Can compose SQL queries using inner/outer joins and group aggregates.',
          'Understand basic indexes to improve query speeds.'
        ]
      },
      {
        id: 'b3',
        title: 'APIs & Servers',
        description: 'Learn to build REST APIs and servers.',
        duration: '2 months',
        skills: ['Express', 'REST', 'HTTP'],
        resources: [],
        milestones: ['Build a RESTful API'],
        order: 3,
        whyExists: 'Backends must serve client applications. Building servers that implement standard REST protocol endpoints connects your data with the frontend.',
        whyThisStep: 'APIs are the contract between backend databases and frontend clients, allowing cross-system communications.',
        whyNow: 'Once you can query your database, you must expose those queries to remote users via HTTP servers.',
        whyBeforeNext: 'Deploying or securing application instances requires having a working web server API code first.',
        realWorldUsage: 'Constructing user registration endpoints, serving JSON payloads, and mapping REST verbs.',
        sources: ['roadmap.sh', 'Express Documentation', 'MDN HTTP Guides'],
        suggestedProjects: [
          'A Book Catalog API serving CRUD endpoints with proper HTTP response status codes.',
          'A weather aggregator endpoint that queries secondary APIs and returns formatted data.'
        ],
        expectedOutcome: 'You can write web server apps, configure router groups, and return structured JSON schemas.',
        commonMistakes: [
          'Returning generic 200 OK status codes for failed operations or invalid resource updates.',
          'Failing to sanitize query parameters, leaving APIs open to crash bugs.'
        ],
        readyToMoveOn: [
          'Understand headers, query strings, body structures, and standard status codes.',
          'Can build routing controllers connecting API endpoints to SQL queries.',
          'Can explain RESTful resource conventions.'
        ]
      },
      {
        id: 'b4',
        title: 'Security & Deployment',
        description: 'Secure your APIs and deploy them.',
        duration: '1 month',
        skills: ['Authentication', 'Docker', 'AWS'],
        resources: [],
        milestones: ['Deploy API to the cloud'],
        order: 4,
        whyExists: 'Exposing open APIs introduces major security vulnerabilities. Containerizing applications and implementing token validation safeguards remote services.',
        whyThisStep: 'Backend security prevents database breaches, and containerization ensures code runs identically in production.',
        whyNow: 'Before shipping your APIs to the public, you must protect user routes with authentication and bundle it using Docker.',
        whyBeforeNext: 'Your portfolio projects must be secured and hosted on live URLs before you apply for jobs.',
        realWorldUsage: 'Securing user passwords using hashing, setting up JWT auth, and wrapping servers in Docker containers.',
        sources: ['roadmap.sh', 'Docker Documentation', 'OWASP Security Standards'],
        suggestedProjects: [
          'Secure Login System implementing bcrypt password hashing and signing JWT tokens.',
          'Containerize a Node/Postgres app using Docker Compose for instant local orchestration.'
        ],
        expectedOutcome: 'You can configure user authorization pipelines and run containerized server apps in remote environments.',
        commonMistakes: [
          'Storing raw string passwords directly in SQL tables without hashing encryption.',
          'Checking server secrets and API key strings directly into public git repositories.'
        ],
        readyToMoveOn: [
          'Can explain JWT authentication workflows and session tokens.',
          'Can write a Dockerfile and compile application containers.',
          'Understand cloud deployment services like Render, Fly.io, or AWS EC2.'
        ]
      },
      {
        id: 'b5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Deploy 3 Backend Projects', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'Backend logic is invisible. You must present documented repository histories and deployed API endpoints to verify engineering competence.',
        whyThisStep: 'You must show recruiters visual proof of code quality, API architecture, and database layout through live API docs and GitHub links.',
        whyNow: 'After mastering data flow, databases, server setups, and security, you package everything to enter the job market.',
        whyBeforeNext: 'This is the final milestone validating full-stack backend skills.',
        realWorldUsage: 'Answering system design questions, presenting architecture flowcharts, and running interview coding challenges.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'GitHub Guides'],
        suggestedProjects: [
          'A comprehensive API portfolio showcasing live documentation links (Swagger/Postman).',
          'Deploying all projects live with public link verifications.'
        ],
        expectedOutcome: 'You possess live API URLs, documented schema files, and are equipped to answer core system design questions.',
        commonMistakes: [
          'Submitting backend code without instructions on how to seed database tables locally.',
          'Leaving APIs open without rate-limiting, risking server billing spikes.'
        ],
        readyToMoveOn: [
          'Have at least 3 live backend projects deployed with API documentation.',
          'Can explain database scaling techniques, connections pooling, and SQL indexing.',
          'Understand basic collaborative version workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-3',
    title: 'Java Developer',
    slug: 'java-developer',
    field: 'Technology',
    subfield: 'Enterprise Software',
    description: 'Build enterprise-scale applications and systems using Java. Java developers work heavily with the Spring framework, microservices, and robust backend systems.',
    shortDescription: 'Build enterprise-grade systems with Java and Spring.',
    avgSalaryIndia: 'Entry: ₹5–8 LPA | Mid: ₹9–18 LPA | Sr: ₹19–35+ LPA',
    avgSalaryGlobal: 'Entry: $60K–$85K | Mid: $90K–$130K | Sr: $140K–$170K+',
    demandTrend: 'stable',
    relatedCareers: ['career-2'],
    tags: ['coding', 'java', 'spring', 'springboot', 'backend', 'enterprise', 'oop'],
    aliases: ['java engineer', 'spring boot developer', 'enterprise developer', 'software developer'],
    icon: 'Code',
    roadmapShUrl: 'https://roadmap.sh/java',
    overview: 'Java is the backbone of global enterprise IT. Developers write modular, object-oriented code to handle transactions, banking records, and complex business processes.',
    whatItDoes: 'Java developers program classes, implement Spring framework APIs, connect Java Database Connectivity (JDBC) pools, and construct microservices.',
    timeToJobReady: '6–8 months',
    skillsRequired: ['Java', 'OOP', 'Spring Boot', 'SQL', 'Hibernate', 'Maven/Gradle'],
    stages: [
      {
        id: 'j1',
        title: 'Java Basics & OOP',
        description: 'Learn Java syntax and object-oriented programming.',
        duration: '2 months',
        skills: ['Java', 'OOP', 'Data Structures'],
        resources: [],
        milestones: ['Build a console banking app'],
        order: 1,
        whyExists: 'Java is a strictly-typed object-oriented language. Mastery of syntax, object classes, inheritance, polymorphism, and basic data structures is essential for backend engineering.',
        whyThisStep: 'Enterprise applications require rigid modular code. OOP paradigms allow teams to manage massive codebases without logic overlap.',
        whyNow: 'You must learn object-oriented design and syntax before writing server-side frameworks or connecting complex databases.',
        whyBeforeNext: 'Configuring build systems like Maven or Gradle requires understanding Java packaging and standard library outputs.',
        realWorldUsage: 'Modeling business domains, writing exception handlers, and organizing collection utilities.',
        sources: ['roadmap.sh', 'Oracle Java Docs', 'JavaTpoint'],
        suggestedProjects: [
          'A console-based Banking Ledger simulating deposits, withdrawals, and account objects.',
          'An Employee Management CLI processing salaries using inheritance classes.'
        ],
        expectedOutcome: 'You can write strictly-typed OOP code, declare custom classes, and leverage Java collection libraries.',
        commonMistakes: [
          'Mismanaging null references, leading to frequent NullPointerExceptions.',
          'Creating monolithic scripts instead of using interfaces and encapsulation.'
        ],
        readyToMoveOn: [
          'Can write custom classes, inheritance schemas, and polymorphism triggers.',
          'Understand references, value copies, and primitive types in Java.',
          'Can use Lists, Sets, and Maps collections confidently.'
        ]
      },
      {
        id: 'j2',
        title: 'Build Tools & Git',
        description: 'Learn Maven/Gradle and version control.',
        duration: '1 month',
        skills: ['Maven', 'Git'],
        resources: [],
        milestones: ['Manage a project with Maven'],
        order: 2,
        whyExists: 'Java projects rely on complex external dependencies. Build tools like Maven and Gradle automate downloading jars, compiling code, and packaging targets.',
        whyThisStep: 'Enterprise development is collaborative. Version control with Git allows teams to track changes, and Maven manages external libraries.',
        whyNow: 'After writing raw Java files, you must learn to package code systematically before introducing web framework dependencies.',
        whyBeforeNext: 'Connecting databases and Spring containers requires importing external driver jars, which is managed via Maven configs.',
        realWorldUsage: 'Managing project dependency XML definitions, automating code compilation, and compiling war/jar bundles.',
        sources: ['roadmap.sh', 'Maven Documentation', 'Git Pro Book'],
        suggestedProjects: [
          'A Maven project importing and utilizing external JSON parser libraries.',
          'Set up a GitHub repository containing branch merge conflicts and resolve them.'
        ],
        expectedOutcome: 'You can manage project build cycles and resolve library dependencies using Maven XML configurations.',
        commonMistakes: [
          'Checking local build folders (target/) into Git commits, bloating repositories.',
          'Declaring conflicting dependency versions, resulting in classpath runtime conflicts.'
        ],
        readyToMoveOn: [
          'Understand POM files, scopes, and target lifecycle builds.',
          'Can coordinate branches, commits, and pull requests in Git.',
          'Can compile Java executable packages from CLI tools.'
        ]
      },
      {
        id: 'j3',
        title: 'Databases & JDBC',
        description: 'Connect Java to relational databases.',
        duration: '1 month',
        skills: ['SQL', 'JDBC', 'Hibernate'],
        resources: [],
        milestones: ['Build a CRUD app with a DB'],
        order: 3,
        whyExists: 'Enterprise applications process millions of persistent records. Connecting Java classes to databases via JDBC and Hibernate ORM models secures and accelerates transactions.',
        whyThisStep: 'Hibernate ORM bridges the object-relational impedance mismatch, mapping Java objects directly to database tables.',
        whyNow: 'Once you can build Java projects, you must connect them to persistent databases before exposing REST API endpoints.',
        whyBeforeNext: 'Building Spring Boot APIs requires fetching database records to return them over REST routes.',
        realWorldUsage: 'Writing SQL scripts, mapping JPA entities, configuring connection pools, and query tuning.',
        sources: ['roadmap.sh', 'Hibernate Docs', 'PostgreSQL Tutorials'],
        suggestedProjects: [
          'A Database Console CRUD system mapping User objects to postgres tables via Hibernate JPA.',
          'A SQL repository manager querying transactions using custom SQL statements.'
        ],
        expectedOutcome: 'You can map tables to Java entities and run transactional CRUD operations.',
        commonMistakes: [
          'Failing to configure entity relationships correctly, creating database lockups or circular joins.',
          'Opening JDBC connections without closing them, creating server resource leaks.'
        ],
        readyToMoveOn: [
          'Can declare JPA annotations (@Entity, @Table, @Id) on Java classes.',
          'Can configure Hibernate database connectivity parameters.',
          'Can explain relational primary/foreign key connections.'
        ]
      },
      {
        id: 'j4',
        title: 'Spring Boot',
        description: 'Build modern APIs using the Spring framework.',
        duration: '2 months',
        skills: ['Spring Boot', 'REST APIs'],
        resources: [],
        milestones: ['Build a full Spring API'],
        order: 4,
        whyExists: 'Spring Boot is the standard framework for microservices. It automates container configuration and dependency injection to speed up API creation.',
        whyThisStep: 'Spring Boot provides annotations that convert Java classes into highly performant web controllers and REST servers.',
        whyNow: 'Learn Spring Boot after mastering OOP, Maven, and JPA so you can understand annotation wiring and configuration.',
        whyBeforeNext: 'Your project stack must be completed and packaged for portfolio reviews and recruitment tests.',
        realWorldUsage: 'Exposing REST endpoints, configuring security filters, caching queries, and building microservices.',
        sources: ['roadmap.sh', 'Spring Projects Docs', 'Spring Boot Tutorials'],
        suggestedProjects: [
          'A Spring Boot e-commerce API exposing REST endpoints for catalog searches and order placement.',
          'A secured microservice implementing spring security filters and JPA queries.'
        ],
        expectedOutcome: 'You can write Spring controllers, services, and repositories to deliver secure JSON web APIs.',
        commonMistakes: [
          'Overcomplicating dependency injection cycles, causing bean initialization failures.',
          'Hardcoding configuration properties inside code instead of using application.yml profiles.'
        ],
        readyToMoveOn: [
          'Can explain @RestController, @Service, and @Repository annotations.',
          'Can write REST controller endpoints matching HTTP verbs.',
          'Understand Spring dependency injection and autowiring rules.'
        ]
      },
      {
        id: 'j5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Deploy a Spring Boot Microservice', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'Enterprise teams evaluate Java developers on architectural knowledge and code formatting quality. Preparing a portfolio validates your ready skills.',
        whyThisStep: 'A hosted Spring Boot microservice proves that you can design systems matching production requirements.',
        whyNow: 'Deploy your final projects and study interview topics once your technical skillset is verified and complete.',
        whyBeforeNext: 'This represents the final launch gate to enter enterprise job positions.',
        realWorldUsage: 'Solving algorithm exercises, presenting system diagrams, and explaining spring lifecycle states to interviewers.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'LeetCode'],
        suggestedProjects: [
          'An API catalog documenting your spring boot microservices using Swagger UI layouts.',
          'Hosting a spring backend live on AWS or Azure platforms.'
        ],
        expectedOutcome: 'You possess live microservice endpoints, clear README structures, and can answer core OOP and thread concurrency questions.',
        commonMistakes: [
          'Leaving repositories empty of documentation, forcing recruiters to figure out build commands.',
          'Neglecting Java memory model concepts, which are frequently asked in interview sessions.'
        ],
        readyToMoveOn: [
          'Have at least 2 live Spring Boot applications deployed.',
          'Can explain REST conventions, JDBC structures, and garbage collection mechanisms.',
          'Can solve moderate array and string algorithm problems.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-4',
    title: 'Full Stack Developer',
    slug: 'full-stack-developer',
    field: 'Technology',
    subfield: 'Software Development',
    description: 'Master both the frontend and backend of web applications. Full stack developers build complete end-to-end systems from UI to database.',
    shortDescription: 'Build end-to-end web applications.',
    avgSalaryIndia: 'Entry: ₹6–10 LPA | Mid: ₹11–22 LPA | Sr: ₹23–40+ LPA',
    avgSalaryGlobal: 'Entry: $70K–$95K | Mid: $100K–$140K | Sr: $150K–$190K+',
    demandTrend: 'rising',
    relatedCareers: ['career-1', 'career-2'],
    tags: ['coding', 'web', 'frontend', 'backend', 'react', 'javascript', 'node', 'sql'],
    aliases: ['mern developer', 'mean developer', 'software architect', 'fullstack engineer', 'freelancer', 'remote developer', 'blockchain developer', 'web3 developer', 'solidity developer', 'smart contract engineer', 'solutions engineer', 'product engineer', 'growth engineer', 'startup founder'],
    icon: 'Monitor',
    roadmapShUrl: 'https://roadmap.sh/full-stack',
    overview: 'Full-stack development bridges front-facing interactions and backend architecture. Generalists build complete features, coordinate server API calls, and maintain database layouts.',
    whatItDoes: 'Full stack developers program CSS/HTML responsive views, construct server logic routers, set up databases, configure cache parameters, and host staging deployments.',
    timeToJobReady: '7–10 months',
    skillsRequired: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'SQL', 'PostgreSQL', 'Docker'],
    stages: [
      {
        id: 'fs1',
        title: 'Frontend Basics',
        description: 'HTML, CSS, and basic JavaScript.',
        duration: '2 months',
        skills: ['HTML', 'CSS', 'JavaScript'],
        resources: [],
        milestones: ['Build an interactive site'],
        order: 1,
        whyExists: 'All web applications resolve to HTML structure and CSS layouts inside the browser. Generalists must start by building visual documents.',
        whyThisStep: 'Frontend basics cover the syntax and rendering behaviors required to build user-facing pages.',
        whyNow: 'Before programming databases or APIs, you must understand how code renders on user screens.',
        whyBeforeNext: 'Component frameworks like React wrap styling and DOM elements, which requires mastering HTML/CSS first.',
        realWorldUsage: 'Drafting responsive layouts, styling component tags, and monitoring browser rendering steps.',
        sources: ['roadmap.sh', 'MDN Web Docs', 'javascript.info'],
        suggestedProjects: [
          'A responsive software pricing calculator using semantic markup and CSS Flexbox layout.',
          'An interactive task counter manipulating DOM elements with vanilla JavaScript.'
        ],
        expectedOutcome: 'You can write accessible, styled browser views and manage DOM click events.',
        commonMistakes: [
          'Using non-semantic styling containers everywhere, causing broken page reading tools.',
          'Not writing responsive styles, leading to layout breaks on smaller screens.'
        ],
        readyToMoveOn: [
          'Can write valid semantic markup files.',
          'Can style flexible layouts using Flexbox and CSS media queries.',
          'Can declare and invoke functions using JavaScript.'
        ]
      },
      {
        id: 'fs2',
        title: 'React & UI',
        description: 'Build modern frontends with React.',
        duration: '2 months',
        skills: ['React'],
        resources: [],
        milestones: ['Build a dynamic SPA'],
        order: 2,
        whyExists: 'Manual DOM rendering becomes unmanageable for rich applications. React manages data changes, updating components automatically.',
        whyThisStep: 'React provides a virtual DOM layer that simplifies state synchronization across views.',
        whyNow: 'After mastering basic JS DOM coding, you learn React to build complex interfaces efficiently.',
        whyBeforeNext: 'Connecting frontend pages to backend APIs requires a solid interface engine that can fetch and render JSON lists.',
        realWorldUsage: 'Building SaaS dashboards, interactive forms, and state-driven landing pages.',
        sources: ['roadmap.sh', 'React Official Docs', 'Vercel Guides'],
        suggestedProjects: [
          'A dynamic weather dashboard rendering search parameters and card components.',
          'A multi-step application form with shared step validation states.'
        ],
        expectedOutcome: 'You can build decoupled component trees and handle state dependencies without rerendering bugs.',
        commonMistakes: [
          'Mutating state references directly, preventing React from triggering visual updates.',
          'Leaving hook dependency arrays empty, resulting in network loop spikes.'
        ],
        readyToMoveOn: [
          'Can differentiate between read-only props and dynamic state properties.',
          'Can configure form inputs using React state binding.',
          'Can fetch JSON datasets using hook lifecycles.'
        ]
      },
      {
        id: 'fs3',
        title: 'Backend APIs',
        description: 'Build Node.js and Express servers.',
        duration: '2 months',
        skills: ['Node.js', 'Express'],
        resources: [],
        milestones: ['Build a REST API'],
        order: 3,
        whyExists: 'Frontend interfaces require data from remote databases. Server APIs manage data access, authentication, and routing rules.',
        whyThisStep: 'Node.js allows generalists to write server logic using JavaScript, and Express simplifies route handling.',
        whyNow: 'Learn backend routing once you can build interfaces that need remote data.',
        whyBeforeNext: 'An API server is useless without a persistent database; databases must be added next.',
        realWorldUsage: 'Exposing REST routes, parsing JSON parameters, and implementing route middleware filters.',
        sources: ['roadmap.sh', 'Express Documentation', 'Node.js Guides'],
        suggestedProjects: [
          'A Task Catalog API serving standard CRUD operations.',
          'An auth middleware checking header token validations on routes.'
        ],
        expectedOutcome: 'You can write HTTP servers, define REST routing hierarchies, and handle query strings.',
        commonMistakes: [
          'Omitting status codes from API response methods, defaulting to generic returns.',
          'Failing to catch controller promise rejections, risking server crash loops.'
        ],
        readyToMoveOn: [
          'Understand REST resource design guidelines.',
          'Can write custom Express controllers and middleware functions.',
          'Can manage JSON inputs and headers in requests.'
        ]
      },
      {
        id: 'fs4',
        title: 'Databases',
        description: 'Integrate SQL or NoSQL databases.',
        duration: '1 month',
        skills: ['PostgreSQL', 'MongoDB'],
        resources: [],
        milestones: ['Build a full-stack CRUD app'],
        order: 4,
        whyExists: 'Application state must persist. Integrating PostgreSQL databases allows full-stack tools to save relational records permanently.',
        whyThisStep: 'Relational data structures manage references across users, sessions, and transaction items safely.',
        whyNow: 'Learn database design after writing APIs so you can connect server logic directly to database tables.',
        whyBeforeNext: 'A complete product needs visual pages, APIs, and databases integrated before job applications.',
        realWorldUsage: 'Designing tables, indexing databases, migrating schemas, and query optimization.',
        sources: ['roadmap.sh', 'PostgreSQL Manuals', 'MongoDB Docs'],
        suggestedProjects: [
          'A full-stack message board syncing UI cards with Postgres data rows.',
          'An inventory tracker saving items with Prisma migrations.'
        ],
        expectedOutcome: 'You can configure relational tables and query database schemas using APIs.',
        commonMistakes: [
          'Checking database connection passwords into open git repository branches.',
          'Omitting foreign key relationships, leading to inconsistent data records.'
        ],
        readyToMoveOn: [
          'Can configure entity relationships and query filters.',
          'Can connect database engines to Express using driver instances.',
          'Can perform migrations to update database columns.'
        ]
      },
      {
        id: 'fs5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Deploy 3 Full-Stack Projects', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'Hiring managers check full-stack capabilities through live projects. Compiling a portfolio proves you can build end-to-end.',
        whyThisStep: 'Publicly hosted applications demonstrate that you can deploy and maintain code in production.',
        whyNow: 'Deploy products and practice coding scenarios once your frontend, backend, and database modules work together.',
        whyBeforeNext: 'This represents the final launch step to prepare for full-stack positions.',
        realWorldUsage: 'Presenting system architectures, showing code repositories, and resolving coding test problems.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'Vercel Guides'],
        suggestedProjects: [
          'A deployed multi-feature SaaS application including login features and database synchronization.',
          'A portfolio website outlining case studies with live deployment links.'
        ],
        expectedOutcome: 'You possess deployed full-stack links, complete repository instructions, and can explain data flow details.',
        commonMistakes: [
          'Failing to verify mobile usability on frontend views of portfolio projects.',
          'Leaving database connection pool limits unconfigured, causing deployment crash errors.'
        ],
        readyToMoveOn: [
          'Have at least 2 complete full-stack applications deployed.',
          'Can describe API architectures, database joins, and deployment pipelines.',
          'Understand basic git branching workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-5',
    title: 'Data Scientist',
    slug: 'data-scientist',
    field: 'Data Science',
    subfield: 'Analytics & ML',
    description: 'Extract insights from data using statistics, machine learning, and domain expertise. Data scientists solve complex business problems by analyzing patterns in large datasets.',
    shortDescription: 'Turn data into actionable insights and predictions.',
    avgSalaryIndia: 'Entry: ₹6–9 LPA | Mid: ₹10–20 LPA | Sr: ₹21–35+ LPA',
    avgSalaryGlobal: 'Entry: $65K–$90K | Mid: $95K–$135K | Sr: $140K–$180K+',
    demandTrend: 'rising',
    relatedCareers: ['career-6'],
    tags: ['data', 'machine learning', 'statistics', 'python', 'analytics', 'sql'],
    aliases: ['data engineer', 'machine learning researcher', 'statistician'],
    icon: 'BarChart3',
    roadmapShUrl: 'https://roadmap.sh/ai-data-scientist',
    overview: 'Data science blends statistics and algorithms. Experts process data, extract patterns, and train prediction pipelines to help companies make decisions.',
    whatItDoes: 'Data scientists write database queries, clean datasets using Python, apply statistical models, and build prediction notebooks.',
    timeToJobReady: '6–9 months',
    skillsRequired: ['Python', 'SQL', 'Statistics', 'Pandas', 'Scikit-Learn', 'Data Visualization'],
    stages: [
      {
        id: 'ds1',
        title: 'Python Fundamentals',
        description: 'Learn programming basics for data.',
        duration: '2 months',
        skills: ['Python'],
        resources: [],
        milestones: ['Build a CLI data tool'],
        order: 1,
        whyExists: 'Python is the core language for data libraries. Master syntax, control flows, data types, and file operations before doing data engineering.',
        whyThisStep: 'Python provides a readable, flexible syntax that allows developers to run data calculations and parse clean tables.',
        whyNow: 'You must learn code variables and scripting logic before writing data transformations or training model files.',
        whyBeforeNext: 'Extracting data files from databases requires database query capabilities, which you learn after basic Python.',
        realWorldUsage: 'Writing parsing loops, executing mathematical equations, and loading data files.',
        sources: ['roadmap.sh', 'Python Documentation', 'Real Python'],
        suggestedProjects: [
          'A CLI utility importing CSV values and calculating data summaries.',
          'An automated script sorting file directories based on date flags.'
        ],
        expectedOutcome: 'You can write clean Python scripts to parse data tables and run calculations.',
        commonMistakes: [
          'Hardcoding file locations inside python scripts, breaking them on other systems.',
          'Not utilizing virtual environment folders, causing library version clashes.'
        ],
        readyToMoveOn: [
          'Can declare collections, maps, and functions in Python.',
          'Can run file operations and catch execution warnings.',
          'Understand pip package management.'
        ]
      },
      {
        id: 'ds2',
        title: 'SQL & Databases',
        description: 'Learn to extract and manipulate data.',
        duration: '1 month',
        skills: ['SQL'],
        resources: [],
        milestones: ['Write complex JOIN queries'],
        order: 2,
        whyExists: 'Data scientists extract data from corporate databases. Writing SQL allows you to join tables, filter records, and aggregate numbers.',
        whyThisStep: 'SQL is the industry standard for querying relational tables where business transactions are recorded.',
        whyNow: 'Learn SQL once you can process variables so you can query database tables directly into data environments.',
        whyBeforeNext: 'Applying statistical tests is only possible after extracting dataset files from databases.',
        realWorldUsage: 'Writing SQL scripts, combining datasets, aggregating columns, and filtering records.',
        sources: ['roadmap.sh', 'PostgreSQL Tutorials', 'SQLbolt'],
        suggestedProjects: [
          'Write database queries analyzing sales trends across customer tables.',
          'A schema outline setting up tables for marketing metrics.'
        ],
        expectedOutcome: 'You can write SQL queries using joins and aggregates to extract clean datasets.',
        commonMistakes: [
          'Writing inefficient queries that scan whole databases without index filters.',
          'Failing to handle duplicate user rows when joining relational databases.'
        ],
        readyToMoveOn: [
          'Can write SQL queries containing JOIN, GROUP BY, and HAVING constraints.',
          'Can configure columns with correct data types.',
          'Can filter anomalies using WHERE queries.'
        ]
      },
      {
        id: 'ds3',
        title: 'Math & Stats',
        description: 'Build a strong foundation in statistics.',
        duration: '2 months',
        skills: ['Statistics', 'Linear Algebra', 'Probability'],
        resources: [],
        milestones: ['Complete statistical analysis project'],
        order: 3,
        whyExists: 'Algorithms depend on mathematics. Linear algebra, calculus, and probability allow developers to test hypotheses and select variables.',
        whyThisStep: 'Statistics provides the validation tools to determine if data patterns represent real trends or noise.',
        whyNow: 'Learn mathematical theory before training models to avoid misinterpreting prediction metrics.',
        whyBeforeNext: 'Data cleaning tools are designed to prepare data for these mathematical evaluations.',
        realWorldUsage: 'Running significance tests, plotting distributions, and calculating correlation matrices.',
        sources: ['roadmap.sh', 'Khan Academy Statistics', 'OpenIntro Statistics'],
        suggestedProjects: [
          'A Jupyter analysis testing hypotheses on web traffic differences.',
          'A matrix transformation notebook showing calculations of data dimensions.'
        ],
        expectedOutcome: 'You can perform hypothesis tests, calculate p-values, and plot data curves.',
        commonMistakes: [
          'Assuming correlation represents causation without checking control variables.',
          'Running tests on skewed data without adjusting scale metrics.'
        ],
        readyToMoveOn: [
          'Can explain variance, standard deviations, and probability distributions.',
          'Can calculate regression correlations between table parameters.',
          'Can explain p-values and confidence boundaries.'
        ]
      },
      {
        id: 'ds4',
        title: 'Data Wrangling',
        description: 'Learn to collect, clean, and transform data.',
        duration: '2 months',
        skills: ['Pandas', 'NumPy'],
        resources: [],
        milestones: ['Analyze a real dataset'],
        order: 4,
        whyExists: 'Real-world data is dirty. Pandas and NumPy allow developers to clean empty rows, encode labels, and reshape tables.',
        whyThisStep: 'Pandas provides high-performance dataframes to filter, merge, and group tables.',
        whyNow: 'After learning statistics, master data wrangling to clean datasets before training models.',
        whyBeforeNext: 'Models require clean, formatted numbers; raw, un-wrangled files will crash algorithms.',
        realWorldUsage: 'Replacing null columns, parsing dates, encoding labels, and normalizing values.',
        sources: ['roadmap.sh', 'Pandas Documentation', 'Kaggle Tutorials'],
        suggestedProjects: [
          'Clean a dirty dataset containing user records, fixing formats and null rows.',
          'Create a data profile showing correlations across variables.'
        ],
        expectedOutcome: 'You can clean datasets, merge tables, and normalize columns using Pandas dataframes.',
        commonMistakes: [
          'Directly overwriting source dataframes instead of using copy references.',
          'Ignoring missing data, resulting in skewed training results.'
        ],
        readyToMoveOn: [
          'Can load, merge, and filter tables using Pandas.',
          'Can resolve missing values and clean outlier records.',
          'Can encode text labels into numbers.'
        ]
      },
      {
        id: 'ds5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish 3 GitHub Data Projects', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'Employers evaluate data scientists on communication and coding. Compiling case studies verifies you can solve business problems.',
        whyThisStep: 'Case studies explain the business problem, dataset cleaning steps, and model insights clearly.',
        whyNow: 'Package your data studies and practice explaining models once your skills are verified.',
        whyBeforeNext: 'This is the final checkpoint to enter the data analytics market.',
        realWorldUsage: 'Explaining predictive results, presenting dashboards, and writing clean notebooks.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'Kaggle Competitions'],
        suggestedProjects: [
          'A portfolio site containing case studies showing database queries and data visualizations.',
          'Three structured GitHub repositories with code documentation.'
        ],
        expectedOutcome: 'You possess documented analysis notebooks, visualization dashboards, and can explain data models.',
        commonMistakes: [
          'Failing to document business impacts, focusing only on model code.',
          'Leaving code undocumented, forcing managers to guess library dependencies.'
        ],
        readyToMoveOn: [
          'Have at least 2 complete data analysis notebooks published.',
          'Can explain linear regressions, SQL joins, and data cleaning strategies.',
          'Understand basic Git workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-6',
    title: 'AI Engineer',
    slug: 'ai-engineer',
    field: 'Technology',
    subfield: 'Artificial Intelligence',
    description: 'Build and deploy machine learning models and AI systems at scale. Work on everything from recommendation engines to autonomous systems and large language models.',
    shortDescription: 'Build intelligent systems that learn and adapt.',
    avgSalaryIndia: 'Entry: ₹7–11 LPA | Mid: ₹12–25 LPA | Sr: ₹26–50+ LPA',
    avgSalaryGlobal: 'Entry: $80K–$110K | Mid: $120K–$180K | Sr: $190K–$250K+',
    demandTrend: 'rising',
    relatedCareers: ['career-5'],
    tags: ['ai', 'machine learning', 'deep learning', 'python', 'neural networks'],
    aliases: ['ai researcher', 'prompt engineer', 'machine learning engineer', 'llm engineer', 'nlp engineer'],
    icon: 'Brain',
    roadmapShUrl: 'https://roadmap.sh/ai-engineer',
    overview: 'AI engineering implements statistical learning systems. Developers design pipeline integrations, orchestrate foundation models, and deploy neural networks.',
    whatItDoes: 'AI engineers program neural structures using PyTorch, deploy vector storage indexes, write FastAPI wrappers, and run model evaluation passes.',
    timeToJobReady: '9–12 months',
    skillsRequired: ['Python', 'Linear Algebra', 'Calculus', 'Scikit-learn', 'PyTorch', 'FastAPI', 'MLOps'],
    stages: [
      {
        id: 'ai1',
        title: 'Python & Math Foundations',
        description: 'Master Python, linear algebra, calculus, and probability.',
        duration: '3 months',
        skills: ['Python', 'Linear Algebra', 'Calculus'],
        resources: [],
        milestones: ['Implement mathematical algorithms in Python'],
        order: 1,
        whyExists: 'AI structures operate on high-dimensional vector representations. Linear algebra, derivatives, and probability metrics are mathematically fundamental to updating neural network weights.',
        whyThisStep: 'AI models rely on mathematical calculations; coding algorithms from scratch verifies your numerical understanding.',
        whyNow: 'You must master vectors, matrix dot products, and multi-variable derivatives before writing neural architectures.',
        whyBeforeNext: 'Predictive algorithms leverage these mathematical concepts to fit boundaries and evaluate error scores.',
        realWorldUsage: 'Writing matrix multipliers, configuring loss equations, and parsing vectors.',
        sources: ['roadmap.sh', '3Blue1Brown Mathematics', 'Scipy Guides'],
        suggestedProjects: [
          'A Python script running matrix transformations without external libraries.',
          'An optimization routine executing gradient descent steps to minimize test variables.'
        ],
        expectedOutcome: 'You can write array calculations and explain matrix operations and optimization derivatives.',
        commonMistakes: [
          'Ignoring probability rules, resulting in bad modeling assumptions.',
          'Using slow scripting loops instead of optimized array operations.'
        ],
        readyToMoveOn: [
          'Can perform vector dot products and matrix operations.',
          'Understand gradient descent optimization mechanics.',
          'Can write structured Python scripts.'
        ]
      },
      {
        id: 'ai2',
        title: 'Machine Learning & Evaluation',
        description: 'Learn core ML algorithms, model evaluation metrics, and frameworks.',
        duration: '3 months',
        skills: ['Scikit-learn', 'Model Evaluation'],
        resources: [],
        milestones: ['Win a Kaggle competition'],
        order: 2,
        whyExists: 'Before training complex neural models, you must understand predictive baselines. Linear/Logistic regressions, decision trees, and validation metrics like ROC-AUC prevent overfitting.',
        whyThisStep: 'Scikit-learn provides standardized utilities to train models, scale inputs, and run validation splits.',
        whyNow: 'Learn classical machine learning after math foundations so you can interpret parameters and validate outputs.',
        whyBeforeNext: 'Deep learning uses layered weights, which require understanding basic classification and loss boundaries first.',
        realWorldUsage: 'Training classifiers, scaling input metrics, splitting tables, and calculating error matrices.',
        sources: ['roadmap.sh', 'Scikit-learn Tutorials', 'Kaggle Courses'],
        suggestedProjects: [
          'Train a model classifier to predict metrics using cross-validation.',
          'An analysis comparing model performances across different evaluation scores.'
        ],
        expectedOutcome: 'You can train classification models, tune parameters, and interpret error matrices.',
        commonMistakes: [
          'Evaluating models on training data, failing to spot validation errors.',
          'Leaving data unscaled, which slows down optimization steps.'
        ],
        readyToMoveOn: [
          'Can explain differences between classification and regression models.',
          'Can split data tables and execute cross-validation cycles.',
          'Understand precision, recall, and ROC-AUC curves.'
        ]
      },
      {
        id: 'ai3',
        title: 'Deep Learning & NLP',
        description: 'Master neural networks, computer vision, and NLP foundations.',
        duration: '4 months',
        skills: ['PyTorch', 'NLP', 'Computer Vision'],
        resources: [],
        milestones: ['Train a Neural Network from scratch'],
        order: 3,
        whyExists: 'Perceptual problems require deep layered architectures. Backpropagation, CNNs, and attention mechanisms enable computers to map unstructured spatial and sequential patterns.',
        whyThisStep: 'PyTorch provides tensor graphs and autograd engines to train neural layers and handle images/text.',
        whyNow: 'Master deep learning once you can evaluate models to ensure you build reliable, deep structures.',
        whyBeforeNext: 'Pre-trained models are specialized neural networks; you must understand deep layouts before orchestrating them.',
        realWorldUsage: 'Building neural layers, configuring loaders, training image detectors, and writing tokenizers.',
        sources: ['roadmap.sh', 'Fast.ai courses', 'Stanford CS231n'],
        suggestedProjects: [
          'A PyTorch image classifier trained on custom datasets.',
          'A text generation recurrent model tokenizing inputs.'
        ],
        expectedOutcome: 'You can configure neural layers, track training losses, and feed files into PyTorch.',
        commonMistakes: [
          'Ignoring GPU memory limits, causing training processes to run out of memory.',
          'Setting high learning rates, preventing models from converging.'
        ],
        readyToMoveOn: [
          'Can write PyTorch datasets, dataloaders, and training loops.',
          'Understand convolutions, activations, and backpropagation.',
          'Can tokenize text sentences.'
        ]
      },
      {
        id: 'ai4',
        title: 'Modern LLMs & RAG',
        description: 'Learn Retrieval-Augmented Generation (RAG), Vector Databases (Chroma/Pinecone), and LLM orchestration frameworks (LangChain/LlamaIndex).',
        duration: '2 months',
        skills: ['RAG', 'Vector Databases', 'AI Agents'],
        resources: [],
        milestones: ['Build a RAG chatbot using a local vector database'],
        order: 4,
        whyExists: 'Pre-trained models lack local context. Implementing vector indexing architectures connects dynamic enterprise knowledge to generative interfaces.',
        whyThisStep: 'Vector databases store text embeddings, allowing rapid context searches to feed into prompts.',
        whyNow: 'Learn LLM orchestration after deep learning to leverage pre-trained models safely and effectively.',
        whyBeforeNext: 'Deploying agent tools requires having a working LLM interface or RAG application first.',
        realWorldUsage: 'Building documentation bots, indexing vectors, designing prompts, and checking agent calls.',
        sources: ['roadmap.sh', 'Hugging Face Docs', 'Pinecone Tutorials'],
        suggestedProjects: [
          'A PDF QA Chatbot using LangChain and a local vector index.',
          'An agent tool parsing search engines based on prompts.'
        ],
        expectedOutcome: 'You can index text documents, calculate embeddings, and coordinate LLM API requests.',
        commonMistakes: [
          'Passing large text chunks into prompts, exceeding token limits.',
          'Hardcoding prompt inputs without checking for user injections.'
        ],
        readyToMoveOn: [
          'Can partition text and write vectors to storage engines.',
          'Can configure LLM prompts using custom templates.',
          'Understand embeddings calculations.'
        ]
      },
      {
        id: 'ai5',
        title: 'Model Deployment & MLOps',
        description: 'Learn model deployment, API wrapper construction, monitoring, and MLOps tools.',
        duration: '2 months',
        skills: ['FastAPI', 'Docker', 'MLOps'],
        resources: [],
        milestones: ['Deploy model via REST API and automate monitoring container'],
        order: 5,
        whyExists: 'Models in notebooks cannot serve users. MLOps structures automate model serving, container isolation, and output drift monitoring in production environments.',
        whyThisStep: 'FastAPI wraps model calls in fast API endpoints, and Docker containerizes the service.',
        whyNow: 'Learn deployment once you can build working models and agent interfaces.',
        whyBeforeNext: 'This is the final deployment gate to enter the AI engineering field.',
        realWorldUsage: 'Hosting endpoints, building container images, setting up pipelines, and checking predictions.',
        sources: ['roadmap.sh', 'FastAPI Documentation', 'MLOps Guide'],
        suggestedProjects: [
          'Deploy an image classifier using FastAPI and Docker containers.',
          'A pipeline monitoring data changes and checking for model drift.'
        ],
        expectedOutcome: 'You can deploy model API services inside Docker containers and verify predictions.',
        commonMistakes: [
          'Deploying models without verification tests, causing runtime failures on bad inputs.',
          'Loading heavy models on every API request instead of caching them at startup.'
        ],
        readyToMoveOn: [
          'Can write FastAPI endpoints serving model predictions.',
          'Can containerize python dependencies using Docker.',
          'Understand model tracking tools.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-7',
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    field: 'Technology',
    subfield: 'DevOps & Cloud',
    description: 'Bridge the gap between development and operations. Automate infrastructure, deploy scalable architectures, and ensure high availability.',
    shortDescription: 'Automate, deploy, and scale cloud infrastructure.',
    avgSalaryIndia: 'Entry: ₹6–9 LPA | Mid: ₹10–20 LPA | Sr: ₹21–35+ LPA',
    avgSalaryGlobal: 'Entry: $70K–$95K | Mid: $100K–$140K | Sr: $150K–$190K+',
    demandTrend: 'rising',
    relatedCareers: ['career-2'],
    tags: ['devops', 'cloud', 'aws', 'linux', 'docker', 'kubernetes', 'ci/cd', 'terraform'],
    aliases: ['sre engineer', 'site reliability engineer', 'platform engineer', 'cloud engineer', 'aws engineer', 'infrastructure engineer'],
    icon: 'Cloud',
    roadmapShUrl: 'https://roadmap.sh/devops',
    overview: 'DevOps bridges application development and operations. Engineers build automated pipelines and coordinate cloud resources to run code reliably.',
    whatItDoes: 'DevOps engineers configure Linux networks, script automation paths, compile Docker containers, design CI/CD builds, and write infrastructure files.',
    timeToJobReady: '8–10 months',
    skillsRequired: ['Linux', 'Docker', 'CI/CD', 'Terraform', 'Kubernetes', 'AWS/Azure'],
    stages: [
      {
        id: 'd1',
        title: 'Linux & Networking',
        description: 'Master the command line and core networking concepts.',
        duration: '2 months',
        skills: ['Linux', 'Bash', 'TCP/IP', 'DNS'],
        resources: [],
        milestones: ['Set up a secure Linux server'],
        order: 1,
        whyExists: 'Production environments run on Linux kernels. You must understand POSIX commands, system files, port management, and routing to resolve server outages.',
        whyThisStep: 'Linux tools and TCP/IP networking form the foundation of cloud servers, configuration routing, and system directories.',
        whyNow: 'Master Linux and networking basics before deploying apps or automating cloud configurations.',
        whyBeforeNext: 'Container runtimes isolate processes within Linux environments, which requires system knowledge first.',
        realWorldUsage: 'Writing scripts, editing config files, routing traffic, and checking port bindings.',
        sources: ['roadmap.sh', 'Linux Command Line book', 'DNS Guides'],
        suggestedProjects: [
          'Configure a local Linux server with firewall rules and user permissions.',
          'A shell script tracking system resource usage and writing log files.'
        ],
        expectedOutcome: 'You can navigate Linux files, write automation scripts, and troubleshoot network routings.',
        commonMistakes: [
          'Running scripts as root user instead of configuring restricted user accounts.',
          'Ignoring firewall rules, exposing development ports to the public.'
        ],
        readyToMoveOn: [
          'Can write functional Bash scripts using variables and loops.',
          'Understand file permissions, user groups, and process tracking.',
          'Can troubleshoot connection routes.'
        ]
      },
      {
        id: 'd2',
        title: 'Containers',
        description: 'Learn to package applications.',
        duration: '1 month',
        skills: ['Docker'],
        resources: [],
        milestones: ['Deploy a containerized microservice'],
        order: 2,
        whyExists: '"Works on my machine" is not an option for server code. Containers freeze application dependencies, environment flags, and libraries into reliable, reproducible execution packages.',
        whyThisStep: 'Docker packages runtime environments, isolating applications from the underlying host servers.',
        whyNow: 'Learn containers after Linux basics so you can write clean execution rules inside images.',
        whyBeforeNext: 'Cloud orchestration pipelines are designed to move and scale these container images.',
        realWorldUsage: 'Writing Dockerfiles, building images, isolating network ports, and orchestrating multi-container layouts.',
        sources: ['roadmap.sh', 'Docker Documentation', 'Katacoda Docker'],
        suggestedProjects: [
          'Write a Dockerfile to package a web application with its runtime dependencies.',
          'Configure Docker Compose to coordinate a web server and postgres database.'
        ],
        expectedOutcome: 'You can build container images, run isolated containers, and configure compose scripts.',
        commonMistakes: [
          'Creating bloated container images by omitting proper build steps or cache directories.',
          'Hardcoding secrets and environment configs directly inside Dockerfiles.'
        ],
        readyToMoveOn: [
          'Can write multi-stage Dockerfiles.',
          'Can coordinate containers using Docker Compose.',
          'Understand volume mounts and port mapping.'
        ]
      },
      {
        id: 'd3',
        title: 'Cloud & CI/CD',
        description: 'Master AWS and automated deployments.',
        duration: '2 months',
        skills: ['AWS', 'GitHub Actions'],
        resources: [],
        milestones: ['Build a fully automated CI/CD pipeline'],
        order: 3,
        whyExists: 'Manual deployments lead to human errors. CI/CD pipelines automate testing, building, and pushing releases to remote instances with zero downtime.',
        whyThisStep: 'CI/CD orchestrations automate the software lifecycle, moving code from commits to production environments.',
        whyNow: 'Learn automation pipelines once you can build containerized apps that need to be deployed.',
        whyBeforeNext: 'Managing multiple cloud services requires declaring infrastructure in configuration files.',
        realWorldUsage: 'Writing pipeline files, managing secrets, provisioning instances, and configuring server networks.',
        sources: ['roadmap.sh', 'AWS Documentation', 'GitHub Actions Docs'],
        suggestedProjects: [
          'A GitHub Action workflow running tests and building containers on commits.',
          'Deploy a containerized application to cloud compute instances with auto-scaling.'
        ],
        expectedOutcome: 'You can configure automated workflows that test, compile, and host apps in cloud environments.',
        commonMistakes: [
          'Exposing cloud provider credentials in public git repositories.',
          'Running builds without test assertions, allowing broken builds to deploy.'
        ],
        readyToMoveOn: [
          'Can write YAML workflows for GitHub Actions.',
          'Can configure basic network gateways on cloud platforms.',
          'Understand deployment keys.'
        ]
      },
      {
        id: 'd4',
        title: 'Infrastructure as Code',
        description: 'Automate infrastructure provisioning.',
        duration: '2 months',
        skills: ['Terraform', 'Kubernetes'],
        resources: [],
        milestones: ['Deploy an EKS cluster with Terraform'],
        order: 4,
        whyExists: 'Setting up cloud servers by clicking web portals is unscalable. Describing infrastructure declarative-style in configuration files allows teams to review, version, and duplicate networks safely.',
        whyThisStep: 'Terraform automates infrastructure setups, and Kubernetes orchestrates large-scale container deployments.',
        whyNow: 'Master infrastructure as code once you can deploy manually so you can automate those actions.',
        whyBeforeNext: 'A working deployment pipeline is required to package your project portfolio for recruitment.',
        realWorldUsage: 'Writing Terraform files, managing state, configuring Kubernetes configurations, and managing cluster nodes.',
        sources: ['roadmap.sh', 'Terraform Docs', 'Kubernetes Guides'],
        suggestedProjects: [
          'Write Terraform configurations to provision a secure VPC network.',
          'Deploy a container service across a Kubernetes cluster with load balancers.'
        ],
        expectedOutcome: 'You can write declarative configurations to provision networks and coordinate container clusters.',
        commonMistakes: [
          'Ignoring state file locking in Terraform, causing resource configuration conflicts.',
          'Under-provisioning Kubernetes resource requests, leading to cluster failures.'
        ],
        readyToMoveOn: [
          'Can configure modules and state maps in Terraform.',
          'Can deploy container configurations to Kubernetes.',
          'Understand ingress routing.'
        ]
      },
      {
        id: 'd5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish 3 DevOps Projects', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'DevOps is a high-responsibility role. You must provide public pipeline files, Terraform modules, and architecture diagrams to establish configuration competence.',
        whyThisStep: 'Hosted project configurations demonstrate that you can deploy and maintain secure production environments.',
        whyNow: 'Organize your repositories and practice configuration topics once your deployment structures work.',
        whyBeforeNext: 'This represents the final step to enter DevOps engineering roles.',
        realWorldUsage: 'Explaining pipeline structures, sketching configurations, and resolving system recovery scenarios.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'AWS Whitepapers'],
        suggestedProjects: [
          'A GitHub repository containing documented Terraform templates and pipeline configurations.',
          'A portfolio site displaying architecture diagrams and system documentations.'
        ],
        expectedOutcome: 'You possess documented repository pipelines, system architectures, and can answer system recovery questions.',
        commonMistakes: [
          'Sharing system configurations without documenting how to deploy them.',
          'Leaving open permissions on sandbox deployments, risking cloud bill spikes.'
        ],
        readyToMoveOn: [
          'Have at least 2 complete deployment pipelines documented.',
          'Can explain DNS routing, container operations, and infrastructure structures.',
          'Understand git-flow workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-8',
    title: 'Mobile Developer',
    slug: 'mobile-developer',
    field: 'Technology',
    subfield: 'Software Development',
    description: 'Build native and cross-platform applications for iOS and Android devices.',
    shortDescription: 'Build the apps people use every day.',
    avgSalaryIndia: 'Entry: ₹5–8 LPA | Mid: ₹9–15 LPA | Sr: ₹16–25+ LPA',
    avgSalaryGlobal: 'Entry: $60K–$85K | Mid: $90K–$120K | Sr: $130K–$160K+',
    demandTrend: 'rising',
    relatedCareers: ['career-1'],
    tags: ['mobile', 'android', 'ios', 'flutter', 'dart', 'react native'],
    aliases: ['android developer', 'ios developer', 'flutter developer', 'react native developer', 'app developer'],
    icon: 'Monitor',
    roadmapShUrl: 'https://roadmap.sh/android',
    overview: 'Mobile development creates applications for handheld devices. Developers implement gesture layouts, optimize performance, and deploy builds to app stores.',
    whatItDoes: 'Mobile developers code user interfaces, manage local databases, handle offline synchronization, integrate push notifications, and build platform packages.',
    timeToJobReady: '6–8 months',
    skillsRequired: ['Kotlin/Swift', 'React Native/Flutter', 'REST APIs', 'Firebase', 'Mobile Security', 'Store Publishing'],
    stages: [
      {
        id: 'm1',
        title: 'Programming Fundamentals',
        description: 'Learn Dart or Kotlin.',
        duration: '2 weeks',
        skills: ['Dart', 'Kotlin'],
        resources: [],
        milestones: ['Build a CLI application'],
        order: 1,
        whyExists: 'Mobile platforms require specific execution engines. Learning languages like Dart or Kotlin teaches type safety, asynchronous loops, and object-oriented syntax.',
        whyThisStep: 'Kotlin and Dart are optimized for rendering components and managing execution structures on handheld devices.',
        whyNow: 'Learn syntax basics before using visual layout components or managing client configurations.',
        whyBeforeNext: 'Building user interfaces requires understanding layout structures, which you learn in the next step.',
        realWorldUsage: 'Writing data logic, mapping inputs, catching script warnings, and parsing file parameters.',
        sources: ['roadmap.sh', 'Kotlin Docs', 'Dart Tutorials'],
        suggestedProjects: [
          'A CLI calculator computing compound rates.',
          'An inventory script sorting item lists based on status codes.'
        ],
        expectedOutcome: 'You can write structured programming scripts using Kotlin or Dart.',
        commonMistakes: [
          'Hardcoding mutable data variables instead of configuring immutable references.',
          'Omitting async-await controls, causing execution locks.'
        ],
        readyToMoveOn: [
          'Can write scripts containing conditional splits, loops, and custom classes.',
          'Understand variable definitions and object properties.',
          'Can compile scripts using CLI compilers.'
        ]
      },
      {
        id: 'm2',
        title: 'UI Frameworks',
        description: 'Learn to build beautiful mobile interfaces.',
        duration: '2 months',
        skills: ['Flutter', 'State Management'],
        resources: [],
        milestones: ['Build a Weather App'],
        order: 2,
        whyExists: 'Mobile users demand responsive interfaces. Frameworks like Flutter and React Native provide the components and gestures to build responsive pages.',
        whyThisStep: 'Mobile UI frameworks compile code into native views, delivering fast UI rendering.',
        whyNow: 'Master interface layouts after programming basics so you can connect interface components to real data.',
        whyBeforeNext: 'A local app interface is static without backend endpoints; APIs are added next.',
        realWorldUsage: 'Drafting responsive layouts, configuring style properties, handling scroll events, and state management.',
        sources: ['roadmap.sh', 'Flutter Docs', 'React Native Guides'],
        suggestedProjects: [
          'A responsive product dashboard displaying lists with filters.',
          'A weather app showcasing scrolling layouts and transition animations.'
        ],
        expectedOutcome: 'You can build styled interfaces, handle scroll events, and manage local state.',
        commonMistakes: [
          'Building static layouts that break when rotated or displayed on different screen sizes.',
          'Overcomplicating state hierarchies, slowing down screen rendering.'
        ],
        readyToMoveOn: [
          'Can build flexible layouts matching screen sizes.',
          'Understand component lifecycles and state parameters.',
          'Can configure custom typography rules.'
        ]
      },
      {
        id: 'm3',
        title: 'Backend Integration',
        description: 'Connect apps to APIs and databases.',
        duration: '2 months',
        skills: ['REST APIs', 'Firebase'],
        resources: [],
        milestones: ['Build a full-stack chat app'],
        order: 3,
        whyExists: 'Handheld applications store data in remote databases. Connecting client apps to APIs and Firebase manages secure user data transport.',
        whyThisStep: 'APIs enable mobile applications to query remote databases and authenticate users.',
        whyNow: 'Learn data integrations once your app interfaces work, so you can display dynamic backend data.',
        whyBeforeNext: 'Completing local storage and data synchronization is required before preparing projects for app store submissions.',
        realWorldUsage: 'Fetching API payloads, authenticating users, managing local databases, and offline data synchronization.',
        sources: ['roadmap.sh', 'Firebase Docs', 'Android Developer Guides'],
        suggestedProjects: [
          'A secure chat application syncing message inputs in real-time.',
          'An offline notebook caching notes to local databases.'
        ],
        expectedOutcome: 'You can connect client apps to APIs, authorize users, and cache records locally.',
        commonMistakes: [
          'Querying APIs on main thread loops, freezing the application.',
          'Failing to handle offline database states, causing app crashes.'
        ],
        readyToMoveOn: [
          'Can query REST API endpoints and parse JSON payloads.',
          'Can configure user logins using Firebase or JWT.',
          'Understand local caching properties.'
        ]
      },
      {
        id: 'm4',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish App to Play Store', 'Publish Portfolio Website'],
        order: 4,
        whyExists: 'Hiring teams evaluate mobile developers through deployed applications. Publishing to app stores confirms you can ship.',
        whyThisStep: 'Publicly hosted apps prove that you can compile packages and resolve app store review guidelines.',
        whyNow: 'Package your projects and practice coding scenarios once your apps work with backend data.',
        whyBeforeNext: 'This represents the final step to enter the mobile development market.',
        realWorldUsage: 'Publishing app packages, documenting repositories, and resolving coding test problems.',
        sources: ['roadmap.sh', 'Google Play Console Guide', 'Apple Review Guidelines'],
        suggestedProjects: [
          'A published app in play stores containing working features and clear descriptions.',
          'A portfolio website containing case studies showing user flows and architecture.'
        ],
        expectedOutcome: 'You possess live app store links, clean code repositories, and can answer mobile optimization questions.',
        commonMistakes: [
          'Publishing apps that crash on older operating system versions.',
          'Submitting code without instructions on how to run builds locally.'
        ],
        readyToMoveOn: [
          'Have at least 1 app published in play stores.',
          'Can explain component rendering, local caching, and offline data rules.',
          'Understand basic Git workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-9',
    title: 'UX Designer',
    slug: 'ux-designer',
    field: 'Design',
    subfield: 'User Experience',
    description: 'Create intuitive, accessible, and delightful digital experiences. UX designers research user needs, prototype solutions, and work closely with engineering teams.',
    shortDescription: 'Design digital products people love to use.',
    avgSalaryIndia: 'Entry: ₹4–7 LPA | Mid: ₹8–15 LPA | Sr: ₹16–25+ LPA',
    avgSalaryGlobal: 'Entry: $50K–$75K | Mid: $80K–$120K | Sr: $130K–$160K+',
    demandTrend: 'rising',
    relatedCareers: ['career-1'],
    tags: ['design', 'user research', 'figma', 'prototyping', 'ui'],
    aliases: ['ui designer', 'product designer', 'ux researcher', 'interaction designer'],
    icon: 'Palette',
    roadmapShUrl: 'https://roadmap.sh/ux-design',
    overview: 'UX design focuses on user journeys. Designers study users, create wireframes, construct interactive prototypes, and collaborate with developers.',
    whatItDoes: 'UX designers conduct user interviews, build low-fidelity layouts, construct figma designs, prototype screen flows, and test layouts.',
    timeToJobReady: '5–8 months',
    skillsRequired: ['Design Thinking', 'User Research', 'Figma', 'Wireframing', 'Prototyping', 'Usability Testing'],
    stages: [
      {
        id: 'ux1',
        title: 'Design Thinking',
        description: 'Learn human-centered design principles.',
        duration: '1 month',
        skills: ['Design Thinking', 'User Research'],
        resources: [],
        milestones: ['Conduct 5 user interviews'],
        order: 1,
        whyExists: 'Designers cannot rely on guesswork. Understanding core cognitive biases, user research workflows, and user persona analysis is critical to map digital behaviors before layout work.',
        whyThisStep: 'Design thinking provides a structured framework to understand user motivations and define real problems.',
        whyNow: 'Learn user research principles before sketching wireframes or configuring design software.',
        whyBeforeNext: 'Structuring layout details requires a clear understanding of user needs and persona objectives.',
        realWorldUsage: 'Conducting user interviews, drafting personas, mapping journey steps, and defining problems.',
        sources: ['roadmap.sh', 'Nielsen Norman Group Articles', 'Interaction Design Foundation'],
        suggestedProjects: [
          'A research brief identifying frustrations in current food delivery applications.',
          'Develop user persona charts representing different buyer profiles.'
        ],
        expectedOutcome: 'You can draft research summaries and identify design objectives based on user needs.',
        commonMistakes: [
          'Skipping user interviews, designing based only on personal preferences.',
          'Defining overly broad user personas that fail to describe specific user behaviors.'
        ],
        readyToMoveOn: [
          'Can write research scripts and run interviews.',
          'Can map user flows and identify navigation frustrations.',
          'Understand human-centered design guidelines.'
        ]
      },
      {
        id: 'ux2',
        title: 'Tools & Wireframing',
        description: 'Master design tools and visual hierarchy.',
        duration: '2 months',
        skills: ['Figma', 'Wireframing'],
        resources: [],
        milestones: ['Build a design system'],
        order: 2,
        whyExists: 'Figma is the industry standard for interface creation. Learning vector layout, auto-layout constructs, typography rules, and color palettes establishes visual design capability.',
        whyThisStep: 'Figma provides the layout tools to turn ideas into structured, vector wireframes.',
        whyNow: 'Master design software after research so you can build layouts matching user goals.',
        whyBeforeNext: 'Testing layouts requires turning static wireframes into interactive prototypes.',
        realWorldUsage: 'Drafting low-fidelity wireframes, building design components, and configuring auto-layout rules in Figma.',
        sources: ['roadmap.sh', 'Figma Help Center', 'Refactoring UI book'],
        suggestedProjects: [
          'A set of wireframes showing key steps in user checkout flows.',
          'A design system component sheet defining buttons, inputs, and typography.'
        ],
        expectedOutcome: 'You can build vector interfaces, manage layout constraints, and design typography scales.',
        commonMistakes: [
          'Hardcoding component sizes in Figma instead of using auto-layout rules.',
          'Ignoring visual hierarchy, resulting in cluttered interfaces.'
        ],
        readyToMoveOn: [
          'Can build components using auto-layout variables in Figma.',
          'Can structure typography scales and design system styles.',
          'Can draft wireframes showing clean visual hierarchies.'
        ]
      },
      {
        id: 'ux3',
        title: 'Prototyping & Testing',
        description: 'Create interactive prototypes and test them.',
        duration: '2 months',
        skills: ['Prototyping', 'Usability Testing'],
        resources: [],
        milestones: ['Run a usability test'],
        order: 3,
        whyExists: 'Static interfaces hide usability defects. High-fidelity dynamic prototypes simulate real flow states, and user testing validates if navigations are intuitive prior to engineering handoff.',
        whyThisStep: 'Interactive prototypes simulate app behaviors, allowing usability testing before coding starts.',
        whyNow: 'Test designs once static mockups work to check navigation logic and catch errors.',
        whyBeforeNext: 'Refining designs based on usability tests is required before publishing case studies.',
        realWorldUsage: 'Linking screen views, configuring transitions, running usability tests, and collecting feedback.',
        sources: ['roadmap.sh', 'Nielsen Usability Testing Guides', 'Figma Prototyping Docs'],
        suggestedProjects: [
          'A clickable high-fidelity prototype simulating application navigation flows.',
          'A usability report detailing failures and iterations after test passes.'
        ],
        expectedOutcome: 'You can configure clickable prototypes, conduct testing passes, and document feedback.',
        commonMistakes: [
          'Guiding test users during usability sessions instead of observing behaviors.',
          'Ignoring usability bugs, keeping layouts that users find confusing.'
        ],
        readyToMoveOn: [
          'Can connect screen flows and transitions in Figma.',
          'Can run usability tests and record user behaviors.',
          'Can write design summaries detailing iterations.'
        ]
      },
      {
        id: 'ux4',
        title: 'Portfolio & Job Readiness',
        description: 'Build a compelling portfolio and prepare for interviews.',
        duration: '1 month',
        skills: ['Case Studies', 'Presentation'],
        resources: [],
        milestones: ['Complete 3 case studies', 'Publish Portfolio Website'],
        order: 4,
        whyExists: 'UX designers are evaluated on narrative problem-solving. Case studies document how research guided design iteration, proving to hiring teams that your design decisions have data backing.',
        whyThisStep: 'Case studies demonstrate that your designs are based on user data, not just aesthetics.',
        whyNow: 'Publish case studies and practice presenting designs once your mockups have passed user testing.',
        whyBeforeNext: 'This represents the final milestone to enter the UX design market.',
        realWorldUsage: 'Writing case studies, presenting portfolios, and explaining design layouts to engineering teams.',
        sources: ['roadmap.sh', 'Cofolios portfolio guides', 'UX Portfolio Formula'],
        suggestedProjects: [
          'A portfolio website containing case studies showing user research, wireframes, and prototypes.',
          'A presentation slide deck outlining your top design projects.'
        ],
        expectedOutcome: 'You possess documented case studies, clean visual portfolios, and can explain design decisions.',
        commonMistakes: [
          'Focusing case studies only on final layouts, omitting the research and testing steps.',
          'Ignoring page responsiveness on portfolio websites.'
        ],
        readyToMoveOn: [
          'Have at least 2 complete case studies published.',
          'Can explain user research, design layout rules, and testing methods.',
          'Can present design solutions to developers.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-10',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    field: 'Technology',
    subfield: 'Information Security',
    description: 'Protect organizations from cyber threats by monitoring systems, investigating breaches, and implementing security measures.',
    shortDescription: 'Defend systems and data from cyber threats.',
    avgSalaryIndia: 'Entry: ₹4–7 LPA | Mid: ₹8–15 LPA | Sr: ₹16–25+ LPA',
    avgSalaryGlobal: 'Entry: $55K–$80K | Mid: $85K–$125K | Sr: $130K–$170K+',
    demandTrend: 'rising',
    relatedCareers: ['career-7'],
    tags: ['security', 'hacking', 'SOC', 'penetration testing', 'cybersecurity'],
    aliases: ['ethical hacker', 'bug bounty hunter', 'penetration tester', 'security engineer', 'infosec', 'soc analyst', 'blockchain engineer'],
    icon: 'Shield',
    roadmapShUrl: 'https://roadmap.sh/cyber-security',
    overview: 'Cybersecurity protects system infrastructures. Analysts monitor data logs, audit networks, scan for vulnerabilities, and resolve security breaches.',
    whatItDoes: 'Cybersecurity analysts monitor system logs, run security scans, inspect port exposures, configure firewalls, and document incident responses.',
    timeToJobReady: '6–9 months',
    skillsRequired: ['Networking', 'Linux', 'Security+', 'Cryptography', 'Penetration Testing', 'SIEM/Monitoring'],
    stages: [
      {
        id: 'cy1',
        title: 'Networking & OS',
        description: 'Learn TCP/IP, Linux, and Windows Internals.',
        duration: '2 months',
        skills: ['Networking', 'Linux'],
        resources: [],
        milestones: ['Set up a secure homelab'],
        order: 1,
        whyExists: 'Security analysts must understand how computers connect and route data. Network protocols and operating systems form the core of security defense.',
        whyThisStep: 'TCP/IP routing, DNS controls, and Linux system files are foundational to understanding network security anomalies.',
        whyNow: 'Learn network and OS basics before implementing security rules or running exploit scripts.',
        whyBeforeNext: 'Understanding secure system architectures is required before inspecting vulnerability configurations.',
        realWorldUsage: 'Checking IP routing tables, managing file access permissions, and auditing ports.',
        sources: ['roadmap.sh', 'Linux Command Line book', 'CompTIA Network+ Guide'],
        suggestedProjects: [
          'Set up a local Linux lab with configured user accounts and firewall rules.',
          'An analysis of network port routing on a local homelab.'
        ],
        expectedOutcome: 'You can navigate Linux directories, check TCP/IP routing, and configure port rules.',
        commonMistakes: [
          'Ignoring standard user permissions, running homelabs under root accounts.',
          'Leaving open network ports, exposing system resources to public connections.'
        ],
        readyToMoveOn: [
          'Can write simple system configuration scripts.',
          'Understand file permissions, user groups, and system services.',
          'Can explain subnet routing.'
        ]
      },
      {
        id: 'cy2',
        title: 'Security Basics',
        description: 'Learn threats and defense mechanisms.',
        duration: '2 months',
        skills: ['Security+', 'Cryptography'],
        resources: [],
        milestones: ['Complete Security+ curriculum'],
        order: 2,
        whyExists: 'Security professionals must understand common attack methods and basic protection rules. Certified knowledge guides industry security layouts.',
        whyThisStep: 'Security certifications define standard cybersecurity terminology and cover data protection rules.',
        whyNow: 'Study threat methodologies after networking basics to understand how systems are attacked.',
        whyBeforeNext: 'Applying exploit tools requires a strong understanding of security vulnerabilities.',
        realWorldUsage: 'Analyzing threat vectors, checking encryption standards, and auditing compliance policies.',
        sources: ['roadmap.sh', 'CompTIA Security+ Manual', 'OWASP Top 10 Guides'],
        suggestedProjects: [
          'Draft a threat profile showing potential vulnerabilities in standard web apps.',
          'Configure folder encryption using public keys and certificates.'
        ],
        expectedOutcome: 'You can identify security threats and configure basic data encryption.',
        commonMistakes: [
          'Assuming security is purely technical, ignoring social engineering risks.',
          'Using outdated encryption methods that are easily bypassed.'
        ],
        readyToMoveOn: [
          'Can explain common web attacks and social engineering risks.',
          'Understand public-key encryption and digital certificate setups.',
          'Can identify security compliance rules.'
        ]
      },
      {
        id: 'cy3',
        title: 'Offensive Security',
        description: 'Understand how attackers think.',
        duration: '2 months',
        skills: ['Penetration Testing', 'Web Security'],
        resources: [],
        milestones: ['Hack 10 TryHackMe boxes'],
        order: 3,
        whyExists: 'Understanding how attackers exploit systems is key to building strong defenses. Testing vulnerabilities helps secure infrastructure.',
        whyThisStep: 'Exploit testing exposes system vulnerabilities, demonstrating how configs fail under attacks.',
        whyNow: 'Practice exploit checks after security basics to understand vulnerability lifecycles.',
        whyBeforeNext: 'Understanding exploits is required to design monitoring rules and detect attacks.',
        realWorldUsage: 'Running port scans, testing web forms for SQL injections, and auditing system configurations.',
        sources: ['roadmap.sh', 'PortSwigger Web Security Academy', 'TryHackMe Courses'],
        suggestedProjects: [
          'Exploit three mock lab configurations and document the methods.',
          'An audit of a staging website checking for OWASP vulnerabilities.'
        ],
        expectedOutcome: 'You can test system configurations for vulnerabilities and identify exploit methods.',
        commonMistakes: [
          'Running automated exploit scans without understanding the underlying vulnerabilities.',
          'Testing security configurations on systems without proper authorization.'
        ],
        readyToMoveOn: [
          'Can explain SQL injections and cross-site scripting vulnerabilities.',
          'Can identify open ports using Nmap scans.',
          'Can document vulnerability exploit paths.'
        ]
      },
      {
        id: 'cy4',
        title: 'Defensive Security',
        description: 'Learn monitoring and incident response.',
        duration: '2 months',
        skills: ['SIEM', 'Incident Response'],
        resources: [],
        milestones: ['Write a mock incident report'],
        order: 4,
        whyExists: 'Security teams must monitor systems in real-time to detect threats. System monitoring and incident response rules minimize damage during security breaches.',
        whyThisStep: 'Log monitoring systems collect events, allowing analysts to track and block security attacks.',
        whyNow: 'Master system monitoring after exploit checks to design detection rules for attacks.',
        whyBeforeNext: 'Publishing security writeups and projects is required to showcase your skills to recruiters.',
        realWorldUsage: 'Analyzing log files, building SIEM dashboards, and documenting security incidents.',
        sources: ['roadmap.sh', 'Splunk User Guides', 'SANS Incident Response Manual'],
        suggestedProjects: [
          'Set up log tracking to monitor auth failures on a local system.',
          'A report detailing response steps for a simulated security incident.'
        ],
        expectedOutcome: 'You can monitor system logs, configure SIEM indicators, and write incident reports.',
        commonMistakes: [
          'Failing to filter log indicators, resulting in many false alarms.',
          'Ignoring post-incident reviews, leaving the initial vulnerability unfixed.'
        ],
        readyToMoveOn: [
          'Can track logs using SIEM query platforms.',
          'Can write incident response guides.',
          'Understand log parsing configurations.'
        ]
      },
      {
        id: 'cy5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish 3 Security Writeups', 'Publish Portfolio Website'],
        order: 5,
        whyExists: 'Security hiring requires proof of analytical skills. Publishing security writeups and portfolios demonstrates your troubleshooting capability.',
        whyThisStep: 'Security writeups demonstrate that you can analyze logs and document vulnerabilities clearly.',
        whyNow: 'Deploy your portfolio site and practice security scenarios once your technical skills are verified.',
        whyBeforeNext: 'This represents the final step to enter the cybersecurity job market.',
        realWorldUsage: 'Explaining security profiles, presenting writeups, and resolving code assessments.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'CISA Guides'],
        suggestedProjects: [
          'A portfolio website containing case studies showing security writeups and system audits.',
          'Three public writeups detailing homelab configurations.'
        ],
        expectedOutcome: 'You possess live portfolio links, clean writeup documents, and can answer security configuration questions.',
        commonMistakes: [
          'Including confidential data in public writeups.',
          'Neglecting network protocol theory, which is frequently tested in interviews.'
        ],
        readyToMoveOn: [
          'Have at least 2 public security writeups published.',
          'Can explain DNS, firewall configurations, and log monitoring methods.',
          'Understand basic collaborative version systems.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-11',
    title: 'QA Tester',
    slug: 'qa-tester',
    field: 'Technology',
    subfield: 'Quality Assurance',
    description: 'Ensure software quality by designing and executing tests. QA Engineers write automated test scripts, find bugs, and work closely with developers.',
    shortDescription: 'Lower technical barrier than most engineering paths.',
    avgSalaryIndia: 'Entry: ₹3–6 LPA | Mid: ₹7–12 LPA | Sr: ₹13–20+ LPA',
    avgSalaryGlobal: 'Entry: $45K–$70K | Mid: $75K–$100K | Sr: $105K–$130K+',
    demandTrend: 'rising',
    relatedCareers: ['career-1'],
    tags: ['testing', 'qa', 'automation', 'selenium', 'cypress', 'jest'],
    aliases: ['software tester', 'automation tester', 'manual tester', 'sdet', 'qa engineer', 'test engineer'],
    icon: 'Shield',
    roadmapShUrl: 'https://roadmap.sh/qa',
    overview: 'Quality Assurance verifies application stability. Engineers define test scripts, execute integration tests, and check interface parameters to block bug releases.',
    whatItDoes: 'QA testers write test plans, execute functional scripts, run browser test tools (Cypress), track REST APIs, and document bugs.',
    timeToJobReady: '4–6 months',
    skillsRequired: ['Manual Testing', 'Jira', 'JavaScript/Python', 'Cypress', 'Playwright', 'Postman'],
    stages: [
      {
        id: 'qa1',
        title: 'Manual Testing Basics',
        description: 'Learn testing theory and bug reporting.',
        duration: '1 month',
        skills: ['Manual Testing', 'Jira'],
        resources: [],
        milestones: ['Write a test plan for a site'],
        order: 1,
        whyExists: 'Before automating tests, you must understand how to check software manually. Writing test plans, designing test cases, and tracking bugs ensures comprehensive verification.',
        whyThisStep: 'Manual testing covers software lifecycle concepts and teaches developers to write clear bug tickets.',
        whyNow: 'Master manual verification before writing automation scripts so you can design effective tests.',
        whyBeforeNext: 'Automating tests requires programming skills; scripting basics must be learned next.',
        realWorldUsage: 'Writing test checklists, executing screen checks, tracking bugs in Jira, and verifying fixes.',
        sources: ['roadmap.sh', 'ISTQB syllabus', 'Jira Guides'],
        suggestedProjects: [
          'A test case document mapping validation rules for a checkout form.',
          'Structured bug reports with step-by-step reproduction instructions.'
        ],
        expectedOutcome: 'You can design test checklists and write structured bug reports.',
        commonMistakes: [
          'Writing vague bug descriptions that omit system environment details.',
          'Testing without structured plans, skipping edge cases.'
        ],
        readyToMoveOn: [
          'Can write test cases containing prerequisites and expected behaviors.',
          'Can navigate Jira boards and log bug details.',
          'Can differentiate between integration and system testing.'
        ]
      },
      {
        id: 'qa2',
        title: 'Programming for QA',
        description: 'Learn JavaScript or Python for automation.',
        duration: '2 months',
        skills: ['JavaScript', 'Python'],
        resources: [],
        milestones: ['Build basic scripts'],
        order: 2,
        whyExists: 'Modern QA relies on automated test suites. Scripting capability in JavaScript or Python allows you to write test behaviors and mock backend data.',
        whyThisStep: 'Programming foundations allow QA engineers to run command-line test suites and write assertions.',
        whyNow: 'Learn programming after manual testing to prepare for test automation tools.',
        whyBeforeNext: 'Automating browser tests requires using frameworks that depend on programming syntax.',
        realWorldUsage: 'Writing script loops, checking variables, and parsing JSON payloads.',
        sources: ['roadmap.sh', 'MDN Javascript Tutorial', 'Python Programming Docs'],
        suggestedProjects: [
          'A script sorting test data inputs from CSV tables.',
          'An assertion function checking API responses.'
        ],
        expectedOutcome: 'You can write scripts to verify data structures and parse variables.',
        commonMistakes: [
          'Writing monolithic code without reusable functions.',
          'Failing to handle async calls, causing test script failures.'
        ],
        readyToMoveOn: [
          'Can declare variables, lists, and functions.',
          'Understand asynchronous operations.',
          'Can run scripts from terminal commands.'
        ]
      },
      {
        id: 'qa3',
        title: 'UI & API Automation',
        description: 'Write automated tests.',
        duration: '2 months',
        skills: ['Cypress', 'Selenium', 'Postman'],
        resources: [],
        milestones: ['Automate an API test suite'],
        order: 3,
        whyExists: 'Manual regression checks are too slow for fast releases. Automated browser actions and API checks verify system features in seconds.',
        whyThisStep: 'Cypress and Postman automate browser clicks and verify API statuses.',
        whyNow: 'Master automation tools after coding basics so you can write custom test assertions.',
        whyBeforeNext: 'Publishing test frameworks is required to build a portfolio for job reviews.',
        realWorldUsage: 'Writing test selectors, running test suites, mocking server calls, and verifying API response data.',
        sources: ['roadmap.sh', 'Cypress Docs', 'Postman Tutorials'],
        suggestedProjects: [
          'An automated test suite running user login validations in Cypress.',
          'Postman test collections verifying endpoint schemas and status codes.'
        ],
        expectedOutcome: 'You can automate browser interactions and write API check assertions.',
        commonMistakes: [
          'Using unstable CSS selectors that break during minor page layout changes.',
          'Not resetting database states before running automated test suites.'
        ],
        readyToMoveOn: [
          'Can write Cypress tests verifying page navigation.',
          'Can configure Postman test assertions.',
          'Can mock API responses.'
        ]
      },
      {
        id: 'qa4',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish a GitHub QA Framework', 'Publish Portfolio Website'],
        order: 4,
        whyExists: 'Hiring teams check coding skills in QA candidates. A repository containing documented test setups proves you can build automation pipelines.',
        whyThisStep: 'Publicly hosted test suites demonstrate that you can deploy and run test automation in CI/CD.',
        whyNow: 'Organize your repositories and practice testing scenarios once your test suites are working.',
        whyBeforeNext: 'This represents the final step to enter the QA engineering market.',
        realWorldUsage: 'Explaining test strategies, presenting code repositories, and resolving coding test problems.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'Software Testing Guides'],
        suggestedProjects: [
          'A GitHub repository containing Cypress test suites with clear deployment instructions.',
          'A portfolio site displaying testing case studies and bug reports.'
        ],
        expectedOutcome: 'You possess documented test repositories, clear test plans, and can answer testing strategy questions.',
        commonMistakes: [
          'Submitting test code without instructions on how to configure dependencies.',
          'Ignoring basic API theory, focusing only on UI clicks during interviews.'
        ],
        readyToMoveOn: [
          'Have at least 2 automated test projects documented on GitHub.',
          'Can explain testing levels, browser selectors, and API validation methods.',
          'Understand git version controls.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-12',
    title: 'Data Analyst',
    slug: 'data-analyst',
    field: 'Data Science',
    subfield: 'Analytics & Reporting',
    description: 'Transform raw data into actionable business insights. Data Analysts work heavily with Excel, SQL, and visualization tools like Power BI or Tableau to help businesses make decisions.',
    shortDescription: 'Turn numbers into business decisions.',
    avgSalaryIndia: 'Entry: ₹3–6 LPA | Mid: ₹7–10 LPA | Sr: ₹11–15+ LPA',
    avgSalaryGlobal: 'Entry: $45K–$65K | Mid: $70K–$85K | Sr: $90K–$105K+',
    demandTrend: 'rising',
    relatedCareers: ['career-5'],
    tags: ['data', 'analytics', 'sql', 'excel', 'tableau', 'power bi'],
    aliases: ['business analyst', 'bi analyst', 'reporting analyst', 'data visualizer'],
    icon: 'BarChart3',
    roadmapShUrl: 'https://roadmap.sh/data-analyst',
    overview: 'Data analysis drives business decisions. Analysts clean transactional datasets, write database queries, configure dashboards, and present summaries to business leads.',
    whatItDoes: 'Data analysts use Excel pivot tables, write SQL database joins, configure Power BI dashboards, and draft business slide decks.',
    timeToJobReady: '4–6 months',
    skillsRequired: ['Excel', 'SQL', 'Tableau/Power BI', 'Data Cleaning', 'Data Presentation'],
    stages: [
      {
        id: 'da1',
        title: 'Spreadsheets & Fundamentals',
        description: 'Master Excel/Google Sheets for data manipulation.',
        duration: '1 month',
        skills: ['Excel', 'Pivot Tables'],
        resources: [],
        milestones: ['Build a sales dashboard in Excel'],
        order: 1,
        whyExists: 'Excel is the most common tool for business analysis. Master pivot tables, formulas, and charts before using database queries.',
        whyThisStep: 'Excel formulas allow analysts to clean tables and calculate summaries quickly.',
        whyNow: 'Learn spreadsheet formulas first to understand data aggregation and layout concepts.',
        whyBeforeNext: 'Large datasets exceed Excel capacity; databases and SQL must be learned next.',
        realWorldUsage: 'Writing lookup formulas, configuring pivot tables, sorting metrics, and charting trends.',
        sources: ['roadmap.sh', 'Microsoft Excel Training', 'Chandoo Excel Guides'],
        suggestedProjects: [
          'A spreadsheet dashboard analyzing monthly transactions and profit margins.',
          'Clean a customer contacts sheet, resolving duplicates and formatting issues.'
        ],
        expectedOutcome: 'You can write formulas, aggregate data using pivot tables, and build charts.',
        commonMistakes: [
          'Hardcoding calculations instead of using formulas, breaking sheets on updates.',
          'Using confusing chart styles that fail to highlight key metrics.'
        ],
        readyToMoveOn: [
          'Can use VLOOKUP/XLOOKUP and nested IF formulas.',
          'Can build pivot tables and custom charts.',
          'Can export cleaned data files.'
        ]
      },
      {
        id: 'da2',
        title: 'SQL for Analysis',
        description: 'Learn to query relational databases.',
        duration: '2 months',
        skills: ['SQL', 'PostgreSQL'],
        resources: [],
        milestones: ['Write complex JOIN and aggregate queries'],
        order: 2,
        whyExists: 'Business data resides in databases. SQL queries extract and filter tables, helping analysts process millions of transactions.',
        whyThisStep: 'SQL is the standard language to query databases and aggregate data columns.',
        whyNow: 'Master database queries after Excel to process large datasets.',
        whyBeforeNext: 'Building dashboards requires linking database queries to visualization tools.',
        realWorldUsage: 'Writing join queries, grouping rows, calculating averages, and filtering records.',
        sources: ['roadmap.sh', 'SQLbolt Tutorials', 'PostgreSQL Guides'],
        suggestedProjects: [
          'Query a sales database to calculate revenue trends across regions.',
          'Write joins combining customer details and order history tables.'
        ],
        expectedOutcome: 'You can write SQL queries containing joins and aggregates to extract clean datasets.',
        commonMistakes: [
          'Writing database queries without WHERE constraints, slowing down servers.',
          'Misinterpreting join behaviors, duplicating transaction records.'
        ],
        readyToMoveOn: [
          'Can write SQL queries with inner/outer joins.',
          'Can calculate totals using GROUP BY and aggregate functions.',
          'Can filter records using HAVING clauses.'
        ]
      },
      {
        id: 'da3',
        title: 'Data Visualization',
        description: 'Build interactive dashboards.',
        duration: '1 month',
        skills: ['Tableau', 'Power BI'],
        resources: [],
        milestones: ['Publish a public Tableau dashboard'],
        order: 3,
        whyExists: 'Tables of numbers are hard for managers to interpret. Interactive charts and dashboards highlight trends and insights instantly.',
        whyThisStep: 'BI tools like Power BI and Tableau connect queries to dynamic dashboards, creating interactive charts.',
        whyNow: 'Build dashboards once you can query databases, so you can display database records visually.',
        whyBeforeNext: 'Publishing data case studies is required to build a portfolio for job reviews.',
        realWorldUsage: 'Connecting database sources, configuring dashboard layouts, creating maps, and publishing charts.',
        sources: ['roadmap.sh', 'Tableau Training Center', 'Power BI Learning Guides'],
        suggestedProjects: [
          'An interactive Tableau dashboard tracking sales performance across product lines.',
          'A dashboard displaying key website traffic metrics.'
        ],
        expectedOutcome: 'You can connect data sources, configure dashboard interfaces, and build clean charts.',
        commonMistakes: [
          'Cluttering dashboards with too many charts, confusing the audience.',
          'Using colors that fail accessibility standards.'
        ],
        readyToMoveOn: [
          'Can connect data sources to visualization tools.',
          'Can build interactive filters and maps.',
          'Can publish dashboards to sharing platforms.'
        ]
      },
      {
        id: 'da4',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish 3 GitHub Data Projects', 'Publish Portfolio Website'],
        order: 4,
        whyExists: 'Hiring teams evaluate analysts on data presentation. A portfolio containing case studies and dashboards validates your business communication skills.',
        whyThisStep: 'Data portfolios demonstrate that you can extract insights and present recommendations to stakeholders.',
        whyNow: 'Publish your case studies and practice dashboard presentations once your projects are ready.',
        whyBeforeNext: 'This represents the final milestone to enter the data analyst market.',
        realWorldUsage: 'Explaining database queries, presenting dashboards, and writing executive summaries.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'Kaggle Analytics Guides'],
        suggestedProjects: [
          'A portfolio website containing case studies showing database queries and dashboard links.',
          'A presentation deck detailing business recommendations from a dataset.'
        ],
        expectedOutcome: 'You possess documented database queries, dashboard links, and can explain data insights.',
        commonMistakes: [
          'Focusing only on tools, omitting business recommendations in case studies.',
          'Sharing code without describing the database schemas.'
        ],
        readyToMoveOn: [
          'Have at least 2 complete data analysis projects published.',
          'Can explain SQL queries, join types, and dashboard layouts.',
          'Understand basic Git workflows.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-13',
    title: 'Game Developer',
    slug: 'game-developer',
    field: 'Technology',
    subfield: 'Game Development',
    description: 'Design and build interactive games for PC, console, or mobile. Game developers use engines like Unity or Unreal and languages like C# and C++.',
    shortDescription: 'Create interactive digital worlds and experiences.',
    avgSalaryIndia: 'Entry: ₹4–7 LPA | Mid: ₹8–13 LPA | Sr: ₹14–20+ LPA',
    avgSalaryGlobal: 'Entry: $45K–$70K | Mid: $75K–$100K | Sr: $105K–$130K+',
    demandTrend: 'stable',
    relatedCareers: ['career-2'],
    tags: ['game dev', 'unity', 'unreal', 'c#', 'c++', '3d'],
    aliases: ['unity developer', 'unreal developer', 'game programmer', 'gameplay engineer'],
    icon: 'Gamepad2',
    roadmapShUrl: 'https://roadmap.sh/game-developer',
    overview: 'Game development produces interactive games. Engineers script game physics, configure graphic assets, design game loops, and compile builds.',
    whatItDoes: 'Game developers write gameplay code in C#, program player actions in Unity, configure physics colliders, set up graphic assets, and package game builds.',
    timeToJobReady: '7–10 months',
    skillsRequired: ['C#/C++', 'Unity/Unreal Engine', 'Gameplay Physics', '3D Mathematics', 'Game Loop Design', 'Asset Pipelines'],
    stages: [
      {
        id: 'gd1',
        title: 'Programming Fundamentals',
        description: 'Learn C# or C++ logic and OOP.',
        duration: '2 months',
        skills: ['C#', 'C++'],
        resources: [],
        milestones: ['Build a text-based adventure game'],
        order: 1,
        whyExists: 'Game engines rely on strictly-typed languages. Mastering C# or C++ teaches variables, classes, inheritance, and object lifecycles before using engine tools.',
        whyThisStep: 'C# and C++ languages compile quickly, managing memory for complex physics and graphic loops.',
        whyNow: 'Learn programming fundamentals before using game interfaces or writing gameplay scripts.',
        whyBeforeNext: 'Game engines coordinate game objects using these programming classes.',
        realWorldUsage: 'Writing character variables, script logic, inheritance classes, and memory allocations.',
        sources: ['roadmap.sh', 'Microsoft C# Docs', 'Learn C++ Guides'],
        suggestedProjects: [
          'A text-based adventure game running in console environments.',
          'An inventory manager class sorting items using collections.'
        ],
        expectedOutcome: 'You can write object-oriented scripts, manage collections, and use inheritance properties.',
        commonMistakes: [
          'Ignoring memory management, creating variables that leak references.',
          'Omitting encapsulation, writing code that is hard to debug.'
        ],
        readyToMoveOn: [
          'Can write classes and inheritance structures.',
          'Understand memory references.',
          'Can compile scripts using IDE environments.'
        ]
      },
      {
        id: 'gd2',
        title: 'Game Engines',
        description: 'Master Unity or Unreal Engine.',
        duration: '2 months',
        skills: ['Unity', 'Unreal'],
        resources: [],
        milestones: ['Build a basic 2D platformer'],
        order: 2,
        whyExists: 'Game engines manage asset libraries, graphic rendering, and physics calculations. Master Unity or Unreal to coordinate game objects.',
        whyThisStep: 'Unity and Unreal engines compile assets and script libraries into playable games.',
        whyNow: 'Master engine interfaces after programming basics to connect scripts to game objects.',
        whyBeforeNext: 'Advanced games require implementing custom physics and vector math; engines must be mastered first.',
        realWorldUsage: 'Configuring game objects, organizing assets, managing scenes, and scripting updates.',
        sources: ['roadmap.sh', 'Unity Learn platform', 'Unreal Engine Tutorials'],
        suggestedProjects: [
          'A basic 2D platformer game with player movements and collision triggers.',
          'An interface menu system navigating between game levels.'
        ],
        expectedOutcome: 'You can navigate engine interfaces, configure object physics, and coordinate scenes.',
        commonMistakes: [
          'Writing calculations inside frame updates instead of using delta time properties.',
          'Organizing assets poorly, bloating project directories.'
        ],
        readyToMoveOn: [
          'Can configure colliders and rigidbodies.',
          'Can connect C# scripts to engine objects.',
          'Understand game scene management.'
        ]
      },
      {
        id: 'gd3',
        title: 'Advanced Mechanics',
        description: 'Learn physics, AI, and graphics.',
        duration: '2 months',
        skills: ['Game Physics', '3D Math'],
        resources: [],
        milestones: ['Build a 3D FPS prototype'],
        order: 3,
        whyExists: 'Realistic games require physics updates and vector math. Linear algebra, vector calculations, and force physics design realistic interactions.',
        whyThisStep: 'Vector math calculates directions, distances, and angles between game objects.',
        whyNow: 'Learn physics and math once you can build simple games to design complex gameplay interactions.',
        whyBeforeNext: 'Your game prototypes must be compiled and hosted on share platforms before job applications.',
        realWorldUsage: 'Calculating vector paths, configuring pathfinding AI, scripting forces, and managing graphic effects.',
        sources: ['roadmap.sh', 'Vector Math for Games', 'Unity Physics Documentation'],
        suggestedProjects: [
          'A 3D FPS prototype featuring pathfinding enemies and force physics.',
          'A physics-based puzzle sandbox with custom forces.'
        ],
        expectedOutcome: 'You can use vector calculations, script forces, and configure pathfinding routes.',
        commonMistakes: [
          'Writing complex calculations on main threads, slowing down frame rates.',
          'Omitting collision checks, allowing objects to pass through walls.'
        ],
        readyToMoveOn: [
          'Can use vector dot products to calculate angles.',
          'Can configure pathfinding AI routes.',
          'Can script force interactions on objects.'
        ]
      },
      {
        id: 'gd4',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish Game to Itch.io', 'Publish Portfolio Website'],
        order: 4,
        whyExists: 'Game studios evaluate programmers on playable prototypes. Compiling game builds and hosting them proves you can finish a project.',
        whyThisStep: 'Published games show that you can package assets, write game loops, and resolve launch bugs.',
        whyNow: 'Host your prototypes and study interview topics once your game builds are playable.',
        whyBeforeNext: 'This represents the final milestone to enter the game development market.',
        realWorldUsage: 'Publishing game builds, documenting repositories, showing code architecture, and resolving math tests.',
        sources: ['roadmap.sh', 'Itch.io Publishing Guide', 'GDC Vault presentations'],
        suggestedProjects: [
          'A published game on Itch.io with working mechanics and clean assets.',
          'A portfolio website outlining your game projects and technical challenges.'
        ],
        expectedOutcome: 'You possess live game links, documented source repositories, and can explain vector math.',
        commonMistakes: [
          'Submitting games with buggy builds that fail on standard computers.',
          'Neglecting memory profiling, resulting in slow frame rates.'
        ],
        readyToMoveOn: [
          'Have at least 1 game published on Itch.io.',
          'Can explain vector math, physics loops, and memory configurations.',
          'Understand git version controls.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-14',
    title: 'Technical Writer',
    slug: 'technical-writer',
    field: 'Technology',
    subfield: 'Documentation',
    description: 'Translate complex technical concepts into clear, user-friendly documentation. Technical writers create API docs, tutorials, and manuals for developers and users.',
    shortDescription: 'Write the documentation that developers rely on.',
    avgSalaryIndia: 'Entry: ₹3–6 LPA | Mid: ₹7–11 LPA | Sr: ₹12–18+ LPA',
    avgSalaryGlobal: 'Entry: $45K–$65K | Mid: $70K–$90K | Sr: $95K–$115K+',
    demandTrend: 'stable',
    relatedCareers: ['career-1'],
    tags: ['writing', 'documentation', 'markdown', 'api docs', 'communication'],
    aliases: ['developer advocate', 'documentation engineer', 'tech writer'],
    icon: 'BookOpen',
    roadmapShUrl: 'https://roadmap.sh/technical-writer',
    overview: 'Technical writing bridges engineering details and user execution. Writers research APIs, test setup guides, configure doc sites, and edit style guides.',
    whatItDoes: 'Technical writers draft markdown pages, compile Docusaurus sites, document API endpoints, interview developer leads, and edit code samples.',
    timeToJobReady: '4–6 months',
    skillsRequired: ['Grammar', 'Markdown', 'Git', 'APIs', 'HTML/CSS', 'Docusaurus/Sphinx'],
    stages: [
      {
        id: 'tw1',
        title: 'Writing Fundamentals',
        description: 'Learn clear technical communication.',
        duration: '1 month',
        skills: ['Grammar', 'Markdown'],
        resources: [],
        milestones: ['Write a tutorial for a basic app'],
        order: 1,
        whyExists: 'Technical writers must communicate complex details clearly. Master plain layouts, markdown formatting, and style rules before using documentation tools.',
        whyThisStep: 'Markdown formatting is the standard for code documentation, structuring headers and links cleanly.',
        whyNow: 'Learn plain writing rules and markdown formatting before using static site builders.',
        whyBeforeNext: 'Documenting code repos requires using version control tools like Git.',
        realWorldUsage: 'Writing README files, formatting guides, editing draft pages, and structuring headers.',
        sources: ['roadmap.sh', 'Google Technical Writing Course 1', 'Microsoft Writing Style Guide'],
        suggestedProjects: [
          'A README file explaining setup instructions for a static application.',
          'A markdown tutorial explaining how to build a basic form page.'
        ],
        expectedOutcome: 'You can write clear setup guides and format markdown elements.',
        commonMistakes: [
          'Writing long paragraphs instead of using scannable lists.',
          'Omitting formatting rules, creating confusing code blocks.'
        ],
        readyToMoveOn: [
          'Can write clear, passive-voice free descriptions.',
          'Can write formatted markdown files.',
          'Understand style guide parameters.'
        ]
      },
      {
        id: 'tw2',
        title: 'Technical Context',
        description: 'Understand APIs, Git, and web basics.',
        duration: '2 months',
        skills: ['Git', 'APIs', 'HTML/CSS'],
        resources: [],
        milestones: ['Document a public REST API'],
        order: 2,
        whyExists: 'Writers document software code. Understanding web basics, Git workflows, and API endpoints enables you to write documentation that developers trust.',
        whyThisStep: 'Git version control allows writers to submit documentation updates directly inside developer repositories.',
        whyNow: 'Learn technical context after writing basics to document real code elements.',
        whyBeforeNext: 'Hosting documentation portal pages requires deploying static site generator tools.',
        realWorldUsage: 'Writing API summaries, formatting request JSON payloads, creating Git branches, and editing HTML attributes.',
        sources: ['roadmap.sh', 'MDN Web Basics', 'Pro Git book'],
        suggestedProjects: [
          'An API guide detailing endpoint requests and response JSON examples.',
          'A Git branch update merging edits to documentation pages.'
        ],
        expectedOutcome: 'You can explain REST endpoints, format JSON structures, and use Git commands.',
        commonMistakes: [
          'Documenting endpoints without testing the request variables, causing error messages.',
          'Failing to describe API authentication requirements in guides.'
        ],
        readyToMoveOn: [
          'Can use Git commands to commit and push markdown files.',
          'Can write API requests showing header parameters.',
          'Understand HTML tag hierarchies.'
        ]
      },
      {
        id: 'tw3',
        title: 'Doc Tools',
        description: 'Learn static site generators and doc frameworks.',
        duration: '1 month',
        skills: ['Docusaurus', 'Sphinx'],
        resources: [],
        milestones: ['Deploy a documentation site'],
        order: 3,
        whyExists: 'Corporate documentation portals use custom frameworks. static site builders compile markdown files into structured, hosted web portals.',
        whyThisStep: 'Docusaurus compiles markdown into styled, searchable documentation sites.',
        whyNow: 'Learn documentation engines after Git basics so you can manage files systematically.',
        whyBeforeNext: 'Hosted site portals are required to build a portfolio of writing samples.',
        realWorldUsage: 'Deploying Docusaurus portals, configuring search, updating site menus, and managing links.',
        sources: ['roadmap.sh', 'Docusaurus Docs', 'Read the Docs Guides'],
        suggestedProjects: [
          'A hosted Docusaurus documentation portal containing pages for an app guide.',
          'A searchable documentation outline configured with static pages.'
        ],
        expectedOutcome: 'You can deploy documentation portal pages from markdown directories.',
        commonMistakes: [
          'Creating broken site navigation links in documentation directories.',
          'Omitting search bars, forcing users to click through many pages.'
        ],
        readyToMoveOn: [
          'Can configure site navigation files.',
          'Can deploy static pages using hosting engines.',
          'Understand search configuration rules.'
        ]
      },
      {
        id: 'tw4',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare for applications and interviews.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Publish 3 Writing Samples', 'Publish Portfolio Website'],
        order: 4,
        whyExists: 'Hiring managers review writers on clarity and structure. A hosted portfolio website showing writing samples validates your communication capability.',
        whyThisStep: 'Publicly hosted writing samples demonstrate that you can structure and explain complex systems.',
        whyNow: 'Deploy your portfolio site and practice writing assessments once your static docs are hosted.',
        whyBeforeNext: 'This represents the final milestone to enter the technical writing market.',
        realWorldUsage: 'Explaining API structures, presenting writing samples, and resolving editing tests.',
        sources: ['roadmap.sh', 'Tech Interview Handbook', 'Write the Docs job board guides'],
        suggestedProjects: [
          'A portfolio site containing case studies showing documentation portals and API guides.',
          'A presentation deck detailing edits made to an open-source project README.'
        ],
        expectedOutcome: 'You possess live documentation portal links, clear writing samples, and can answer documentation structure questions.',
        commonMistakes: [
          'Sharing writing samples that omit the context of the target audience.',
          'Neglecting basic API terminology during interview discussions.'
        ],
        readyToMoveOn: [
          'Have at least 2 complete writing portals published.',
          'Can explain API documentation, markdown formatting, and style manuals.',
          'Understand basic collaborative version systems.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  },
  {
    id: 'career-15',
    title: 'Cloud Engineer',
    slug: 'cloud-engineer',
    field: 'Technology',
    subfield: 'Cloud Architecture',
    description: 'Design, deploy, and manage scalable and highly available applications in cloud environments like AWS, Azure, or GCP.',
    shortDescription: 'Build and manage cloud-based application infrastructures.',
    avgSalaryIndia: 'Entry: ₹5–8 LPA | Mid: ₹9–17 LPA | Sr: ₹18–32+ LPA',
    avgSalaryGlobal: 'Entry: $65K–$90K | Mid: $95K–$130K | Sr: $140K–$180K+',
    demandTrend: 'rising',
    relatedCareers: ['career-7'],
    tags: ['cloud', 'aws', 'devops', 'azure', 'gcp', 'terraform', 'linux'],
    aliases: ['cloud architect', 'aws engineer', 'azure engineer', 'gcp engineer', 'cloud administrator'],
    icon: 'Cloud',
    roadmapShUrl: 'https://roadmap.sh/cloud-engineer',
    overview: 'Cloud engineering designs virtual resources. Experts configure network subnets, deploy database nodes, write infrastructure scripts, and optimize resource costs.',
    whatItDoes: 'Cloud engineers partition subnets, deploy cloud instances, write Terraform templates, coordinate container clusters, and audit resource costs.',
    timeToJobReady: '7–9 months',
    skillsRequired: ['Linux', 'AWS/Azure', 'Terraform', 'Docker', 'Kubernetes', 'Cloud Security'],
    stages: [
      {
        id: 'cl1',
        title: 'Linux & Core Networking',
        description: 'Master operating systems and network communications.',
        duration: '2 months',
        skills: ['Linux', 'Bash', 'TCP/IP', 'DNS'],
        resources: [],
        milestones: ['Configure a secure virtual private cloud'],
        order: 1,
        whyExists: 'Cloud instances run on Linux servers. Understanding Linux systems, DNS routing, and subnets is key to configuring network gates.',
        whyThisStep: 'Linux commands and TCP/IP routing form the basis of server configuration and network segregation.',
        whyNow: 'Learn network and OS basics before provisioning virtual instances or writing deployment scripts.',
        whyBeforeNext: 'Configuring cloud instances requires understanding port bindings and subnets first.',
        realWorldUsage: 'Checking port mappings, writing setup scripts, configuring routing tables, and editing files.',
        sources: ['roadmap.sh', 'Linux Command Line manual', 'CompTIA Network+ Guide'],
        suggestedProjects: [
          'Configure a local Linux instance with restricted user permissions and custom firewalls.',
          'An analysis of subnets on a local staging network.'
        ],
        expectedOutcome: 'You can navigate Linux files, write setup scripts, and troubleshoot network routing.',
        commonMistakes: [
          'Running setup actions as root, bypassing system safety parameters.',
          'Ignoring port configurations, exposing local databases to the public.'
        ],
        readyToMoveOn: [
          'Can write simple system setup scripts.',
          'Understand file permissions, user groups, and ports.',
          'Can explain subnet divisions.'
        ]
      },
      {
        id: 'cl2',
        title: 'Cloud Platform Basics (AWS/Azure)',
        description: 'Learn major compute, storage, and networking services.',
        duration: '2 months',
        skills: ['AWS', 'EC2', 'S3', 'IAM'],
        resources: [],
        milestones: ['Deploy a high-availability web stack'],
        order: 2,
        whyExists: 'Cloud providers supply the virtual compute nodes and databases. Master AWS services to provision servers and configure user permissions.',
        whyThisStep: 'Cloud provider services (compute, storage, IAM) run web applications.',
        whyNow: 'Master cloud console interfaces after networking basics to connect virtual subnets.',
        whyBeforeNext: 'Managing multiple cloud instances requires declaring configurations in files.',
        realWorldUsage: 'Provisioning EC2 servers, configuring IAM access permissions, setting up S3 buckets, and checking resource billing.',
        sources: ['roadmap.sh', 'AWS Practitioner Course', 'Azure Fundamentals Manual'],
        suggestedProjects: [
          'Deploy a web server stack with load balancers and secure S3 storage buckets.',
          'An IAM layout showing role permissions for different development teams.'
        ],
        expectedOutcome: 'You can provision cloud compute instances, configure storage buckets, and manage user access.',
        commonMistakes: [
          'Exposing root account API keys in public code repositories.',
          'Leaving sandbox instances running, resulting in unexpected cloud invoices.'
        ],
        readyToMoveOn: [
          'Can launch virtual instances with custom network access rules.',
          'Can configure storage bucket policies.',
          'Understand IAM user permissions.'
        ]
      },
      {
        id: 'cl3',
        title: 'Infrastructure as Code (IaC)',
        description: 'Define infrastructure using code.',
        duration: '2 months',
        skills: ['Terraform', 'CloudFormation'],
        resources: [],
        milestones: ['Provision AWS resources using Terraform'],
        order: 3,
        whyExists: 'Manually setting up cloud instances leads to config errors. Describing infrastructure in configuration files allows teams to review and duplicate networks.',
        whyThisStep: 'Terraform automates infrastructure setups using declarative configurations.',
        whyNow: 'Master infrastructure code after provider basics to automate resource provisioning.',
        whyBeforeNext: 'Deploying container clusters requires automation templates.',
        realWorldUsage: 'Writing Terraform configurations, managing state files, configuring variables, and provisioning resource groups.',
        sources: ['roadmap.sh', 'Terraform Documentation', 'HashiCorp Tutorials'],
        suggestedProjects: [
          'Write Terraform configurations to provision a secure VPC network.',
          'Automated setup deploying an EC2 instance and PostgreSQL database.'
        ],
        expectedOutcome: 'You can write Terraform configurations to provision secure networks and virtual nodes.',
        commonMistakes: [
          'Ignoring state file locking in Terraform, causing resource config errors.',
          'Hardcoding region and credential parameters in configuration templates.'
        ],
        readyToMoveOn: [
          'Can configure Terraform providers and modules.',
          'Can run Terraform plan and apply loops.',
          'Understand state configuration.'
        ]
      },
      {
        id: 'cl4',
        title: 'Containers & Kubernetes',
        description: 'Learn microservices packaging and orchestration.',
        duration: '2 months',
        skills: ['Docker', 'Kubernetes'],
        resources: [],
        milestones: ['Deploy a containerized app to Kubernetes'],
        order: 4,
        whyExists: 'Microservices require isolated runtimes and automated scaling. Master containers and Kubernetes to run applications reliably across server clusters.',
        whyThisStep: 'Docker containerizes app configurations, and Kubernetes orchestrates deployment scaling.',
        whyNow: 'Master container scaling once you can provision automated infrastructure.',
        whyBeforeNext: 'Completing portfolio projects and preparing for cloud certifications is the final step for job reviews.',
        realWorldUsage: 'Writing container images, deploying configurations to clusters, and managing load balancers.',
        sources: ['roadmap.sh', 'Docker Documentation', 'Kubernetes Tutorials'],
        suggestedProjects: [
          'Deploy a container service across a Kubernetes cluster with load balancers.',
          'Configure a multi-stage Docker build for a web application.'
        ],
        expectedOutcome: 'You can package applications into container images and deploy them to cluster nodes.',
        commonMistakes: [
          'Configuring Kubernetes containers without resource limits, causing cluster bottlenecks.',
          'Hardcoding secrets in container build definitions.'
        ],
        readyToMoveOn: [
          'Can compile Docker container images.',
          'Can deploy container configurations to Kubernetes.',
          'Understand ingress routing rules.'
        ]
      },
      {
        id: 'cl5',
        title: 'Portfolio & Job Readiness',
        description: 'Prepare cloud certifications and portfolios.',
        duration: '1 month',
        skills: ['Resume Writing', 'Interview Prep'],
        resources: [],
        milestones: ['Complete AWS Solutions Architect Certificate prep', 'Publish Cloud Portfolio Website'],
        order: 5,
        whyExists: 'Cloud hiring requires certified skill verification. Preparing for cloud certifications and portfolios confirms your expertise.',
        whyThisStep: 'Cloud certifications validate your knowledge of provider services and secure architecture patterns.',
        whyNow: 'Host your cloud configurations and study interview topics once your project pipelines work.',
        whyBeforeNext: 'This represents the final step to enter the cloud engineering market.',
        realWorldUsage: 'Designing architecture flowcharts, explaining security profiles, and solving network questions.',
        sources: ['roadmap.sh', 'AWS Solutions Architect Exam Guide', 'Tech Interview Handbook'],
        suggestedProjects: [
          'A portfolio site displaying cloud architecture layouts and automated setups.',
          'A GitHub repository containing documented Terraform templates.'
        ],
        expectedOutcome: 'You possess documented infrastructure code, visual architecture setups, and can answer security questions.',
        commonMistakes: [
          'Sharing templates without documentation detailing the required IAM roles.',
          'Neglecting basic routing protocol theory during interview discussions.'
        ],
        readyToMoveOn: [
          'Have at least 2 infrastructure code projects published.',
          'Can explain DNS, subnet divisions, and load balancing rules.',
          'Understand git version controls.'
        ]
      }
    ],
    recommendedResourceIds: [],
    recommendedJobs: []
  }
];
