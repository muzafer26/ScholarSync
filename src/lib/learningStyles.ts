export type LearningStyleType = "Reader" | "Video Learner" | "Interactive Learner" | "Project Builder";

export interface StyleRecommendation {
  styleType: LearningStyleType;
  whyChoose: string;
  primary: {
    title: string;
    url: string;
    description: string;
  };
  alternative: {
    title: string;
    url: string;
    description: string;
  };
}

export interface SkillLearningStyle {
  skillName: string;
  recommendations: Record<string, StyleRecommendation>; // key: lowercase styleType
}

export const learningStyles: Record<string, SkillLearningStyle> = {
  "HTML": {
    skillName: "HTML",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer formal technical documentation, accessibility standards, and semantic structure outlines.",
        primary: {
          title: "MDN Web Docs: HTML basics",
          url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
          description: "The official web documentation hub covering tags, layout elements, and text formatting standards."
        },
        alternative: {
          title: "HTML Living Standard spec",
          url: "https://html.spec.whatwg.org/multipage/",
          description: "The official technical specification defining HTML standards, features, and browser rules."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual walk-through explaining nested elements, page outlines, and modern tag structures.",
        primary: {
          title: "Super Simple Dev HTML Course",
          url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
          description: "A highly visual, step-by-step introduction to constructing web pages using raw HTML."
        },
        alternative: {
          title: "Traversy Media HTML Crash Course",
          url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
          description: "A developer-oriented crash course showing tags, forms, tables, and web semantics."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You learn best by editing elements in a browser and seeing the web page update instantly.",
        primary: {
          title: "freeCodeCamp Responsive Design Track",
          url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
          description: "Interactive coding challenges walking you from a blank page to a styled, responsive site."
        },
        alternative: {
          title: "W3Schools HTML Tutorial",
          url: "https://www.w3schools.com/html/",
          description: "Interactive sandbox blocks letting you try tags, see results, and test basic configurations."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to build real layouts from scratch, organizing contents structurally.",
        primary: {
          title: "Frontend Mentor HTML Starter Challenges",
          url: "https://www.frontendmentor.io/challenges",
          description: "Practice building clean web pages from design files, focusing entirely on clean document structure."
        },
        alternative: {
          title: "Build a Custom Personal Web Page",
          url: "https://github.com/firstcontributions/first-contributions",
          description: "Build a structured page outlining your biography, credentials, and achievements."
        }
      }
    }
  },
  "CSS": {
    skillName: "CSS",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading formal layout rules, spec explanations, and design property documentation.",
        primary: {
          title: "CSS-Tricks Almanac",
          url: "https://css-tricks.com/almanac/",
          description: "The ultimate reference guide mapping every CSS property with code snippets and visual outcomes."
        },
        alternative: {
          title: "MDN CSS Reference",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          description: "Comprehensive guide detailing CSS syntax, selectors, specificity, and layout modules."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual demonstration of grid systems, flexbox alignment, and animation keyframes.",
        primary: {
          title: "Kevin Powell: CSS masterclasses",
          url: "https://www.youtube.com/@KevinPowell",
          description: "The best video channel explaining CSS mechanics, layouts, custom properties, and animations."
        },
        alternative: {
          title: "CSS Grid & Flexbox by Net Ninja",
          url: "https://www.youtube.com/watch?v=jV8B24rSN5o",
          description: "Visually clean playlist tutorial explaining CSS layout models in detail."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to play visual games to master layout coordinate systems and properties.",
        primary: {
          title: "Flexbox Froggy",
          url: "https://flexboxfroggy.com/",
          description: "A fun interactive game where you write CSS flexbox rules to help frogs find their lily pads."
        },
        alternative: {
          title: "Grid Garden",
          url: "https://cssgridgarden.com/",
          description: "An interactive browser game teaching CSS Grid layout options across 28 progressive levels."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to design layouts, align elements, and match mockups pixel-for-pixel.",
        primary: {
          title: "Frontend Mentor Layout challenges",
          url: "https://www.frontendmentor.io/",
          description: "HTML/CSS template files matching professional Figma designs to build your responsive design skills."
        },
        alternative: {
          title: "Custom CSS Zen Garden recreation",
          url: "http://www.csszengarden.com/",
          description: "Change the style sheet of a fixed HTML file to produce completely unique, stunning layouts."
        }
      }
    }
  },
  "JavaScript": {
    skillName: "JavaScript",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You want deep JavaScript explanations, object patterns, scope mechanics, and API details.",
        primary: {
          title: "JavaScript.info",
          url: "https://javascript.info/",
          description: "The absolute best written tutorial for learning JavaScript, from fundamentals to advanced concepts."
        },
        alternative: {
          title: "You Don't Know JS Yet (Book Series)",
          url: "https://github.com/getify/You-Dont-Know-JS",
          description: "A deep-dive book series looking at core JS mechanics, closure scopes, scopes, and classes."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You learn most efficiently by seeing a developer explain asynchronous calls and variables visually.",
        primary: {
          title: "Namaste JavaScript by Akshay Saini",
          url: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCgSeGVyZbLYUFo_3",
          description: "A legendary video series explaining the JS event loop, execution contexts, closures, and engines."
        },
        alternative: {
          title: "JavaScript Crash Course by Traversy Media",
          url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
          description: "Visual walk-through of the DOM, arrays, control loops, and OOP concepts."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to write JS code inside a browser terminal, passing unit tests for algorithms.",
        primary: {
          title: "Exercism JavaScript Track",
          url: "https://exercism.org/tracks/javascript",
          description: "Write and execute JS challenges with local or browser tests, with feedback from mentors."
        },
        alternative: {
          title: "JSTinyRobots Coding challenges",
          url: "https://jsrobot.org/",
          description: "A puzzle game where you use JavaScript commands to guide a robot through layouts."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to create real-world scripts, manipulate the DOM, and call live APIs.",
        primary: {
          title: "JavaScript 30 by Wes Bos",
          url: "https://javascript30.com/",
          description: "Build 30 vanilla JS projects in 30 days without libraries, frameworks, or compiling templates."
        },
        alternative: {
          title: "App Ideas Collection repo",
          url: "https://github.com/florinpop17/app-ideas",
          description: "A curated list of project templates with clear specifications to build from scratch."
        }
      }
    }
  },
  "React": {
    skillName: "React",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You absorb complex programming concepts best through written explanations, structured API references, and conceptual code diagrams.",
        primary: {
          title: "Official React Documentation",
          url: "https://react.dev/",
          description: "The gold standard for learning React. Clean interactive sandboxes explain state, hooks, and component lifecycles in-depth."
        },
        alternative: {
          title: "React TypeScript Cheatsheet",
          url: "https://react-typescript-cheatsheet.netlify.app/",
          description: "Written design pattern guides showing exactly how to use type assertions and definitions in React components."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You learn most efficiently by watching an expert walk through code design step-by-step and explain design patterns visually.",
        primary: {
          title: "Scrimba React Course",
          url: "https://scrimba.com/learn/learnreact",
          description: "An interactive video course where you can pause the video and edit code directly inside the player."
        },
        alternative: {
          title: "FreeCodeCamp React Course",
          url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
          description: "A comprehensive video guide breaking down components, state management, hooks, and external API requests."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You prefer immediate coding feedback, solving structured exercises, and fixing test suites directly in your browser.",
        primary: {
          title: "React.dev Interactive Challenges",
          url: "https://react.dev/learn",
          description: "Built-in interactive console quizzes and coding blocks concluding every major documentation chapter."
        },
        alternative: {
          title: "Exercism React Track",
          url: "https://exercism.org/tracks/javascript",
          description: "Code challenges requiring you to download, implement, and pass local unit tests for React workflows."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to learn by building full, deployed applications from scratch rather than reading syntax guides.",
        primary: {
          title: "Full Stack Open",
          url: "https://fullstackopen.com/en/",
          description: "Deep project-based training mapping React component assembly directly to backend APIs and state management."
        },
        alternative: {
          title: "Frontend Mentor Challenges",
          url: "https://www.frontendmentor.io/",
          description: "Professional Figma design mockups you can build out from scratch using React, checking alignment against layout targets."
        }
      }
    }
  },
  "TypeScript": {
    skillName: "TypeScript",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer clean type declarations, handbook specs, and compiler configuration details.",
        primary: {
          title: "Official TypeScript Handbook",
          url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          description: "Detailed, official handbook explaining generic types, utility interfaces, interfaces, and compiler setups."
        },
        alternative: {
          title: "Effective TypeScript (Book)",
          url: "https://effectivetypescript.com/",
          description: "62 specific rules to write robust, type-safe, and idiomatic TypeScript code."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to see a senior architect refactor files, explain types, and configure strict compiler modes.",
        primary: {
          title: "Jack Herrington TypeScript tutorials",
          url: "https://www.youtube.com/@jherr",
          description: "Superb video walk-throughs covering generics, utility types, hooks, and advanced patterns."
        },
        alternative: {
          title: "TypeScript Beginners Course by Net Ninja",
          url: "https://www.youtube.com/watch?v=2pZmKW9-I_k",
          description: "Visually clean playlist explaining core TypeScript types, compiler flags, and basic project setups."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to solve type challenges in an interactive editor, checking compiler output in real-time.",
        primary: {
          title: "Type Hero Challenges",
          url: "https://typehero.dev/",
          description: "A gorgeous interactive platform containing progression tracks to master TypeScript types."
        },
        alternative: {
          title: "TypeScript Exercises portal",
          url: "https://typescript-exercises.github.io/",
          description: "A collection of 15 interactive coding tasks testing type definitions and generics."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to configure strongly typed API servers, npm packages, or component structures.",
        primary: {
          title: "Build a Strict API Client SDK",
          url: "https://www.typescriptlang.org/",
          description: "Build a strongly-typed npm library wrap around a public API, ensuring strict return types."
        },
        alternative: {
          title: "TypeScript React template building",
          url: "https://react.dev/learn/typescript",
          description: "Configure components, contexts, and hooks using strict type declarations."
        }
      }
    }
  },
  "Next.js": {
    skillName: "Next.js",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer App Router guidelines, server rendering docs, and hydration spec guides.",
        primary: {
          title: "Official Next.js Documentation",
          url: "https://nextjs.org/docs",
          description: "Comprehensive App Router docs detailing server rendering, middleware, routing, and data updates."
        },
        alternative: {
          title: "Next.js App Router Playground",
          url: "https://app-router-playgound.vercel.app/",
          description: "Interactive layout references illustrating server loading, nested routes, and caching rules."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to see dynamic pages compile, server components explain data bounds, and deployments.",
        primary: {
          title: "Next.js App Router Crash Course by Lee Robinson",
          url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
          description: "Vercel's VP of Developer Experience explains Server Components, caching, routing, and performance."
        },
        alternative: {
          title: "Next.js Tutorial by Codevolution",
          url: "https://www.youtube.com/watch?v=RyYSJwAUpS0",
          description: "Thorough, structured playlist teaching every feature of the Next.js App Router framework."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to follow step-by-step interactive paths inside your browser to assemble a blog/app.",
        primary: {
          title: "Next.js Interactive Learning Track",
          url: "https://nextjs.org/learn",
          description: "The official interactive learning path building a full-stack dashboard with database integrations."
        },
        alternative: {
          title: "Scrimba Next.js playlist",
          url: "https://scrimba.com/learn/nextjs",
          description: "Interactive sandboxed video course teaching Next.js components, pages, and hooks."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to build and deploy complex full-stack apps with server actions and dynamic routing.",
        primary: {
          title: "Build a Next.js E-Commerce SaaS",
          url: "https://github.com/vercel/commerce",
          description: "Study and build upon Vercel's commerce template mapping out high-performance product grids."
        },
        alternative: {
          title: "Build a Server-Action Task Manager",
          url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
          description: "Construct a dashboard utilizing server action endpoints, client states, and PostgreSQL logs."
        }
      }
    }
  },
  "Python": {
    skillName: "Python",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading PEP standards, written tutorials, and idiomatic syntax guidelines.",
        primary: {
          title: "Real Python Tutorials",
          url: "https://realpython.com/",
          description: "High-quality, in-depth written articles explaining Python modules, data structures, and best practices."
        },
        alternative: {
          title: "Official Python Tutorial",
          url: "https://docs.python.org/3/tutorial/",
          description: "The official Python tutorial covering core structures, modules, classes, and error handling."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual demonstration of scripts, data parsing, and library installations.",
        primary: {
          title: "Python for Beginners by Programming with Mosh",
          url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
          description: "A comprehensive 6-hour video course explaining variables, controls, modules, and basic scripting."
        },
        alternative: {
          title: "Corey Schafer Python Tutorial",
          url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
          description: "Superb programming tutorials detailing virtual environments, OOP concepts, and SQL integrations."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to solve algorithm challenges in a browser terminal, receiving immediate checks.",
        primary: {
          title: "LearnPython.org Interactive Track",
          url: "https://www.learnpython.org/",
          description: "Free interactive browser console exercises covering basic and advanced Python scripts."
        },
        alternative: {
          title: "CheckiO Python Game",
          url: "https://py.checkio.org/",
          description: "An interactive coding game where you use Python algorithms to protect spaceships and expand nodes."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to automate file transfers, scrape data pages, or build API nodes.",
        primary: {
          title: "Automate the Boring Stuff with Python",
          url: "https://automatetheboringstuff.com/",
          description: "The legendary project-based guide to scripting file modifications, scrape sites, and automate tasks."
        },
        alternative: {
          title: "Django / FastAPI Project creation",
          url: "https://fastapi.tiangolo.com/tutorial/",
          description: "Configure strongly typed backend API routers, database logs, and server validations."
        }
      }
    }
  },
  "SQL": {
    skillName: "SQL",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading formal database specifications, query planning docs, and formal index guidelines.",
        primary: {
          title: "PostgreSQL Official Documentation",
          url: "https://www.postgresql.org/docs/",
          description: "Authoritative specifications outlining query execution rules, datatypes, indexes, and partition layouts."
        },
        alternative: {
          title: "Use The Index, Luke!",
          url: "https://use-the-index-luke.com/",
          description: "An exceptional, database-agnostic guide to database performance, explaining how indexes speed up SQL operations."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You thrive when a database architect visualizes queries, index scans, and database joins on a blackboard.",
        primary: {
          title: "FreeCodeCamp SQL Guide",
          url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
          description: "Comprehensive database design tutorial teaching schema setup, relational constraints, and core SQL operations."
        },
        alternative: {
          title: "Hussein Nasser Database Course",
          url: "https://www.youtube.com/playlist?list=PLQnLJOPFT9Qd-M_w9C0cK1u0bF8s-V5s_",
          description: "Deep dive videos explaining connection pools, query tuning, index scans, and database engine internals."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You learn best by running queries in an interactive console and seeing tables filter instantly.",
        primary: {
          title: "SQLBolt",
          url: "https://sqlbolt.com/",
          description: "Highly recommended interactive lessons teaching SQL queries through direct browser-based exercises."
        },
        alternative: {
          title: "SQLZoo",
          url: "https://sqlzoo.net/",
          description: "A comprehensive sandbox containing real-world database tables to run aggregates, joins, and nested subqueries."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to design databases from scratch, configure schemas, and tune complex application database queries.",
        primary: {
          title: "DB Fiddle Schema Design",
          url: "https://www.db-fiddle.com/",
          description: "A web editor where you can test schema design, write relationships, and compare optimization metrics."
        },
        alternative: {
          title: "Prisma Schema Builder",
          url: "https://www.prisma.io/",
          description: "Design relational models, generate migration logs, and optimize query calls for backend apps."
        }
      }
    }
  },
  "Docker": {
    skillName: "Docker",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading formal Dockerfile specs, volume references, and cluster networking docs.",
        primary: {
          title: "Official Docker Documentation",
          url: "https://docs.docker.com/",
          description: "Comprehensive documentation covering commands, multi-stage configurations, and compose properties."
        },
        alternative: {
          title: "Play with Docker classroom",
          url: "https://training.play-with-docker.com/",
          description: "Step-by-step written lab guides mapping out container operations and swarm configurations."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual walk-through detailing container states, base images, and compose configs.",
        primary: {
          title: "Docker Tutorial for Beginners by TechWorld with Nana",
          url: "https://www.youtube.com/watch?v=pTFZFxd4hOI",
          description: "A clear video walkthrough of Docker containers, volumes, networks, and compose deployments."
        },
        alternative: {
          title: "FreeCodeCamp Docker Course",
          url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
          description: "4-hour video detailing multi-stage builds, image layers, and repository commands."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to configure container networks and terminals in an interactive browser terminal.",
        primary: {
          title: "Play with Docker Sandbox",
          url: "https://labs.play-with-docker.com/",
          description: "A free interactive browser terminal where you can run container commands and compose stacks."
        },
        alternative: {
          title: "Killercoda Docker Playground",
          url: "https://killercoda.com/docker",
          description: "Interactive, sandboxed lessons checking container states, builds, and networks."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to containerize multi-service full-stack apps and scale local databases.",
        primary: {
          title: "Containerize a Multi-service App Stack",
          url: "https://docs.docker.com/get-started/08_using_compose/",
          description: "Configure docker-compose declaring Node client servers, PostgreSQL database logs, and caching stacks."
        },
        alternative: {
          title: "Dockerizing React/Next client layers",
          url: "https://github.com/vercel/next.js/tree/canary/examples/with-docker",
          description: "Build an optimized multi-stage client container package mapping configs."
        }
      }
    }
  },
  "Kubernetes": {
    skillName: "Kubernetes",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading cluster API specs, network policies, and pod lifecycle docs.",
        primary: {
          title: "Official Kubernetes Documentation",
          url: "https://kubernetes.io/docs/home/",
          description: "Official guides and reference docs detailing Pods, Services, Ingress, Deployments, and Configs."
        },
        alternative: {
          title: "Kubernetes by Example",
          url: "https://kubernetesbyexample.com/",
          description: "Written walkthroughs explaining resource manifests and configuration variables."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to watch a cloud architect deploy resources, debug routing, and map clusters.",
        primary: {
          title: "Kubernetes Tutorial by TechWorld with Nana",
          url: "https://www.youtube.com/watch?v=X48VuDVv0do",
          description: "An exceptional, comprehensive video course covering Pods, Deployments, Services, Helm, and namespaces."
        },
        alternative: {
          title: "Kubernetes Crash Course by Jeff Geerling",
          url: "https://www.youtube.com/watch?v=d65z63Jp0Yw",
          description: "Visual introduction to local development clusters (minikube/k3s) and pod scaling."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to edit YAML manifests and execute kubectl commands in a virtual terminal.",
        primary: {
          title: "Killercoda Kubernetes Playground",
          url: "https://killercoda.com/playgrounds",
          description: "A free interactive sandboxed terminal to execute kubectl commands and deploy resources."
        },
        alternative: {
          title: "Play with Kubernetes (labs)",
          url: "https://labs.play-with-k8s.com/",
          description: "An official browser sandbox to setup multi-node clusters and route traffic."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to deploy apps using GitOps automation pipelines.",
        primary: {
          title: "Deploying App to local Minikube cluster",
          url: "https://kubernetes.io/docs/tutorials/hello-minikube/",
          description: "Set up a local minikube system, map configs, deploy pods, and configure NodePort services."
        },
        alternative: {
          title: "ArgoCD GitOps App Deployments",
          url: "https://argo-cd.readthedocs.io/en/stable/getting_started/",
          description: "Configure ArgoCD pipelines deploying resources automatically based on git changes."
        }
      }
    }
  },
  "AWS": {
    skillName: "AWS",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer consulting architectural documentation, whitepapers, and cloud security guidelines.",
        primary: {
          title: "AWS Architecture Center",
          url: "https://aws.amazon.com/architecture/",
          description: "Curated blueprints, design frameworks, and whitepapers explaining highly available, secure system designs."
        },
        alternative: {
          title: "AWS Well-Architected Framework",
          url: "https://aws.amazon.com/architecture/well-architected/",
          description: "Guidelines detailing the core pillars of cloud systems: security, reliability, performance, and cost management."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to see a cloud engineer click through consoles, explain networks, and configuration steps visually.",
        primary: {
          title: "Stephane Maarek AWS Solutions Architect",
          url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
          description: "A comprehensive course mapping out VPC configurations, IAM security rules, serverless apps, and databases."
        },
        alternative: {
          title: "FreeCodeCamp AWS Practitioner Guide",
          url: "https://www.youtube.com/watch?v=SOTamWGuDKc",
          description: "A solid intro video course detailing cloud principles, global network regions, and basic AWS services."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to follow step-by-step interactive labs inside live cloud environments without costing real money.",
        primary: {
          title: "AWS Workshops",
          url: "https://workshops.aws/",
          description: "Official self-paced workshop guides created by AWS engineers, mapping out VPCs, containers, and serverless apps."
        },
        alternative: {
          title: "Qwiklabs cloud tracks",
          url: "https://www.qwiklabs.com/",
          description: "Hands-on virtual lab instances where you can spin up servers, manage databases, and query services live."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to declare infrastructure as code, launch apps, and manage deployed pipelines.",
        primary: {
          title: "The Cloud Resume Challenge",
          url: "https://cloudresumechallenge.dev/",
          description: "A legendary step-by-step project forcing you to build and host a resume utilizing serverless functions, database queries, and CI/CD pipelines."
        },
        alternative: {
          title: "Terraform AWS Boilerplate",
          url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs",
          description: "Write and execute IaC scripts defining networks, application servers, and server clusters."
        }
      }
    }
  },
  "PyTorch": {
    skillName: "PyTorch",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading model blueprints, mathematical papers, and API specifications.",
        primary: {
          title: "Official PyTorch Tutorials",
          url: "https://pytorch.org/tutorials/",
          description: "Official walkthroughs mapping out tensor operations, autograd calculations, and neural net setups."
        },
        alternative: {
          title: "Deep Learning with PyTorch (Book)",
          url: "https://pytorch.org/assets/deep-learning/Deep-Learning-with-PyTorch.pdf",
          description: "Free written book detailing dataset models, convolutions, and optimization loops."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual step-by-step code assembly of custom tensors and deep training loops.",
        primary: {
          title: "PyTorch for Deep Learning by Daniel Bourke",
          url: "https://www.youtube.com/watch?v=V_xro1bcAuA",
          description: "24-hour course walking through tensor maths, CNN setups, computer vision, and custom models."
        },
        alternative: {
          title: "Aladdin Persson PyTorch tutorials",
          url: "https://www.youtube.com/playlist?list=PLhhyoLH6IjfxeoooqP9rhU3HJHyDp1tVz",
          description: "Detailed video list building CNNs, RNNs, transformers, and model tuning."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to modify model hyper-parameters inside sandbox Colab notebooks, seeing loss rates drop.",
        primary: {
          title: "Google Colab PyTorch Tutorials",
          url: "https://colab.research.google.com/github/pytorch/tutorials/",
          description: "Colab notebooks that compile models, calculate back-propagation, and output accuracy graphs."
        },
        alternative: {
          title: "Hugging Face NLP Course",
          url: "https://huggingface.co/learn/nlp-course/",
          description: "Interactive tutorial covering transformers, tokenizers, and model weight fine-tuning."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to train neural networks on original datasets and deploy classifiers.",
        primary: {
          title: "Fast.ai: Deep Learning for Coders",
          url: "https://course.fast.ai/",
          description: "Highly recommended, top-down project training system deploying actual production models."
        },
        alternative: {
          title: "PyTorch Image Classifier Project",
          url: "https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html",
          description: "Train a convolutional neural network (CNN) model to identify images on a training set."
        }
      }
    }
  },
  "Git": {
    skillName: "Git",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You learn by reading book chapters, understanding merge trees, and reviewing terminal commands.",
        primary: {
          title: "Pro Git Book",
          url: "https://git-scm.com/book/en/v2",
          description: "The authoritative manual for Git. Explains file states, branching mechanisms, and remote operations in-depth."
        },
        alternative: {
          title: "Atlassian Git Tutorials",
          url: "https://www.atlassian.com/git/tutorials",
          description: "Visually rich, written guides demonstrating branches, rebase workflows, cherry-picking, and pull requests."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual demonstration of staging areas, conflict resolutions, and branch rebases.",
        primary: {
          title: "Git & GitHub Crash Course",
          url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
          description: "Step-by-step video explaining staging files, commit history, merge conflicts, and GitHub setup."
        },
        alternative: {
          title: "Missing Semester Version Control",
          url: "https://missing.csail.mit.edu/2020/version-control/",
          description: "MIT lecture explaining the mathematical data model behind Git commits and branch references."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to play games, drag commits, and solve interactive branching puzzles.",
        primary: {
          title: "Learn Git Branching",
          url: "https://learngitbranching.js.org/",
          description: "A phenomenal interactive visual sandbox game teaching commits, branches, merges, and rebases."
        },
        alternative: {
          title: "Oh My Git!",
          url: "https://ohmygit.org/",
          description: "An open-source game displaying internal repository trees, letting you run git commands interactively."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to create real code repositories, resolve conflicts, and run collaborative workflows.",
        primary: {
          title: "GitHub First Contributions",
          url: "https://github.com/firstcontributions/first-contributions",
          description: "A live GitHub repository designed to let beginners practice forks, local cloning, editing, and submitting pull requests."
        },
        alternative: {
          title: "Git Real-World Workflows Guide",
          url: "https://github.com/karan/Projects",
          description: "Create code projects, manage features on distinct branches, merge conflicts, and deploy to Vercel."
        }
      }
    }
  },
  "Figma": {
    skillName: "Figma",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading formal design specs, UI guides, and component libraries details.",
        primary: {
          title: "Figma Help Center: Design System Guide",
          url: "https://help.figma.com/hc/en-us/categories/360002045334-Create-and-manage-design-systems",
          description: "Official guide on designing reusable components, variant properties, libraries, and layout styles."
        },
        alternative: {
          title: "Refactoring UI (Book)",
          url: "https://www.refactoringui.com/",
          description: "Excellent layout patterns book explaining spacing grids, visual hierarchies, and font rules."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to see a designer configure layouts, build component systems, and link prototypes.",
        primary: {
          title: "Figma UI/UX Design Essentials by Daniel Walter Scott",
          url: "https://www.youtube.com/watch?v=c9Wg6gOIP2s",
          description: "Comprehensive guide to building component variations, prototypes, and user flows."
        },
        alternative: {
          title: "Figma YouTube channel playlists",
          url: "https://www.youtube.com/c/FigmaDesign",
          description: "Official tutorials detailing auto-layout tips, prototyping links, and design handoff rules."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to modify layouts, toggle component variants, and solve puzzles inside Figma canvas.",
        primary: {
          title: "Figma Auto-Layout Interactive Sandbox",
          url: "https://www.figma.com/community/file/784448224138124326",
          description: "Official interactive Figma community file teaching auto-layout rules directly in the tool."
        },
        alternative: {
          title: "Uxcel Design Tracks",
          url: "https://uxcel.com/",
          description: "Interactive design quizzes, layout rules, and component system challenges."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to design complete landing layouts, component systems, and prototype flows.",
        primary: {
          title: "Build Responsive UI in Figma",
          url: "https://www.frontendmentor.io/challenges",
          description: "Utilize professional briefs to build responsive layout component grids in Figma."
        },
        alternative: {
          title: "Figma Custom Design System Portfolio project",
          url: "https://help.figma.com/hc/en-us",
          description: "Design a complete responsive SaaS dashboard with typography sheets, variants, and colors."
        }
      }
    }
  },
  "Linux": {
    skillName: "Linux",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading formal Linux manual pages, shell scripts tutorials, and security checklists.",
        primary: {
          title: "Linux Command Line Manual by William Shotts",
          url: "https://linuxcommand.org/tlcl.php",
          description: "An exceptional, free textbook teaching shell navigation, scripting, variables, and permissions."
        },
        alternative: {
          title: "TLDR Pages reference",
          url: "https://tldr.sh/",
          description: "Simplistic, clear community command-line cheatsheets mapping options."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to see a systems engineer structure bash files and secure routes in a shell.",
        primary: {
          title: "Linux for Beginners by Learn Linux TV",
          url: "https://www.youtube.com/@LearnLinuxTV",
          description: "Exceptional visual video guides detailing directory trees, SSH setups, user profiles, and commands."
        },
        alternative: {
          title: "NetworkChuck Linux Course",
          url: "https://www.youtube.com/watch?v=V1y-mbWM3B8",
          description: "Energetic walkthrough explaining processes, terminal setups, scripts, and server paths."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to run commands inside a sandbox Linux console, passing logic challenges.",
        primary: {
          title: "SadServers troubleshooting tasks",
          url: "https://sadservers.com/",
          description: "Interactive tasks where you are given a broken VM shell and must fix the node."
        },
        alternative: {
          title: "OverTheWire Wargames",
          url: "https://overthewire.org/wargames/bandit/",
          description: "A secure terminal puzzle teaching navigation, directories permissions, and shell loops."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to automate processes and manage server infrastructure.",
        primary: {
          title: "Build an Automated Shell Backup daemon",
          url: "https://linuxcommand.org/",
          description: "Write a custom system script compiling logs, archiving directories, and scheduling cron timers."
        },
        alternative: {
          title: "Minikube / Docker sandbox management",
          url: "https://docs.docker.com/engine/install/",
          description: "Setup container packages on a local server, configuring system variables."
        }
      }
    }
  },
  "Networking": {
    skillName: "Networking",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading network RFC specifications, routing details, and IP subnetting sheets.",
        primary: {
          title: "Cloudflare: Core Network Concepts",
          url: "https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/",
          description: "High-trust written articles explaining DNS layers, routing, TCP configurations, and firewalls."
        },
        alternative: {
          title: "Computer Networking book (Kurose & Ross)",
          url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003290",
          description: "The gold-standard academic guide explaining network routers and connection protocols."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want to see a network architect trace routes, build VPC subnets, and explain handshakes.",
        primary: {
          title: "CCNA playlist by Jeremy's IT Lab",
          url: "https://www.youtube.com/playlist?list=PLQQoSBmrXmEy_970dS9Bf98S8B6T4M2gO",
          description: "The most comprehensive visual training series covering IP allocations, routes, routing, and switches."
        },
        alternative: {
          title: "PowerOfData: Network layers video",
          url: "https://www.youtube.com/watch?v=IPvYjX9H_9Y",
          description: "Visual breakdown explaining TCP, HTTP connections, and DNS resolver protocols."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to link routers in a visual simulation and trace network packets.",
        primary: {
          title: "Cisco Packet Tracer labs",
          url: "https://www.netacad.com/courses/packet-tracer",
          description: "A free interactive simulator tool allowing you to connect nodes, routers, and VPC blocks."
        },
        alternative: {
          title: "Subnetting Practice portal",
          url: "https://www.subnetting.org/",
          description: "Interactive browser math questions helping you quickly calculate mask and CIDR sizes."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to deploy network routing rules, secure gateways, and manage VPC setups.",
        primary: {
          title: "Design a secure VPC network topology",
          url: "https://aws.amazon.com/vpc/",
          description: "Define subnet masks, route gateways, VPC configurations, and security ports."
        },
        alternative: {
          title: "Setting up a Local DNS Resolver node",
          url: "https://pi-hole.net/",
          description: "Configure a custom network DNS sinkhole routing queries, blocking ad domains."
        }
      }
    }
  },
  "Mathematics": {
    skillName: "Mathematics",
    recommendations: {
      "reader": {
        styleType: "Reader",
        whyChoose: "You prefer reading formal mathematical derivations, statistical properties, and matrix math proofs.",
        primary: {
          title: "Linear Algebra Done Right (Book)",
          url: "https://linear.axler.net/",
          description: "Beautifully structured textbook explaining vector spaces, linear transformations, and matrices."
        },
        alternative: {
          title: "Think Stats: Probability for Programmers",
          url: "https://greenteapress.com/wp/think-stats-2e/",
          description: "Written guide demonstrating statistical algorithms using Python code loops."
        }
      },
      "video learner": {
        styleType: "Video Learner",
        whyChoose: "You want a visual rendering of matrices rotations, gradient derivatives, and probability graphs.",
        primary: {
          title: "Essence of Linear Algebra by 3Blue1Brown",
          url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
          description: "Visually stunning animated video series explaining matrix transformations, dot products, and eigenvalues."
        },
        alternative: {
          title: "Khan Academy: Statistics & Calculus",
          url: "https://www.khanacademy.org/math/statistics-probability",
          description: "Structured playlists detailing distributions, standard error, derivatives, and convergence."
        }
      },
      "interactive learner": {
        styleType: "Interactive Learner",
        whyChoose: "You want to run computations in code notebooks, seeing graph updates instantly.",
        primary: {
          title: "Math Academy tracks",
          url: "https://www.mathacademy.com/",
          description: "Adaptive interactive courses covering linear algebra, matrices, and statistics."
        },
        alternative: {
          title: "Brilliant.org Mathematical tracks",
          url: "https://brilliant.org/",
          description: "Visual, interactive quizzes teaching matrix operations, calculus, and neural net logic."
        }
      },
      "project builder": {
        styleType: "Project Builder",
        whyChoose: "You want to write custom formulas, script equations, and run data analyses from scratch.",
        primary: {
          title: "Implement Gradient Descent from Scratch",
          url: "https://github.com/fastai/numerical-linear-algebra",
          description: "Write vector derivatives and update variables iteratively to optimize custom models."
        },
        alternative: {
          title: "Build an A/B Testing calculator",
          url: "https://greenteapress.com/",
          description: "Write code to parse conversion data tables, outputs p-value estimations and confidence ranges."
        }
      }
    }
  }
};

export function getStyleRecommendation(skillName: string, styleName: string): StyleRecommendation | undefined {
  const norm = skillName.trim().toUpperCase();
  for (const key of Object.keys(learningStyles)) {
    if (key.toUpperCase() === norm || learningStyles[key].skillName.toUpperCase() === norm) {
      const node = learningStyles[key];
      return node.recommendations[styleName.trim().toLowerCase()];
    }
  }
  return undefined;
}
