// Verified Portfolio Data for Imran Ahmad Mir
// Source of Truth: Attached Official Resume & GitHub (https://github.com/Imran123-code)

export const personalInfo = {
  name: "Imran Ahmad Mir",
  preferredName: "Imran Ahmad",
  role: "Computer Science Student | Developer | Data Analytics Enthusiast",
  headline: "Passionate about developing user-friendly software solutions, responsive web applications, and data-driven analytics experiences.",
  avatar: "https://avatars.githubusercontent.com/u/174039478?v=4",
  location: "Ahmedabad, India",
  university: "Aditya Silver Oak University",
  degree: "Bachelor of Engineering in Computer Engineering",
  educationPeriod: "2023 – 2027",
  phone: "+91-7006546060",
  email: "letsmeetimran@gmail.com",
  github: "https://github.com/Imran123-code",
  linkedin: "https://www.linkedin.com/in/ahmad-imran-4jbshcdsbcjsbj4449b375/",
  resumeUrl: "/imran_ahmad_mir_resume.pdf",
  publicReposCount: 41,
  stats: [
    { label: "Public Repositories", value: "41+" },
    { label: "Engineering Track", value: "2023-27" },
    { label: "Core Competencies", value: "10+" },
    { label: "Certified Programs", value: "2026" }
  ],
  profileSummary: "Motivated Software Engineering student skilled in Python, React.js, JavaScript, and modern web development, with experience building responsive web applications and academic projects. Passionate about developing user-friendly software solutions and enhancing web experiences through modern technologies. Strong understanding of frontend and backend development, problem-solving, responsive design, and database integration. Quick learner with the ability to adapt to new technologies and work effectively in team-based environments.",
  coursework: [
    "Web Development",
    "Database Management",
    "Software Engineering",
    "Programming Fundamentals",
    "Responsive Web Design"
  ],
  languages: [
    { name: "English", level: "Basic" },
    { name: "Hindi", level: "Fluent" },
    { name: "Urdu", level: "Native / Bilingual" },
    { name: "Kashmiri", level: "Native / Bilingual" }
  ]
};

// Technical Skill Matrix
export const skillsData = {
  programming: [
    { name: "Python", level: 90, icon: "Code2", desc: "Data processing, automated scripts, voice assistants, and AI integration." },
    { name: "JavaScript", level: 92, icon: "Zap", desc: "ES6+, DOM manipulation, asynchronous workflows, and API consumption." },
    { name: "SQL", level: 88, icon: "Database", desc: "Relational database querying, schema structuring, joins, and data extraction." }
  ],
  webDevelopment: [
    { name: "React.js", level: 92, icon: "Atom", desc: "Modern functional components, hooks, state architecture, and interactive SPAs." },
    { name: "HTML5", level: 95, icon: "Layout", desc: "Semantic markup, accessibility foundations, and standard web structures." },
    { name: "CSS3", level: 92, icon: "FileCode", desc: "Responsive layouts, Flexbox, Grid systems, and clean animations." },
    { name: "Responsive Web Design", level: 94, icon: "Smartphone", desc: "Mobile-first viewports, fluid typography, and cross-device testing." }
  ],
  dataAnalytics: [
    { name: "Power BI", level: 90, icon: "BarChart3", desc: "Executive business intelligence dashboards, KPI cards, and DAX measures." },
    { name: "Data Analytics", level: 88, icon: "LineChart", desc: "Exploratory data analysis, statistical profiling, and pattern discovery." },
    { name: "Microsoft Excel", level: 92, icon: "FileSpreadsheet", desc: "Data modeling, pivot summaries, advanced formulas, and spreadsheet analysis." },
    { name: "Chart.js & PapaParse", level: 86, icon: "Server", desc: "Client-side automated CSV parsing and interactive visual charting." }
  ],
  tools: [
    { name: "Git & GitHub", level: 90, icon: "GitBranch", desc: "Version control, commit history, branch workflows, and open-source hosting." },
    { name: "VS Code", level: 94, icon: "Terminal", desc: "Primary IDE, workspace customization, debugging, and productivity extensions." },
    { name: "Chrome DevTools", level: 90, icon: "Cpu", desc: "DOM inspection, network waterfall analysis, and performance auditing." },
    { name: "Figma", level: 84, icon: "PenTool", desc: "Wireframing, visual assets, component structure, and design inspection." }
  ]
};

// -------------------------------------------------------------
// TOP 6 FEATURED PROJECTS (Ordered by technical complexity & recruiter value)
// 1. E-Commerce Website (Hero Flagship - Largest Visual Treatment)
// 2. Hospital Emergency Room Analytics (Power BI, SQL, DAX)
// 3. NOVA AI Assistant (React.js, Node.js, Express.js, Groq API)
// 4. CSV Insight Dashboard (JavaScript, PapaParse, Chart.js)
// 5. HR Analytics PowerBI (Power BI, DAX, Excel)
// 6. TextUtils React (React.js, Vercel)
// -------------------------------------------------------------
export const featuredProjects = [
  {
    id: "ecommerce-store",
    title: "E-Commerce Web Application",
    tagline: "Full-Featured Online Storefront & Dynamic Checkout",
    badge: "Flagship Project • Live on Vercel",
    description: "Developed a responsive e-commerce web platform using React.js. Engineered interactive product catalogs, dynamic category filtering, a real-time shopping cart system, and an intuitive checkout flow. Optimized frontend load speeds and device responsiveness across mobile, tablet, and desktop viewports.",
    category: "Web Development",
    categories: ["React Projects", "Frontend Projects"],
    period: "2025 – 2026",
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Vercel"],
    githubUrl: "https://github.com/Imran123-code/E-commerce",
    liveUrl: "https://e-commerce-liart-eta-74.vercel.app",
    featured: true,
    isFlagship: true,
    keyMetrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Stack", value: "React + ES6" },
      { label: "UI Status", value: "100% Responsive" }
    ],
    highlight: "Verified Live Deployment • Production Architecture"
  },
  {
    id: "hospital-er",
    title: "Hospital Emergency Room Analytics",
    tagline: "Healthcare BI & Patient Throughput Intelligence",
    badge: "Power BI • SQL • DAX",
    description: "Comprehensive healthcare business intelligence model analyzing patient wait times, triage priority levels, hospital bed occupancy rates, and emergency admission bottlenecks. Formulated DAX metrics and SQL queries to optimize clinical resource allocation and patient flow.",
    category: "Data Analytics",
    categories: ["Data Analysis", "SQL Projects"],
    period: "2025",
    technologies: ["Power BI", "SQL", "DAX", "Data Analytics"],
    githubUrl: "https://github.com/Imran123-code/Hospital-Emergency-Room-Analytics",
    liveUrl: null,
    featured: true,
    keyMetrics: [
      { label: "Domain", value: "Healthcare BI" },
      { label: "Query Engine", value: "SQL & DAX" },
      { label: "Tool", value: "Power BI" }
    ],
    highlight: "Business Intelligence Portfolio • Healthcare Analytics"
  },
  {
    id: "nova-ai",
    title: "NOVA AI Virtual Assistant",
    tagline: "Intelligent Conversational Agent Powered by Groq API",
    badge: "Full-Stack AI Integration",
    description: "Created an AI-powered virtual assistant capable of answering questions and generating intelligent responses in real time. Developed the responsive frontend with React.js and the backend server with Node.js and Express.js, integrating the Groq API for ultra-low latency inference.",
    category: "AI & Machine Learning",
    categories: ["Full-Stack Projects", "React Projects", "Frontend Projects"],
    period: "Ongoing",
    technologies: ["React.js", "JavaScript", "Node.js", "Express.js", "Groq API"],
    githubUrl: "https://github.com/Imran123-code/NOVA-AI",
    liveUrl: null,
    featured: true,
    keyMetrics: [
      { label: "Architecture", value: "React + Node.js" },
      { label: "AI Engine", value: "Groq API" },
      { label: "Speed", value: "Real-Time" }
    ],
    highlight: "Starred GitHub Project • AI Conversational Agent"
  },
  {
    id: "csv-insights",
    title: "CSV Insight Dashboard",
    tagline: "Client-Side Automated Data Analytics & Visualization",
    badge: "Data Analytics • Chart.js",
    description: "Developed an AI-assisted data analytics dashboard utilizing HTML, CSS, JavaScript, PapaParse, and Chart.js. Features automated client-side CSV parsing, data profiling, summary statistics, correlation views, and intelligent visual chart generation with instant JSON export capabilities.",
    category: "Data Analytics",
    categories: ["Data Analysis", "Frontend Projects"],
    period: "2025",
    technologies: ["JavaScript", "HTML5", "CSS3", "PapaParse", "Chart.js"],
    githubUrl: "https://github.com/Imran123-code/CSV-insights-Dashboard",
    liveUrl: null,
    featured: true,
    keyMetrics: [
      { label: "Parser", value: "PapaParse" },
      { label: "Visuals", value: "Chart.js" },
      { label: "Export", value: "JSON & Charts" }
    ],
    highlight: "Resume Featured • Client-Side Statistical Profiling"
  },
  {
    id: "hr-analytics",
    title: "HR Analytics PowerBI Dashboard",
    tagline: "Enterprise Workforce Demographics & Attrition Insights",
    badge: "Power BI • Executive BI",
    description: "Interactive Power BI business intelligence dashboard providing deep analytics on employee attrition causes, salary distribution curves, departmental performance ratings, and retention factors to assist strategic workforce planning.",
    category: "Data Analytics",
    categories: ["Data Analysis"],
    period: "2025",
    technologies: ["Power BI", "DAX", "Excel", "Data Modeling"],
    githubUrl: "https://github.com/Imran123-code/HR-Analytics-PowerBI",
    liveUrl: null,
    featured: true,
    keyMetrics: [
      { label: "Domain", value: "Enterprise HR" },
      { label: "Insights", value: "Attrition Modeling" },
      { label: "Visualization", value: "Executive BI" }
    ],
    highlight: "Executive Analytics • Business Intelligence"
  },
  {
    id: "textutils",
    title: "TextUtils React",
    tagline: "Real-Time Text Processing & Analytical Utility",
    badge: "React.js • Live on Vercel",
    description: "Developed a text utility web application using React.js. Implemented live text transformation features including case conversion, word counting, reading time estimation, character analysis, and responsive interactive controls with clean dark mode UI.",
    category: "Web Development",
    categories: ["React Projects", "Frontend Projects"],
    period: "2025",
    technologies: ["React.js", "JavaScript", "CSS3", "Vercel"],
    githubUrl: "https://github.com/Imran123-code/Textutils-React",
    liveUrl: "https://textutils-react-chi-pearl.vercel.app",
    featured: true,
    keyMetrics: [
      { label: "Framework", value: "React.js" },
      { label: "Analysis", value: "Real-Time" },
      { label: "Deployment", value: "Vercel" }
    ],
    highlight: "Live on Vercel • Component Architecture"
  }
];

// -------------------------------------------------------------
// ALL REMAINING VERIFIED PROJECTS (Strictly Ordered by Strength & Relevance)
// Completely excludes:
// 2302030400035, object-oriented, Portfolio, imran-s-portfolio,
// Event SOU, 2302030400035 WT UI UX SEM4, MovieVault (both versions),
// BillNest, and all Prodigy repositories.
// -------------------------------------------------------------
export const allVerifiedProjects = [
  ...featuredProjects,
  {
    id: "resourcehub",
    title: "ResourceHub",
    tagline: "Academic & Developer Resource Directory",
    description: "A centralized resource curation portal built with React.js providing categorized developer tools, reference guides, study notes, and search filters with a sleek dark-mode interface.",
    category: "Web Development",
    categories: ["React Projects", "Frontend Projects"],
    period: "2025",
    technologies: ["React.js", "JavaScript", "HTML5", "Vercel"],
    githubUrl: "https://github.com/Imran123-code/ResourceHub",
    liveUrl: "https://resource-hub-ten-pied.vercel.app"
  },
  {
    id: "neetprep",
    title: "NEETPrep Exam Engine",
    tagline: "Interactive Practice & Test Module",
    description: "Timed testing platform featuring question navigation, score calculation, instant answer feedback, and subject-wise analytics with a responsive test interface.",
    category: "Web Development",
    categories: ["React Projects", "Frontend Projects"],
    period: "2025",
    technologies: ["React.js", "JavaScript", "Vercel"],
    githubUrl: "https://github.com/Imran123-code/NEETPrep",
    liveUrl: "https://neet-prep-seven.vercel.app"
  },
  {
    id: "uber-analytics",
    title: "Uber Ride Analytics",
    tagline: "Urban Mobility & Trip Demand Patterns",
    description: "Exploratory data analytics project investigating peak ride demand hours, price surges, route densities, and ride completion ratios using SQL and Python.",
    category: "Data Analytics",
    categories: ["Data Analysis", "Python Projects", "SQL Projects"],
    period: "2025",
    technologies: ["SQL", "Data Analytics", "Python", "Visualization"],
    githubUrl: "https://github.com/Imran123-code/Uber-Ride-Analytics",
    liveUrl: null
  },
  {
    id: "voice-assistant",
    title: "Voice Assistant",
    tagline: "Speech-to-Text & Desktop Automation",
    description: "Designed a Python voice assistant with speech-to-text and text-to-speech capabilities for hands-free desktop interaction, system commands, and web queries.",
    category: "Python",
    categories: ["Python Projects"],
    period: "2025",
    technologies: ["Python", "Speech Recognition", "Automation"],
    githubUrl: "https://github.com/Imran123-code/voice-assistant-",
    liveUrl: null
  },
  {
    id: "expense-tracker",
    title: "Expense Management System",
    tagline: "Python & MySQL Financial Tracking",
    description: "Python and MySQL database application to record, manage, and analyze daily expenses with SQL transactions and monthly expense summaries.",
    category: "Python",
    categories: ["Python Projects", "SQL Projects", "Data Analysis"],
    period: "2024",
    technologies: ["Python", "SQL", "MySQL", "Data Analytics"],
    githubUrl: "https://github.com/Imran123-code/Expances-management-system",
    liveUrl: null
  },
  {
    id: "ai-detection",
    title: "AI-Based Detection System",
    tagline: "Computer Vision & Object Recognition",
    description: "Python computer vision and pattern detection pipeline designed for accurate object recognition and classification using deep learning techniques.",
    category: "AI & Machine Learning",
    categories: ["Python Projects"],
    period: "2025",
    technologies: ["Python", "Computer Vision", "AI/ML"],
    githubUrl: "https://github.com/Imran123-code/Ai-based-detection-system-",
    liveUrl: null
  },
  {
    id: "weather-app",
    title: "Weather Forecast Application",
    tagline: "Live Meteorological Conditions & Forecasts",
    description: "Created a weather application using JavaScript and weather API integration. Displays real-time temperature, weather conditions, and location-based forecasts.",
    category: "Web Development",
    categories: ["Frontend Projects"],
    period: "2025",
    technologies: ["JavaScript", "Weather API", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Imran123-code/weather-App-",
    liveUrl: null
  },
  {
    id: "todo-app",
    title: "Task Management To-Do App",
    tagline: "Task Tracker with Add/Edit/Delete Operations",
    description: "Task management web application supporting task creation, status toggles, deletion, and local state persistence.",
    category: "Web Development",
    categories: ["Frontend Projects"],
    period: "2025",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Imran123-code/TO-DO-LIST",
    liveUrl: null
  },
  {
    id: "calculator-app",
    title: "Interactive Calculator",
    tagline: "Arithmetic Computation Engine",
    description: "Web calculator performing basic arithmetic operations with clear display controls and keyboard event handling.",
    category: "Web Development",
    categories: ["Frontend Projects"],
    period: "2025",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Imran123-code/calculator",
    liveUrl: null
  },
  {
    id: "stopwatch-app",
    title: "Stopwatch Application",
    tagline: "Precision Timer with Lap Capabilities",
    description: "Lightweight stopwatch utility with start, pause, reset functionality, and accurate millisecond tracking.",
    category: "Web Development",
    categories: ["Frontend Projects"],
    period: "2025",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Imran123-code/stopwatch-app",
    liveUrl: null
  },
  {
    id: "youtube-clone",
    title: "YouTube Interface Clone",
    tagline: "Video Streaming Platform UI",
    description: "Designed a responsive YouTube-inspired homepage using HTML and CSS featuring video grid cards, sidebar navigation, and header controls.",
    category: "Web Development",
    categories: ["Frontend Projects"],
    period: "2025",
    technologies: ["HTML5", "CSS3", "Responsive Design"],
    githubUrl: "https://github.com/Imran123-code/YouTube-clone",
    liveUrl: null
  }
];

// Experience from Resume
export const experienceData = [
  {
    role: "Software Engineering Student & Practical Projects",
    organization: "Aditya Silver Oak University",
    location: "Ahmedabad, India",
    period: "2023 – Present",
    type: "Academic & Practical Experience",
    badge: "Undergraduate Track (2023–2027)",
    description: "Building production-ready web applications, conducting data analytics research, and designing database systems as part of Bachelor of Engineering coursework.",
    responsibilities: [
      "Developed frontend projects using HTML, CSS, JavaScript, and React.js with mobile-first responsive architecture.",
      "Collaborated in team projects and contributed to project planning, system architecture, and interface design.",
      "Engineered full-stack solutions and AI assistants integrating external REST endpoints and Groq API.",
      "Conducted extensive data analytics and business intelligence studies using Power BI, SQL, and Excel."
    ],
    skills: ["Python", "JavaScript", "React.js", "SQL", "HTML5", "CSS3", "Git & GitHub", "Power BI", "Excel"]
  },
  {
    role: "Open Source Contributor & Independent Developer",
    organization: "GitHub Community (@Imran123-code)",
    location: "Remote",
    period: "2024 – Present",
    type: "Open Source",
    badge: "40+ Public Repositories",
    description: "Designing, building, and deploying real-world software applications, analytical dashboards, and AI tools for users worldwide.",
    responsibilities: [
      "Authored and published 40+ open-source repositories covering React applications, Python automation, and data models.",
      "Successfully deployed multiple responsive applications to Vercel (E-Commerce Website, ResourceHub, TextUtils, NEETPrep).",
      "Created Python automation scripts including voice recognition assistants and MySQL-backed financial trackers.",
      "Maintained clean version control practices using Git workflows and structured documentation."
    ],
    skills: ["React.js", "Python", "JavaScript", "SQL", "Git", "GitHub", "Vercel", "Data Analytics"]
  }
];

// Dedicated Certificates & Accreditations (Source of Truth: Uploaded Screenshots + LinkedIn)
export const certificationsData = [
  {
    id: "cert-power-bi-simplilearn",
    title: "Power BI for Beginners",
    organization: "Simplilearn | SkillUp (Powered by Microsoft)",
    issuer: "Simplilearn & Microsoft",
    issueDate: "16th September 2026",
    year: "2026",
    credentialId: "10740932",
    credentialUrl: null,
    image: "/certificates/powerbi-simplilearn.png",
    badge: "Powered by Microsoft",
    category: "Power BI",
    categories: ["Power BI", "Data Analytics"],
    skills: ["Power BI Desktop", "Data Modeling", "Business Intelligence", "Interactive Reports"],
    description: "Demonstrated initiative and commitment to deepening skills and advancing career in business intelligence, automated data modeling, and interactive reporting.",
    signatory: "Krishna Kumar, CEO, Simplilearn",
    source: "screenshot",
    orgLogo: "microsoft"
  },
  {
    id: "cert-excel-dashboard-simplilearn",
    title: "Excel Dashboard for Beginners",
    organization: "Simplilearn | SkillUp (Powered by Microsoft)",
    issuer: "Simplilearn & Microsoft",
    issueDate: "22nd September 2026",
    year: "2026",
    credentialId: "10770646",
    credentialUrl: null,
    image: "/certificates/excel-simplilearn.png",
    badge: "Powered by Microsoft",
    category: "Excel",
    categories: ["Excel", "Data Analytics"],
    skills: ["Excel Dashboards", "Data Analytics", "KPI Dashboards", "Spreadsheet Modeling"],
    description: "Demonstrated initiative and commitment to deepening skills and advancing career in spreadsheet data visualization, KPI executive summaries, and dashboard design.",
    signatory: "Krishna Kumar, CEO, Simplilearn",
    source: "screenshot",
    orgLogo: "microsoft"
  },
  {
    id: "cert-scaler-javascript",
    title: "JavaScript Course With Certification: Unlocking the Power of JavaScript",
    organization: "Scaler Topics",
    issuer: "Scaler Topics",
    issueDate: "21 May 2026",
    year: "2026",
    credentialId: "SCALER-JS-2026",
    credentialUrl: "https://www.scaler.com/topics/course/javascript/",
    image: "/certificates/scaler-javascript.png",
    badge: "Certificate of Excellence",
    category: "Other",
    categories: ["Other"],
    skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming", "Web APIs"],
    description: "Certificate of Excellence awarded for completion of the JavaScript course covering 70 video tutorials, 9 modules, and 8 challenges. Issued by Anshuman Singh, Co-founder of Scaler.",
    signatory: "Anshuman Singh, Co-founder, Scaler",
    source: "screenshot",
    orgLogo: "scaler"
  },
  {
    id: "cert-edunet-shell-aicte",
    title: "Green Skills and Artificial Intelligence — Skills4Future Program",
    organization: "Edunet Foundation, AICTE & Shell India",
    issuer: "Edunet, AICTE & Shell",
    issueDate: "March 2026",
    year: "2026",
    credentialId: "S4F25_212824",
    credentialUrl: "https://edunetfoundation.org",
    image: "/certificates/edunet-shell-aicte.png",
    badge: "Government & Industry Accredited",
    category: "AI / Machine Learning",
    categories: ["AI / Machine Learning", "Other"],
    skills: ["Artificial Intelligence", "Green Skills", "Sustainable Tech", "Machine Learning"],
    description: "Foundation course on Green Skills and Artificial Intelligence under the Skills4Future Program at Silver Oak University. Jointly certified by Edunet Foundation, AICTE, and Shell India Markets Pvt Ltd.",
    signatory: "Nagesh Singh (Edunet), Dr. Buddha Chandrasekhar (AICTE), Neha Chauhan (Shell)",
    source: "screenshot",
    orgLogo: "shell"
  },
  {
    id: "cert-tata-forage-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    organization: "Tata Group & Forage",
    issuer: "Tata Group & Forage",
    issueDate: "March 1st, 2026",
    year: "2026",
    credentialId: "12530qs5g9023LaD",
    credentialUrl: "https://www.theforage.com/simulations/tata/data-analytics-genai",
    image: "/certificates/tata-forage-genai.png",
    badge: "Corporate Job Simulation",
    category: "Data Analytics",
    categories: ["Data Analytics", "AI / Machine Learning"],
    skills: ["Data Analytics", "Generative AI", "Exploratory Data Analysis", "Risk Profiling", "Predictive Modeling", "Business Reporting"],
    description: "Hands-on corporate job simulation (Feb-Mar 2026) covering exploratory data analysis and risk profiling, predicting delinquency with AI, business report and data storytelling for collections strategy, and implementing an AI-driven collections strategy.",
    signatory: "Tom Brunskill, Co-Founder of Forage",
    source: "screenshot",
    orgLogo: "tata"
  },
  {
    id: "cert-ibm-rag",
    title: "Introduction to Retrieval-Augmented Generation (RAG)",
    organization: "IBM SkillsBuild",
    issuer: "IBM SkillsBuild",
    issueDate: "2026",
    year: "2026",
    credentialId: "IBM-RAG-2026",
    credentialUrl: "https://skillsbuild.org",
    image: "/certificates/ibm-rag-badge.png",
    badge: "IBM SkillsBuild Badge",
    category: "AI / Machine Learning",
    categories: ["AI / Machine Learning"],
    skills: ["Retrieval-Augmented Generation", "Generative AI", "Large Language Models", "Vector Databases", "AI Architecture"],
    description: "Digital badge awarded by IBM SkillsBuild for completing the Introduction to Retrieval-Augmented Generation course, covering RAG architecture, LLM grounding, vector search, and practical AI implementation.",
    signatory: "IBM SkillsBuild",
    source: "screenshot",
    orgLogo: "ibm"
  },

  {
    id: "cert-kalpvruksh-rapidweb",
    title: "RapidWeb Challenge — Kalpvruksh 2.0 Multidisciplinary Conclave",
    organization: "Silver Oak University — College of Engineering & Technology",
    issuer: "Silver Oak University",
    issueDate: "10-13 September 2026",
    year: "2026",
    credentialId: "SOU/KALPVRUKSH2.0/CRT2026215145",
    credentialUrl: null,
    image: "/certificates/kalpvruksh-rapidweb.png",
    badge: "University Tech Conclave",
    category: "Other",
    categories: ["Other"],
    skills: ["Web Development", "Rapid Prototyping", "Frontend Engineering", "Competitive Programming"],
    description: "Certificate of Participation awarded for active participation in the RapidWeb Challenge at Kalpvruksh 2.0 Multidisciplinary Conclave, organized by Silver Oak University College of Engineering & Technology (Sep 10-13, 2026).",
    signatory: "Event Coordinator, Core Committee Member & Registrar, Silver Oak University",
    source: "screenshot",
    orgLogo: "sou"
  }
];

export const achievementsData = [
  {
    title: "Multiple Production Web Applications",
    description: "Completed and deployed multiple responsive web applications using HTML, CSS, JavaScript, and React.js onto Vercel."
  },
  {
    title: "Industry Certifications in AI & Data Analytics",
    description: "Earned recognized certifications in Artificial Intelligence (Shell India, AICTE & Edunet) and GenAI Data Analytics (Tata Group & Forage)."
  },
  {
    title: "Active Open-Source Contributor",
    description: "Established a robust portfolio of 40+ public GitHub repositories spanning frontend engineering, automation, and analytics."
  },
  {
    title: "Demonstrated Technical Problem-Solving",
    description: "Demonstrated proficiency in Python, JavaScript, React.js, and SQL through problem-solving exercises, database management, and data analysis applications."
  }
];
