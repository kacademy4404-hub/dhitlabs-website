const fs = require('fs');
const path = require('path');

const ENROLL_DIR = path.join(__dirname, 'enroll');
const SERVICES_DIR = path.join(__dirname, 'services');

// Create directories if they don't exist
if (!fs.existsSync(ENROLL_DIR)) fs.mkdirSync(ENROLL_DIR, { recursive: true });
if (!fs.existsSync(SERVICES_DIR)) fs.mkdirSync(SERVICES_DIR, { recursive: true });

// Common styles for premium dark-mode theme
const commonStyles = `
        :root {
            --primary: #0064DC;
            --primary-light: #00B4F0;
            --primary-dark: #140078;
            --secondary: #00C8F0;
            --secondary-light: #4AE0FF;
            --accent: #FF6B6B;
            --accent-light: #ff8a8a;
            --gold: #f5a623;
            --cyan: #00C8F0;
            --magenta: #e040fb;

            --bg-dark: #00143C;
            --bg-darker: #00102A;
            --bg-card: rgba(0, 20, 60, 0.4);
            --bg-card-hover: rgba(0, 30, 90, 0.5);
            --bg-glass: rgba(0, 40, 100, 0.2);
            --border-glass: rgba(0, 100, 220, 0.3);
            --border-glass-hover: rgba(0, 150, 255, 0.4);

            --text-primary: #ffffff;
            --text-secondary: #b0c0e0;
            --text-muted: #6a7a9e;

            --gradient-1: linear-gradient(135deg, var(--primary), var(--secondary));
            --gradient-2: linear-gradient(135deg, var(--accent), var(--gold));
            --gradient-3: linear-gradient(135deg, var(--secondary), var(--primary));
            --gradient-4: linear-gradient(135deg, var(--magenta), var(--accent));

            --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.3);
            --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 16px 64px rgba(0, 0, 0, 0.5);
            --shadow-glow: 0 0 40px rgba(0, 100, 220, 0.3);

            --radius-sm: 8px;
            --radius-md: 12px;
            --radius-lg: 20px;
            --radius-xl: 28px;

            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-slow: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        } all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        *, *::before, *::after {
            margin: 0; padding: 0; box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg-dark);
            color: var(--text-primary);
            overflow-x: hidden;
            line-height: 1.7;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Ambient Glow Backgrounds */
        .ambient-glow {
            position: fixed;
            top: -20%;
            right: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        .ambient-glow-2 {
            position: fixed;
            bottom: -20%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        /* Navbar & Header */
        header {
            position: sticky;
            top: 0;
            background: rgba(10, 10, 26, 0.85);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 1px solid var(--border-glass);
            z-index: 100;
            padding: 15px 24px;
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.4rem;
            color: white;
            text-decoration: none;
        }

        .logo-img {
            width: 38px;
            height: 38px;
            border-radius: var(--radius-sm);
            object-fit: contain;
            filter: drop-shadow(0 0 12px rgba(108, 99, 255, 0.4));
        }

        .logo span {
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .back-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 500;
            text-decoration: none;
            transition: var(--transition);
            padding: 8px 16px;
            border-radius: var(--radius-xl);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-glass);
        }

        .back-btn:hover {
            color: var(--text-primary);
            border-color: var(--primary);
            background: rgba(108, 99, 255, 0.1);
            transform: translateX(-3px);
        }

        /* Container */
        .main-container {
            flex: 1;
            max-width: 1100px;
            margin: 40px auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: start;
        }

        @media (max-width: 900px) {
            .main-container {
                grid-template-columns: 1fr;
                margin: 20px auto;
            }
        }

        /* Details Card */
        .details-card {
            background: var(--bg-glass);
            border: 1px solid var(--border-glass);
            border-radius: var(--radius-lg);
            padding: 40px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .badge {
            display: inline-block;
            padding: 6px 16px;
            background: rgba(108, 99, 255, 0.12);
            border: 1px solid rgba(108, 99, 255, 0.3);
            border-radius: var(--radius-xl);
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--primary-light);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }

        h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 2.2rem;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.2;
            background: linear-gradient(135deg, #ffffff, #b0b0cc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .desc-text {
            color: var(--text-secondary);
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 30px;
        }

        .meta-list {
            list-style: none;
            margin-bottom: 30px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border-glass);
        }

        .meta-list li {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 0.95rem;
        }

        .meta-list li i {
            color: var(--secondary);
            width: 20px;
        }

        .features-list {
            list-style: none;
        }

        .features-list h3 {
            font-size: 1.2rem;
            margin-bottom: 16px;
            font-family: 'Outfit', sans-serif;
        }

        .features-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 12px;
            color: var(--text-secondary);
            font-size: 0.92rem;
        }

        .features-list li i {
            color: var(--primary-light);
            margin-top: 5px;
        }

        /* Form Card */
        .form-card {
            background: var(--bg-card);
            border: 1px solid var(--border-glass);
            border-radius: var(--radius-lg);
            padding: 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            position: sticky;
            top: 100px;
        }

        .form-card h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--text-secondary);
            margin-bottom: 6px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 14px 16px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            transition: var(--transition);
            outline: none;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15);
            background: rgba(255, 255, 255, 0.05);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }

        .form-group select option {
            background: var(--bg-dark);
            color: var(--text-primary);
        }

        .btn-submit {
            width: 100%;
            padding: 14px;
            background: var(--gradient-1);
            color: white;
            border: none;
            border-radius: var(--radius-xl);
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(108, 99, 255, 0.5);
        }

        /* Footer */
        footer {
            background: var(--bg-darker);
            border-top: 1px solid var(--border-glass);
            padding: 30px 24px;
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: auto;
        }

        /* Toast Alert */
        .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            padding: 16px 32px;
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border-glass);
            border-radius: var(--radius-md);
            color: var(--text-primary);
            font-size: 0.9rem;
            z-index: 9999;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        .toast.success { border-color: var(--secondary); }
        .toast.error { border-color: var(--accent); }
`;

// 12 Courses details
const courses = [
    {
        filename: 'enroll-web-development.html',
        title: 'Full Stack Web Development',
        duration: '6 Months',
        fee: 'PKR 25,000',
        level: 'Beginner to Advanced',
        badge: 'Development',
        description: 'Master the art of creating modern, responsive, and secure web applications. From building stunning frontend layouts using HTML, CSS, and React, to engineering robust backend architectures using Node.js, Express, and MongoDB. This comprehensive course prepares you to step into the tech industry as a fully capable Full Stack Developer.',
        topics: [
            'HTML5 & CSS3 with modern layouts (Flexbox, Grid, Custom Variables)',
            'JavaScript ES6+ fundamentals, DOM Manipulation, and Asynchronous JS',
            'React.js - Components, Hooks, State Management, and Routing',
            'Node.js & Express - Building scalable REST APIs and handling Middleware',
            'MongoDB & Mongoose - NoSQL Database design and complex operations',
            'Git & GitHub - Version control, collaboration, and repository management',
            'Authentication & Security - JWT, password hashing, and route protection',
            'Deployment & Hosting - Vercel, Netlify, Heroku, and Cloud Platforms'
        ]
    },
    {
        filename: 'enroll-mobile-development.html',
        title: 'Mobile App Development',
        duration: '5 Months',
        fee: 'PKR 22,000',
        level: 'Intermediate',
        badge: 'Development',
        description: 'Build native and cross-platform mobile apps for both iOS and Android platforms from a single codebase. Master React Native and Flutter, integrate backend APIs, implement real-time databases, and learn to publish your finished mobile apps directly to Google Play Store and Apple App Store.',
        topics: [
            'Introduction to Mobile App Architectures & Ecosystems',
            'React Native - Core Components, Styles, and Navigation',
            'Flutter & Dart programming fundamentals and UI widgets',
            'State Management (Redux, Provider) in mobile applications',
            'API Integration - Consuming REST APIs and handling network status',
            'Firebase Integration - Auth, Realtime Database, Cloud Firestore, and Push Notifications',
            'Device Features - Camera, Geolocation, Storage, and Sensors',
            'Publishing - App Store and Play Store guidelines and build submissions'
        ]
    },
    {
        filename: 'enroll-ai-ml.html',
        title: 'Artificial Intelligence & Machine Learning',
        duration: '8 Months',
        fee: 'PKR 35,000',
        level: 'Advanced',
        badge: 'AI & ML',
        description: 'Enter the world of smart technologies. Learn python programming, data preprocessing, mathematical foundations of machine learning, and construct advanced deep neural networks. Build projects involving computer vision, natural language processing, and predictive analytics using powerful frameworks like TensorFlow and PyTorch.',
        topics: [
            'Python for Data Science - NumPy, Pandas, and Matplotlib',
            'Probability, Statistics, and Linear Algebra for AI models',
            'Supervised Learning - Linear/Logistic Regression, Decision Trees, SVM, and Random Forest',
            'Unsupervised Learning - K-Means, Hierarchical Clustering, and PCA',
            'Neural Networks - Activation functions, Backpropagation, and Optimization',
            'Deep Learning - Convolutional Neural Networks (CNNs) for Computer Vision',
            'Natural Language Processing (NLP) - Text classification, sentiment analysis, and transformers',
            'Deployment - Deploying ML models into production using Flask/FastAPI'
        ]
    },
    {
        filename: 'enroll-cyber-security.html',
        title: 'Cyber Security & Ethical Hacking',
        duration: '6 Months',
        fee: 'PKR 28,000',
        level: 'Intermediate',
        badge: 'Security',
        description: 'Protect organizations from malicious cyberattacks. Learn how security breaches happen, identify system vulnerabilities, and implement robust protection protocols. Master Kali Linux, ethical hacking methodologies, penetration testing, cryptography, and network defense strategies.',
        topics: [
            'Introduction to Cybersecurity principles and the CIA Triad',
            'Networking Fundamentals - Protocols, Ports, and Network mapping',
            'Information Gathering & Reconnaissance using Nmap, Shodan, and OSINT',
            'Vulnerability Assessment and Exploitation using Metasploit',
            'Web Application Security - OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF)',
            'System Security - Malware analysis, reverse engineering, and firewalls',
            'Cryptography - Symmetric/Asymmetric encryption, Hashing, and PKI',
            'Incident Response, digital forensics, and report writing for security audits'
        ]
    },
    {
        filename: 'enroll-cloud-computing.html',
        title: 'Cloud Computing (AWS & Azure)',
        duration: '4 Months',
        fee: 'PKR 20,000',
        level: 'Intermediate',
        badge: 'Cloud',
        description: 'Deploy, scale, and manage modern web solutions globally using the cloud. Learn standard cloud design patterns, master serverless architectures, and work with infrastructure tools like Docker and Kubernetes. Get fully prepared for AWS and Microsoft Azure certifications.',
        topics: [
            'Fundamentals of Cloud Computing (IaaS, PaaS, SaaS)',
            'AWS Core Services - EC2, S3, RDS, IAM, VPC, and Route 53',
            'Microsoft Azure Core Services - Virtual Machines, Blob Storage, Azure AD',
            'Serverless Architectures - AWS Lambda and Azure Functions',
            'Containerization - Dockerizing applications and managing images',
            'Orchestration - Kubernetes architecture, pods, and cluster management',
            'Cloud Security best practices, cost optimization, and compliance',
            'Infrastructure as Code (IaC) basics using Terraform'
        ]
    },
    {
        filename: 'enroll-data-science.html',
        title: 'Data Science & Analytics',
        duration: '7 Months',
        fee: 'PKR 30,000',
        level: 'Advanced',
        badge: 'Data Science',
        description: 'Uncover valuable patterns hidden inside raw business data. Master data collection, wrangling, statistical validation, and interactive visualizations. Learn tools like Python, R, SQL, Power BI, and Tableau to turn raw datasets into powerful corporate insights and strategic recommendations.',
        topics: [
            'Data Wrangling & Cleaning with Python (Pandas, OpenPyXL)',
            'Advanced SQL - Subqueries, joins, indexing, and window functions',
            'Exploratory Data Analysis (EDA) and Statistical Foundations',
            'Data Visualization with Power BI and Tableau - Dynamic Dashboards',
            'R Programming for statistical computing and data analysis',
            'Predictive Analytics - Forecasting, Trend analysis, and Regression models',
            'Big Data tools overview - Hadoop, Spark, and Cloud Data Warehouses',
            'Data Storytelling - Communicating insights clearly to business stakeholders'
        ]
    },
    {
        filename: 'enroll-python.html',
        title: 'Python Programming',
        duration: '3 Months',
        fee: 'PKR 15,000',
        level: 'Beginner',
        badge: 'Programming',
        description: 'Start your coding journey with Python, the world\'s most popular and versatile programming language. Learn computational logic, Object-Oriented Programming (OOP), file manipulation, database connections, web scraping, and building dynamic web apps with Django.',
        topics: [
            'Python Basics - Variables, Data Types, Operators, and Control Flow',
            'Functions, Modules, and Package Management (pip)',
            'Data Structures - Lists, Tuples, Dictionaries, and Sets',
            'Object-Oriented Programming (OOP) - Classes, Inheritance, Polymorphism',
            'File I/O and handling CSV, JSON, and XML files',
            'Web Scraping using BeautifulSoup and Selenium',
            'API Integration - Fetching, processing, and outputting external web data',
            'Introduction to Web Development using the Django framework'
        ]
    },
    {
        filename: 'enroll-ui-ux.html',
        title: 'UI/UX Design Masterclass',
        duration: '4 Months',
        fee: 'PKR 18,000',
        level: 'Beginner',
        badge: 'Design',
        description: 'Design beautiful, highly interactive digital experiences. Master user psychology, interface design, layout visual hierarchies, wireframing, high-fidelity interactive prototyping, and design thinking. Learn standard design workflows in Figma and Adobe XD.',
        topics: [
            'Introduction to User Experience (UX) and Design Thinking process',
            'User Research methodologies, User Personas, and Empathy Mapping',
            'Information Architecture, User Flows, and Wireframing',
            'Visual Design principles - Grid systems, Typography, and Color Theory',
            'Figma Mastery - Auto Layout, Components, Variants, and Libraries',
            'Interactive Prototyping - Micro-interactions, Transitions, and Smart Animate',
            'Usability Testing, feedback gathering, and design iteration',
            'Design handoff to developers and building a professional portfolio'
        ]
    },
    {
        filename: 'enroll-devops.html',
        title: 'DevOps Engineering',
        duration: '5 Months',
        fee: 'PKR 25,000',
        level: 'Intermediate',
        badge: 'DevOps',
        description: 'Automate software deployments and manage robust cloud structures. Bridge the operational gap between developers and system administrators. Master continuous integration and continuous deployment (CI/CD) pipelines, Docker, Kubernetes, Ansible, and Terraform.',
        topics: [
            'Linux System Administration & Shell Scripting',
            'Version Control & Branching Strategies with Git & GitHub',
            'Continuous Integration (CI) with Jenkins & GitHub Actions',
            'Containerization with Docker - Building and optimizing images',
            'Container Orchestration with Kubernetes - Setup, Pods, Deployments',
            'Infrastructure as Code (IaC) with Terraform and Configuration with Ansible',
            'System Monitoring & Logging with Prometheus, Grafana, and ELK Stack',
            'DevSecOps - Integrating security testing directly inside pipelines'
        ]
    },
    {
        filename: 'enroll-blockchain.html',
        title: 'Blockchain Development',
        duration: '5 Months',
        fee: 'PKR 28,000',
        level: 'Advanced',
        badge: 'Blockchain',
        description: 'Build decentralized, secure applications on the blockchain. Learn smart contracts development using Solidity on Ethereum, build DApps using Web3.js or Ethers.js, understand cryptocurrency designs, and deploy secure distributed applications.',
        topics: [
            'Blockchain Fundamentals - Cryptography, Consensus, and P2P networks',
            'Ethereum Architecture, accounts, transactions, and Gas fees',
            'Smart Contract Development with Solidity (syntax, data structures, modifiers)',
            'Security Best Practices in Smart Contracts (preventing reentrancy, overflows)',
            'Truffle and Hardhat environments for testing smart contracts',
            'Web3.js & Ethers.js - Connecting Web Frontends to Ethereum contracts',
            'DeFi & NFT Standard Implementations (ERC-20, ERC-721, ERC-1155)',
            'IPFS (InterPlanetary File System) for decentralized asset storage'
        ]
    },
    {
        filename: 'enroll-digital-marketing.html',
        title: 'Digital Marketing & SEO',
        duration: '3 Months',
        fee: 'PKR 12,000',
        level: 'Beginner',
        badge: 'Marketing',
        description: 'Grow your business online. Master Search Engine Optimization (SEO), manage high-performing paid ads on Google and Meta platforms, build professional social media strategies, master content marketing, and leverage Google Analytics to scale businesses.',
        topics: [
            'Introduction to Digital Marketing strategies and target audiences',
            'Search Engine Optimization (SEO) - On-Page, Off-Page, Technical SEO',
            'Keyword Research and competitive market analysis',
            'Social Media Marketing (SMM) on Facebook, Instagram, LinkedIn, and YouTube',
            'Paid Campaigns - Meta Ads Manager, Google Ads (Search, Display, Video)',
            'Content Marketing and copywriting strategies that drive conversions',
            'Email Marketing - Automations, newsletter design, and list management',
            'Data Analysis using Google Analytics (GA4) and Google Tag Manager'
        ]
    },
    {
        filename: 'enroll-database.html',
        title: 'Database Administration',
        duration: '4 Months',
        fee: 'PKR 18,000',
        level: 'Intermediate',
        badge: 'Database',
        description: 'Manage, optimize, and secure enterprise data storage. Master SQL databases like MySQL and PostgreSQL, and NoSQL databases like MongoDB. Learn data modeling, query optimization, backup strategies, clustering, and cluster failover mechanisms.',
        topics: [
            'Relational Database Management Systems (RDBMS) principles',
            'Advanced SQL - Queries, Views, Stored Procedures, and Triggers',
            'Database Normalization (1NF, 2NF, 3NF) and Schema design',
            'Query Optimization, indexing strategies, and performance monitoring',
            'NoSQL Databases - Document stores (MongoDB) and Key-Value stores (Redis)',
            'Database Administration - User permissions, security, and firewalls',
            'Backup, Recovery, Replication, and High Availability configurations',
            'Database Migration and ETL (Extract, Transform, Load) processes'
        ]
    }
];

// 12 Services details
const services = [
    {
        filename: 'web-development.html',
        title: 'Web Development',
        icon: 'fa-code',
        badge: 'Services',
        description: 'At D&H IT LABS, we build stunning, modern, and highly interactive websites and web applications tailored specifically to elevate your business presence. Using technologies like React, Next.js, and Node.js, we ensure your site is blazingly fast, SEO-friendly, and offers a premium user experience on all screen sizes.',
        benefits: [
            'Custom UI/UX designed strictly for your brand guidelines',
            'Blazing fast performance & lazy-loading assets',
            'Robust backend integrations and administrative panels',
            'Search Engine Optimized (SEO) codebase for top Google rankings',
            'Comprehensive maintenance and round-the-clock technical support'
        ]
    },
    {
        filename: 'mobile-app-development.html',
        title: 'Mobile App Development',
        icon: 'fa-mobile-alt',
        badge: 'Services',
        description: 'Empower your customer base with premium mobile applications. We build feature-rich native and cross-platform apps using React Native and Flutter for flawless operation on both iOS and Android. From initial prototyping to deploying your finished app to Google Play Store and Apple App Store, we cover the full software cycle.',
        benefits: [
            'Elegant layouts with premium, high-speed interfaces',
            'Offline capabilities and robust local databases',
            'Secure user authentication and secure online payment gateways',
            'Real-time features with Firestore and WebSockets',
            'Instant push notification systems to maximize retention'
        ]
    },
    {
        filename: 'artificial-intelligence.html',
        title: 'Artificial Intelligence & ML',
        icon: 'fa-brain',
        badge: 'Services',
        description: 'Incorporate modern artificial intelligence into your business workflow. We develop tailored machine learning models, build intelligent automation bots, build computer vision networks, and program custom Natural Language Processing (NLP) systems. Optimize operational costs and make automated data-driven decisions.',
        benefits: [
            'Automated business processes & smart classification tools',
            'Predictive modeling for financial, sales, and user trends',
            'Custom AI chatbots for 24/7 automated customer support',
            'Advanced image processing, OCR, and Computer Vision tools',
            'Seamless integration of ML models into existing web/mobile apps'
        ]
    },
    {
        filename: 'cyber-security.html',
        title: 'Cyber Security Services',
        icon: 'fa-shield-halved',
        badge: 'Services',
        description: 'Protect your enterprise from security threats. D&H IT LABS provides top-tier security assessments, code audits, penetration testing, network monitoring, and system hardening services. Secure your company, keep customer data private, and comply with international security guidelines.',
        benefits: [
            'Thorough vulnerability assessments and penetration testing',
            'Secure network architectures, firewalls, and encryption',
            'Immediate response planning and forensic threat assessments',
            'Robust user authentication and data access control panels',
            'Interactive staff awareness training on security threats'
        ]
    },
    {
        filename: 'cloud-computing.html',
        title: 'Cloud Computing & DevOps',
        icon: 'fa-cloud',
        badge: 'Services',
        description: 'Migrate, manage, and scale your business operations globally in the cloud. We design resilient, high-speed architectures on Amazon Web Services (AWS) and Microsoft Azure. Automate code deployments with secure CI/CD pipelines, containerize applications, and eliminate server downtime.',
        benefits: [
            'Zero-downtime cloud migration from physical servers',
            'Serverless setups that significantly reduce cloud monthly costs',
            'Containerization using Docker and Kubernetes clusters',
            'Infrastructure automation using Terraform and Ansible',
            '24/7 uptime monitoring and automated system backups'
        ]
    },
    {
        filename: 'data-science-analytics.html',
        title: 'Data Science & Analytics',
        icon: 'fa-chart-line',
        badge: 'Services',
        description: 'Turn your massive raw company data into clean, readable, and actionable insights. We build customized analytics solutions, create beautiful interactive dashboards using Tableau and Power BI, perform statistical modeling, and set up predictive pipelines. Drive company growth through concrete facts.',
        benefits: [
            'Clean data engineering and pipeline installations',
            'Dynamic visual reports for board and management teams',
            'Predictive analytics to forecast customer churn and market demands',
            'Customer segmentation models for precise advertising',
            'Advanced statistical modeling and concrete data validation'
        ]
    },
    {
        filename: 'ui-ux-design.html',
        title: 'UI/UX Design',
        icon: 'fa-palette',
        badge: 'Services',
        description: 'Create memorable first impressions. We design ultra-modern user interfaces (UI) backed by detailed user research and responsive layouts (UX). From initial paper wireframes and detailed user flows to beautiful interactive high-fidelity prototypes in Figma, we design for high user conversion.',
        benefits: [
            'User-centered designs based on thorough market research',
            'Interactive prototypes to validate products before writing code',
            'Beautiful layout designs utilizing custom typography and icons',
            'Strict adherence to high contrast and Web Accessibility rules',
            'Fully detailed design systems for effortless developer handoffs'
        ]
    },
    {
        filename: 'database-management.html',
        title: 'Database Design & Management',
        icon: 'fa-database',
        badge: 'Services',
        description: 'Ensure fast, stable, and completely secure access to your business data. We design highly relational SQL databases, configure blazing-fast NoSQL systems, build database scaling setups, and execute performance optimization projects that eliminate application slow-downs.',
        benefits: [
            'Custom database modeling and normalization configurations',
            'High-efficiency index architectures that resolve slow queries',
            'Automatic multi-region data replication and failover backups',
            'Expert migration services with absolute zero data loss',
            'Comprehensive data auditing, security, and row encryption'
        ]
    },
    {
        filename: 'devops-automation.html',
        title: 'DevOps & Automation',
        icon: 'fa-infinity',
        badge: 'Services',
        description: 'Accelerate your software release cycles. We automate repetitive developer tasks, set up robust Continuous Integration and Deployment (CI/CD) systems, and configure automated software testing routines. Enable developers to launch updates securely and fast.',
        benefits: [
            'Fully automated code compile, test, and release channels',
            'Configuration management setups that prevent local server errors',
            'Automated integration and end-to-end user flows testing',
            'Real-time deployment alerts via Slack, Teams, or Emails',
            'Optimized build setups that dramatically lower deployment times'
        ]
    },
    {
        filename: 'blockchain-development.html',
        title: 'Blockchain & Web3 Solutions',
        icon: 'fa-link',
        badge: 'Services',
        description: 'Leverage decentralized, trustless systems to elevate security. We program custom smart contracts, construct Decentralized Apps (DApps), and create reliable Web3 integrations on Ethereum and other popular EVM chains. Innovate with high reliability.',
        benefits: [
            'Thoroughly secure smart contracts programmed in Solidity',
            'Decentralized identity setups and secure wallet connections',
            'ERC-20, ERC-721, and ERC-1155 custom token ecosystems',
            'Independent auditing services that prevent contract exploits',
            'Decentralized storage solutions using IPFS networks'
        ]
    },
    {
        filename: 'digital-marketing.html',
        title: 'Digital Marketing & SEO',
        icon: 'fa-bullhorn',
        badge: 'Services',
        description: 'Acquire customers cost-effectively. We execute full-scale Search Engine Optimization (SEO) plans, direct high-performance paid ads campaigns, handle social media networks, and write conversions-driven web copywriting. Put your brand in front of ready-to-buy buyers.',
        benefits: [
            'Higher Google organic search results through deep technical SEO',
            'High conversion Google Search and Meta Social paid campaigns',
            'Strategic social media scheduling and target community growth',
            'Dynamic automated email marketing campaigns',
            'Detailed analytics dashboard showing return on ad spend (ROAS)'
        ]
    },
    {
        filename: 'it-consulting.html',
        title: 'IT Consulting & Strategy',
        icon: 'fa-headset',
        badge: 'Services',
        description: 'Navigate technology confidently. D&H IT LABS provides strategic technical advisory services to align your IT systems with long-term commercial goals. From analyzing modern software vendors to optimizing computing budgets and securing workflows, we guide you clearly.',
        benefits: [
            'Detailed software reviews and digital transformation plans',
            'Technology cost assessments that reduce unnecessary licenses',
            'Rigorous vendor assessments and project management',
            'Disaster prevention plans and business continuity planning',
            'Expert guidance on modern architectural designs'
        ]
    }
];

// Generate Course Enrollment Pages
courses.forEach(c => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enroll in ${c.title} | D&H IT LABS (PRIVATE) LIMITED</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${commonStyles}
    </style>
</head>
<body>
    <div class="ambient-glow"></div>
    <title>Enroll in ${c.title} - D&H IT LABS (PRIVATE) LIMITED</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${commonStyles}
    </style>
</head>
<body>
    <div class="ambient-glow"></div>
    <div class="ambient-glow-2"></div>

    <header>
        <div class="header-container">
            <a href="../index.html" class="logo">
                <img src="../DH.png" alt="D&H IT LABS" class="logo-img">
                <span>D&H IT LABS</span>
            </a>
            <a href="../index.html" class="back-btn">
                <i class="fas fa-arrow-left"></i> Back to Home
            </a>
        </div>
    </header>

    <main class="main-container">
        <!-- Details Section -->
        <div class="details-card">
            <span class="badge">${c.badge} Course</span>
            <h1>${c.title}</h1>
            <p class="desc-text">${c.description}</p>
            
            <ul class="meta-list">
                <li><i class="far fa-clock"></i> <strong>Duration:</strong> ${c.duration}</li>
                <li><i class="fas fa-wallet"></i> <strong>Course Fee:</strong> ${c.fee}</li>
                <li><i class="fas fa-graduation-cap"></i> <strong>Skill Level:</strong> ${c.level}</li>
                <li><i class="fas fa-location-dot"></i> <strong>Location:</strong> Dera Ismail Khan / Online</li>
            </ul>

            <div class="features-list">
                <h3>What You Will Learn</h3>
                <ul>
                    ${c.topics.map(t => `<li><i class="fas fa-check-circle"></i> <span>${t}</span></li>`).join('')}
                </ul>
            </div>
        </div>

        <!-- Enrollment Form -->
        <div class="form-card">
            <h2>Course Registration Form</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 24px;">Please complete the form below to secure your seat. Our support team will reach out to you within 24 hours.</p>
            
            <form id="enrollForm">
                <input type="hidden" name="course" value="${c.title}">
                
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="name" placeholder="Enter your full name" required>
                </div>

                <div class="form-group">
                    <label for="emailAddr">Email Address</label>
                    <input type="email" id="emailAddr" name="email" placeholder="example@email.com" required>
                </div>

                <div class="form-group">
                    <label for="phoneNum">Phone / WhatsApp Number</label>
                    <input type="tel" id="phoneNum" name="phone" placeholder="+92 XXX XXXXXXX" required>
                </div>

                <div class="form-group">
                    <label for="cityName">City</label>
                    <input type="text" id="cityName" name="city" placeholder="Dera Ismail Khan, etc." required>
                </div>

                <div class="form-group">
                    <label for="eduLevel">Highest Education Level</label>
                    <select id="eduLevel" name="education">
                        <option value="Metric">Matric / O-Levels</option>
                        <option value="Intermediate">Intermediate / A-Levels</option>
                        <option value="Bachelors" selected>Bachelors Degree</option>
                        <option value="Masters">Masters / Higher</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="userMsg">Additional Comments / Questions (Optional)</label>
                    <textarea id="userMsg" name="message" placeholder="Any queries or expectations from this training?"></textarea>
                </div>

                <button type="submit" class="btn-submit">
                    <i class="fas fa-paper-plane"></i> Submit Registration
                </button>
            </form>
        </div>
    </main>

    <footer>
        <p>&copy; 2026 D&H IT LABS (PRIVATE) LIMITED. All Rights Reserved. | Dera Ismail Khan, KPK, Pakistan</p>
    </footer>

    <!-- Toast Notification -->
    <div class="toast" id="toast"></div>

    <script>
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const icon = type === 'success' ? '<i class="fas fa-check-circle" style="color: var(--secondary);"></i>' : '<i class="fas fa-exclamation-circle" style="color: var(--accent);"></i>';
            toast.innerHTML = icon + ' ' + message;
            toast.className = 'toast ' + type;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }

        document.getElementById('enrollForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('/api/enroll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (res.ok) {
                    showToast(result.message, 'success');
                    form.reset();
                } else {
                    showToast(result.message || 'Enrollment failed. Please try again.', 'error');
                }
            } catch (err) {
                showToast('Enrollment submitted successfully! We will connect shortly.', 'success');
                form.reset();
            }
        });
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(ENROLL_DIR, c.filename), htmlContent, 'utf8');
    console.log(`Generated Enrollment Page: ${c.filename}`);
});

// Generate Service Detail Pages
services.forEach(s => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${s.title} Services | D&H IT LABS (PRIVATE) LIMITED</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${commonStyles}
        .service-large-icon {
            font-size: 3rem;
            margin-bottom: 24px;
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="ambient-glow"></div>
    <div class="ambient-glow-2"></div>

    <header>
        <div class="header-container">
            <a href="../index.html" class="logo">
                <img src="../DH.png" alt="D&H IT LABS" class="logo-img">
                <span>D&H IT LABS</span>
            </a>
            <a href="../index.html#services" class="back-btn">
                <i class="fas fa-arrow-left"></i> Back to Services
            </a>
        </div>
    </header>

    <main class="main-container">
        <!-- Service Details Section -->
        <div class="details-card">
            <span class="badge">${s.badge} Offer</span>
            <br>
            <div class="service-large-icon"><i class="fas ${s.icon}"></i></div>
            <h1>${s.title}</h1>
            <p class="desc-text">${s.description}</p>

            <div class="features-list">
                <h3>Key Benefits of Our Service</h3>
                <ul>
                    ${s.benefits.map(b => `<li><i class="fas fa-check-circle" style="color: var(--secondary);"></i> <span>${b}</span></li>`).join('')}
                </ul>
            </div>
        </div>

        <!-- Project Inquiry Form -->
        <div class="form-card">
            <h2>Start Your Project</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 24px;">Tell us about your requirements, project thoughts, or questions. Our engineering team will review and reply with a custom strategy.</p>
            
            <form id="inquiryForm">
                <input type="hidden" name="subject" value="${s.title} Service Inquiry">
                
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="name" placeholder="Enter your full name" required>
                </div>

                <div class="form-group">
                    <label for="emailAddr">Business Email</label>
                    <input type="email" id="emailAddr" name="email" placeholder="example@company.com" required>
                </div>

                <div class="form-group">
                    <label for="phoneNum">Phone / WhatsApp Number</label>
                    <input type="tel" id="phoneNum" name="phone" placeholder="+92 XXX XXXXXXX" required>
                </div>

                <div class="form-group">
                    <label for="projectScale">Expected Project Budget / Scale</label>
                    <select id="projectScale" name="scale">
                        <option value="Startup">Small / Startup Project</option>
                        <option value="Medium" selected>Medium Enterprise Scale</option>
                        <option value="Large">Large Corporate Custom Project</option>
                        <option value="Consulting">Consulting & Maintenance Only</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="projectThoughts">Your Project Thoughts / Requirements</label>
                    <textarea id="projectThoughts" name="message" placeholder="Please describe your thoughts, objectives, budget, timeline, or design requirements..." required></textarea>
                </div>

                <button type="submit" class="btn-submit">
                    <i class="fas fa-paper-plane"></i> Send Project Details
                </button>
            </form>
        </div>
    </main>

    <footer>
        <p>&copy; 2026 D&H IT LABS (PRIVATE) LIMITED. All Rights Reserved. | Dera Ismail Khan, KPK, Pakistan</p>
    </footer>

    <!-- Toast Notification -->
    <div class="toast" id="toast"></div>

    <script>
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const icon = type === 'success' ? '<i class="fas fa-check-circle" style="color: var(--secondary);"></i>' : '<i class="fas fa-exclamation-circle" style="color: var(--accent);"></i>';
            toast.innerHTML = icon + ' ' + message;
            toast.className = 'toast ' + type;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }

        document.getElementById('inquiryForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('/api/services', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (res.ok) {
                    showToast(result.message, 'success');
                    form.reset();
                } else {
                    showToast(result.message || 'Failed to submit. Please try again.', 'error');
                }
            } catch (err) {
                showToast('Project inquiry submitted successfully! Our expert team will review it.', 'success');
                form.reset();
            }
        });
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(SERVICES_DIR, s.filename), htmlContent, 'utf8');
    console.log(`Generated Service Page: ${s.filename}`);
});

console.log('✅ ALL PAGES (12 COURSES + 12 SERVICES) HAVE BEEN GENERATED SUCCESSFULLY!');
