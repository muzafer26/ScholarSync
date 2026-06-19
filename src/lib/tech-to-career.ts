export const TECH_TO_CAREER: Record<string, {
  careers: string[]      // career slugs, ordered by relevance
  explanation: string    // one sentence, shown to the user
}> = {
  // Required core mappings from prompt
  "react": {
    careers: ["frontend-developer", "full-stack-developer"],
    explanation: "React is the most widely used library for building user interfaces and is core to Frontend Development."
  },
  "docker": {
    careers: ["devops-engineer", "backend-developer"],
    explanation: "Docker is foundational to containerization, a core DevOps and Cloud Engineering skill."
  },
  "tensorflow": {
    careers: ["ai-engineer", "data-scientist"],
    explanation: "TensorFlow is one of the two dominant frameworks for building and training machine learning models."
  },
  "pytorch": {
    careers: ["ai-engineer", "data-scientist"],
    explanation: "PyTorch is the preferred deep learning framework in research and most modern AI roles."
  },
  "figma": {
    careers: ["ux-designer"],
    explanation: "Figma is the industry-standard design tool for UI/UX work."
  },
  "aws": {
    careers: ["devops-engineer", "backend-developer"],
    explanation: "AWS is the most widely deployed cloud platform and a core skill for Cloud and DevOps roles."
  },
  "kubernetes": {
    careers: ["devops-engineer"],
    explanation: "Kubernetes is the standard for orchestrating containerized applications at scale."
  },
  "sql": {
    careers: ["data-scientist", "data-analyst", "backend-developer", "java-developer"],
    explanation: "SQL is essential for working with data across analytics, data science, and backend engineering."
  },
  "python": {
    careers: ["ai-engineer", "data-scientist", "backend-developer", "qa-tester"],
    explanation: "Python is the most common language across AI, data science, and backend development."
  },
  "node.js": {
    careers: ["backend-developer", "full-stack-developer"],
    explanation: "Node.js is a primary runtime for backend JavaScript development."
  },
  "flutter": {
    careers: ["mobile-developer"],
    explanation: "Flutter is Google's toolkit for building cross-platform mobile apps from a single codebase."
  },
  "solidity": {
    careers: ["full-stack-developer"],
    explanation: "Solidity is the primary language for writing Ethereum smart contracts."
  },
  "unity": {
    careers: ["game-developer"],
    explanation: "Unity is one of the two dominant game engines used across the industry."
  },
  "terraform": {
    careers: ["devops-engineer"],
    explanation: "Terraform is the leading infrastructure-as-code tool for provisioning cloud resources."
  },
  "tableau": {
    careers: ["data-analyst", "data-scientist"],
    explanation: "Tableau is a leading business intelligence and data visualization tool."
  },
  "linux": {
    careers: ["devops-engineer", "cybersecurity-analyst"],
    explanation: "Linux administration is a baseline skill for DevOps and Cybersecurity roles."
  },
  "git": {
    careers: ["frontend-developer", "backend-developer", "java-developer", "full-stack-developer", "technical-writer"],
    explanation: "Git is the universal version control tool used across nearly every engineering role."
  },
  // Additional requested items in the prompt:
  "graphql": {
    careers: ["backend-developer", "frontend-developer", "full-stack-developer"],
    explanation: "GraphQL is a query language for APIs that provides a more efficient alternative to REST."
  },
  "mongodb": {
    careers: ["full-stack-developer", "backend-developer"],
    explanation: "MongoDB is a popular NoSQL document database used widely in full-stack web applications."
  },
  "postgresql": {
    careers: ["backend-developer", "full-stack-developer", "data-analyst"],
    explanation: "PostgreSQL is a powerful, open-source object-relational database system."
  },
  "next.js": {
    careers: ["frontend-developer", "full-stack-developer"],
    explanation: "Next.js is a popular React framework for production-grade static and server-rendered web apps."
  },
  "typescript": {
    careers: ["frontend-developer", "full-stack-developer", "backend-developer"],
    explanation: "TypeScript adds static typing to JavaScript, making large codebases much easier to maintain."
  },
  "swift": {
    careers: ["mobile-developer"],
    explanation: "Swift is Apple's powerful, intuitive programming language for building native iOS and macOS apps."
  },
  "kotlin": {
    careers: ["mobile-developer"],
    explanation: "Kotlin is the modern, preferred language for native Android mobile application development."
  },
  "r": {
    careers: ["data-scientist"],
    explanation: "R is a language and environment designed specifically for statistical computing and graphics."
  },
  "power bi": {
    careers: ["data-analyst"],
    explanation: "Power BI is Microsoft's business analytics service providing interactive visualizations."
  },
  "photoshop": {
    careers: ["ux-designer"],
    explanation: "Photoshop is the industry-standard software for digital image editing and visual asset design."
  },
  "after effects": {
    careers: ["ux-designer"],
    explanation: "After Effects is used for creating motion graphics and visual effects for user interfaces."
  },
  "salesforce": {
    careers: ["data-analyst"],
    explanation: "Salesforce is the leading CRM platform, requiring specialized data analysts to manage business intelligence."
  },
  "hubspot": {
    careers: ["data-analyst"],
    explanation: "HubSpot is an inbound marketing and CRM tool frequently used by marketing data analysts."
  },
  "webflow": {
    careers: ["frontend-developer", "ux-designer"],
    explanation: "Webflow is a visual web development platform used to design and launch websites without coding."
  },
  "wordpress": {
    careers: ["frontend-developer"],
    explanation: "WordPress powers over 40% of all websites, creating high demand for custom frontend themes."
  },
  // All remaining stage-specific skills from seed-careers:
  "html": {
    careers: ["frontend-developer", "full-stack-developer", "technical-writer"],
    explanation: "HTML is the standard markup language for documents designed to be displayed in a web browser."
  },
  "http": {
    careers: ["frontend-developer", "backend-developer"],
    explanation: "HTTP is the foundational protocol used to transfer data across the World Wide Web."
  },
  "css": {
    careers: ["frontend-developer", "full-stack-developer"],
    explanation: "CSS is the stylesheet language used to describe the presentation and layout of web pages."
  },
  "flexbox": {
    careers: ["frontend-developer"],
    explanation: "Flexbox is a 1D CSS layout model for distributing space and aligning items in a responsive grid."
  },
  "grid": {
    careers: ["frontend-developer"],
    explanation: "CSS Grid is a 2D layout system for creating complex and responsive web layouts."
  },
  "dom manipulation": {
    careers: ["frontend-developer"],
    explanation: "DOM Manipulation is the process of using JavaScript to dynamically update HTML structure and content."
  },
  "state management": {
    careers: ["frontend-developer", "mobile-developer"],
    explanation: "State Management handles data flow and synchronization across UI components."
  },
  "resume writing": {
    careers: ["frontend-developer", "backend-developer", "full-stack-developer", "java-developer", "data-scientist", "ai-engineer", "devops-engineer", "mobile-developer", "ux-designer", "cybersecurity-analyst", "qa-tester", "data-analyst", "game-developer", "technical-writer"],
    explanation: "Resume Writing is a critical skill for successfully marketing your technical expertise to recruiters."
  },
  "interview prep": {
    careers: ["frontend-developer", "backend-developer", "full-stack-developer", "java-developer", "data-scientist", "ai-engineer", "devops-engineer", "mobile-developer", "ux-designer", "cybersecurity-analyst", "qa-tester", "data-analyst", "game-developer", "technical-writer"],
    explanation: "Interview Preparation equips you with the coding and behavioral skills to pass hiring filters."
  },
  "express": {
    careers: ["backend-developer", "full-stack-developer"],
    explanation: "Express is a minimal and flexible Node.js web application framework for building APIs."
  },
  "rest": {
    careers: ["backend-developer"],
    explanation: "REST is an architectural style for designing networked applications and APIs."
  },
  "authentication": {
    careers: ["backend-developer", "full-stack-developer"],
    explanation: "Authentication validates user identities to secure web applications and API access."
  },
  "java": {
    careers: ["java-developer"],
    explanation: "Java is a class-based, object-oriented programming language designed for enterprise systems."
  },
  "oop": {
    careers: ["java-developer", "game-developer"],
    explanation: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects'."
  },
  "data structures": {
    careers: ["java-developer"],
    explanation: "Data Structures organize and store data in computers for efficient access and modification."
  },
  "maven": {
    careers: ["java-developer"],
    explanation: "Maven is a build automation tool used primarily for Java projects."
  },
  "jdbc": {
    careers: ["java-developer"],
    explanation: "JDBC is a Java API to connect and execute queries with relational databases."
  },
  "hibernate": {
    careers: ["java-developer"],
    explanation: "Hibernate is an Object-Relational Mapping (ORM) framework for Java."
  },
  "spring boot": {
    careers: ["java-developer"],
    explanation: "Spring Boot makes it easy to create stand-alone, production-grade Spring-based applications."
  },
  "rest apis": {
    careers: ["java-developer", "mobile-developer", "backend-developer"],
    explanation: "REST APIs allow applications to communicate with servers using HTTP requests."
  },
  "statistics": {
    careers: ["data-scientist"],
    explanation: "Statistics involves collecting, analyzing, interpreting, and presenting empirical data."
  },
  "linear algebra": {
    careers: ["data-scientist", "ai-engineer"],
    explanation: "Linear Algebra is the branch of mathematics concerning linear equations and vector spaces."
  },
  "probability": {
    careers: ["data-scientist"],
    explanation: "Probability theory provides the mathematical foundations for statistical inference and modeling."
  },
  "pandas": {
    careers: ["data-scientist"],
    explanation: "Pandas is a Python library for data manipulation and analysis of tabular datasets."
  },
  "numpy": {
    careers: ["data-scientist"],
    explanation: "NumPy provides support for large, multi-dimensional arrays and mathematical functions in Python."
  },
  "calculus": {
    careers: ["ai-engineer"],
    explanation: "Calculus is the mathematical study of continuous change, key to machine learning backpropagation."
  },
  "scikit-learn": {
    careers: ["ai-engineer"],
    explanation: "Scikit-learn is the standard Python library for classical machine learning algorithms."
  },
  "model evaluation": {
    careers: ["ai-engineer"],
    explanation: "Model Evaluation assesses the performance and accuracy of a trained machine learning model."
  },
  "nlp": {
    careers: ["ai-engineer"],
    explanation: "Natural Language Processing (NLP) enables computers to understand and process human language."
  },
  "computer vision": {
    careers: ["ai-engineer"],
    explanation: "Computer Vision trains computers to interpret and understand the visual world."
  },
  "fastapi": {
    careers: ["ai-engineer", "backend-developer"],
    explanation: "FastAPI is a modern, fast web framework for building APIs with Python."
  },
  "bash": {
    careers: ["devops-engineer"],
    explanation: "Bash is a Unix shell and command language used to automate server scripting tasks."
  },
  "tcp/ip": {
    careers: ["devops-engineer", "cybersecurity-analyst"],
    explanation: "TCP/IP is the conceptual model and set of communications protocols used on the Internet."
  },
  "dns": {
    careers: ["devops-engineer", "cybersecurity-analyst"],
    explanation: "DNS translates human-readable domain names into machine-readable IP addresses."
  },
  "github actions": {
    careers: ["devops-engineer"],
    explanation: "GitHub Actions is an API for automating CI/CD pipelines directly in GitHub."
  },
  "dart": {
    careers: ["mobile-developer"],
    explanation: "Dart is a client-optimized programming language for fast apps on multiple platforms."
  },
  "firebase": {
    careers: ["mobile-developer"],
    explanation: "Firebase is a platform by Google offering databases, authentication, and hosting for mobile apps."
  },
  "design thinking": {
    careers: ["ux-designer"],
    explanation: "Design Thinking is a non-linear, iterative process used to understand users and redefine problems."
  },
  "user research": {
    careers: ["ux-designer"],
    explanation: "User Research focuses on understanding user behaviors, needs, and motivations."
  },
  "wireframing": {
    careers: ["ux-designer"],
    explanation: "Wireframing creates simple visual guides that represent the skeletal framework of a website."
  },
  "prototyping": {
    careers: ["ux-designer"],
    explanation: "Prototyping builds interactive mockups to test design concepts and user journeys."
  },
  "usability testing": {
    careers: ["ux-designer"],
    explanation: "Usability Testing evaluates a product by testing it directly with representative users."
  },
  "case studies": {
    careers: ["ux-designer"],
    explanation: "Case Studies document the end-to-end design process to showcase portfolio outcomes."
  },
  "presentation": {
    careers: ["ux-designer"],
    explanation: "Presentation skill is crucial for explaining design rationale to developers and stakeholders."
  },
  "networking": {
    careers: ["cybersecurity-analyst"],
    explanation: "Networking is the study of how computers connect and transmit packets of data."
  },
  "security+": {
    careers: ["cybersecurity-analyst"],
    explanation: "CompTIA Security+ is a global certification that validates baseline cybersecurity skills."
  },
  "cryptography": {
    careers: ["cybersecurity-analyst"],
    explanation: "Cryptography secures information by transforming it into unreadable formats for unauthorized users."
  },
  "penetration testing": {
    careers: ["cybersecurity-analyst"],
    explanation: "Penetration Testing simulates cyberattacks to find and document security vulnerabilities."
  },
  "web security": {
    careers: ["cybersecurity-analyst"],
    explanation: "Web Security protects websites and APIs from common vulnerabilities like SQL injection and XSS."
  },
  "siem": {
    careers: ["cybersecurity-analyst"],
    explanation: "SIEM tools aggregate and analyze security logs from network devices to detect threats."
  },
  "incident response": {
    careers: ["cybersecurity-analyst"],
    explanation: "Incident Response manages the aftermath of a security breach or cyberattack."
  },
  "manual testing": {
    careers: ["qa-tester"],
    explanation: "Manual Testing is the process of manually checking software for defects without test scripts."
  },
  "jira": {
    careers: ["qa-tester"],
    explanation: "Jira is a proprietary issue tracking product used for bug tracking and agile project management."
  },
  "postman": {
    careers: ["qa-tester", "backend-developer"],
    explanation: "Postman is an API platform for developers to design, build, test, and iterate on APIs."
  },
  "pivot tables": {
    careers: ["data-analyst"],
    explanation: "Pivot Tables allow data analysts to summarize, sort, and group tabular data in spreadsheets."
  },
  "c#": {
    careers: ["game-developer"],
    explanation: "C# is a modern, object-oriented programming language widely used in the Unity game engine."
  },
  "c++": {
    careers: ["game-developer"],
    explanation: "C++ is a high-performance programming language core to the Unreal Engine and triple-A game dev."
  },
  "unreal": {
    careers: ["game-developer"],
    explanation: "Unreal Engine is a powerful 3D creation tool used for game development, film, and virtual production."
  },
  "game physics": {
    careers: ["game-developer"],
    explanation: "Game Physics simulates classical mechanics to make in-game interactions feel realistic."
  },
  "3d math": {
    careers: ["game-developer"],
    explanation: "3D Math uses vectors, matrices, and quaternions to manipulate objects in three-dimensional space."
  },
  "grammar": {
    careers: ["technical-writer"],
    explanation: "Grammar is foundational for constructing clear, professional, and unambiguous technical guides."
  },
  "markdown": {
    careers: ["technical-writer"],
    explanation: "Markdown is a lightweight markup language used to write formatted documentation files."
  },
  "docusaurus": {
    careers: ["technical-writer"],
    explanation: "Docusaurus is a popular React-based static site generator for deploying documentation sites."
  },
  "sphinx": {
    careers: ["technical-writer"],
    explanation: "Sphinx is a documentation generator that converts reStructuredText files into HTML/PDF output."
  },
  "html/css": {
    careers: ["technical-writer", "frontend-developer"],
    explanation: "HTML and CSS are baseline web formatting tools required to customize documentation outputs."
  },
  "apis": {
    careers: ["technical-writer", "backend-developer"],
    explanation: "APIs allow software systems to communicate and are a subject of technical documentation."
  },
  "langchain": {
    careers: ["ai-engineer", "full-stack-developer"],
    explanation: "LangChain is a widely used orchestration framework for developing applications powered by language models."
  },
  "hugging face": {
    careers: ["ai-engineer"],
    explanation: "Hugging Face is the leading hub for pre-trained model sharing, datasets, and NLP pipelines."
  },
  "pinecone": {
    careers: ["ai-engineer"],
    explanation: "Pinecone is a managed vector database designed for high-performance similarity search in RAG pipelines."
  },
  "excel": {
    careers: ["data-analyst"],
    explanation: "Excel remains a foundational data analysis tool for structuring and auditing business records."
  },
  "cypress": {
    careers: ["qa-tester", "frontend-developer"],
    explanation: "Cypress is a next-generation front-end testing tool built for modern web applications."
  },
  "playwright": {
    careers: ["qa-tester", "frontend-developer"],
    explanation: "Playwright enables reliable end-to-end testing for modern web apps across all major browsers."
  },
  "wireshark": {
    careers: ["cybersecurity-analyst"],
    explanation: "Wireshark is the world's foremost network protocol analyzer, critical for security packet audits."
  },
  "nmap": {
    careers: ["cybersecurity-analyst"],
    explanation: "Nmap is an open-source utility for network discovery and vulnerability scanning."
  },
  "metasploit": {
    careers: ["cybersecurity-analyst"],
    explanation: "Metasploit is a penetration testing platform that helps security teams find and exploit vulnerabilities."
  },
  "godot": {
    careers: ["game-developer"],
    explanation: "Godot is a lightweight, open-source 2D and 3D game engine popular for indie development."
  },
  "react native": {
    careers: ["mobile-developer"],
    explanation: "React Native is a framework for building native mobile applications using React."
  },
  "ansible": {
    careers: ["devops-engineer"],
    explanation: "Ansible is an IT automation tool that automates provisioning, configuration management, and application deployment."
  },
  "jenkins": {
    careers: ["devops-engineer"],
    explanation: "Jenkins is a leading open-source automation server used to build and deploy CI/CD pipelines."
  },
  "gitbook": {
    careers: ["technical-writer"],
    explanation: "GitBook is a documentation platform where teams write and publish technical manuals."
  }
};
