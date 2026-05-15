export type ProjectCategory =
	| "ML"
	| "Distributed Systems / Blockchain"
	| "Computer Vision"
	| "System Design";

export type PortfolioProject = {
	id: string;
	title: string;
	category: ProjectCategory;
	period: string;
	description: string;
	stack: string[];
	links: { label: string; href: string }[];
	impact: string[];
	tags: string[];
	relatedBlogs: string[];
};

export type WikiLink = {
	label: string;
	slug: string;
	href?: string;
};

export type BlogNote = {
	id: string;
	title: string;
	category: "gsoc-2026" | "distributed-systems" | "system-design" | "ML";
	excerpt: string;
	body: string[];
	wikiLinks: WikiLink[];
	linkedProjects: string[];
	tags: string[];
};

export const profile = {
	name: "Natnael Yohanes",
	role: "Backend AI Engineer",
	location: "Addis Ababa, Ethiopia",
	email: "mataniayohanes@gmail.com",
	phone: "+251-969-429-408",
	whatsapp: "https://wa.me/251969429408",
	github: "https://github.com/Nama21yo",
	linkedin: "https://linkedin.com/in/natnael-yohanes-software-engineer",
	x: "https://x.com/Nama21yo",
	telegram: "https://t.me/qalabit",
	resume: "/Natnael_Yohanes_Resume_job.pdf",
	summary:
		"Backend AI Engineer focused on ML systems, system design, distributed systems, and blockchain infrastructure.",
	focus: ["ML systems", "System design", "Distributed systems", "Blockchain infrastructure"]
};

export const resumeProjects: PortfolioProject[] = [
	{
		id: "semantic-search-qa",
		title: "Semantic Search and QA Platform",
		category: "ML",
		period: "January 2025",
		description: "RAG pipeline with embeddings, MCP context servers, FastAPI, and async sessions.",
		stack: ["FastAPI", "LangChain", "Streamlit", "scikit-learn", "MCP"],
		links: [{ label: "GitHub", href: "https://github.com/Nama21yo/semnatic_ChatBot" }],
		impact: [
			"MCP decoupled context sources from LLM reasoning.",
			"Async API handled concurrent sessions."
		],
		tags: ["ML", "RAG", "MCP"],
		relatedBlogs: ["kademlia"]
	},
	{
		id: "metta-moses-optimization",
		title: "MeTTa-Moses Optimization",
		category: "ML",
		period: "March 2025 - September 2025",
		description: "Optimized mutual-information calculation in MeTTa-Moses with LRU caching.",
		stack: ["Python", "Caching", "Optimization", "AGI Research"],
		links: [
			{ label: "Pull Request", href: "https://github.com/iCog-Labs-Dev/metta-moses/pull/332" }
		],
		impact: [
			"Reduced runtime from 2 minutes to 34 seconds.",
			"Improved iterative ML research feedback loops."
		],
		tags: ["ML", "Optimization", "Caching"],
		relatedBlogs: ["kademlia"]
	},
	{
		id: "graph-image-segmentation",
		title: "Graph-Based Image Segmentation",
		category: "Computer Vision",
		period: "September 2025",
		description: "Felzenszwalb-Huttenlocher segmentation using graph modeling and Union-Find.",
		stack: ["Python", "NumPy", "scikit-image", "Union-Find"],
		links: [
			{
				label: "GitHub",
				href: "https://github.com/Nama21yo/felzenszwalb-huttenlocher-Segmentation"
			}
		],
		impact: ["Near-linear O(n log n) processing.", "Adaptive thresholding for segment quality."],
		tags: ["Computer Vision", "Graphs", "Optimization"],
		relatedBlogs: ["kademlia"]
	},
	{
		id: "distributed-content-filtration",
		title: "Distributed Content Filtration",
		category: "Distributed Systems / Blockchain",
		period: "2025",
		description: "Real-time distributed moderation system with Redis and two-tier LLM routing.",
		stack: ["Redis", "Ollama", "Groq", "Rust", "Ethereum", "Solana"],
		links: [{ label: "Experience", href: "https://icog-labs.com/" }],
		impact: ["Processed 1000+ posts.", "Reduced API costs by 80% with sub-500ms response targets."],
		tags: ["Distributed Systems", "Blockchain", "Solidity", "Vyper"],
		relatedBlogs: ["kademlia"]
	},
	{
		id: "medical-scheduler",
		title: "Medical Scheduler Platform",
		category: "System Design",
		period: "March 2025",
		description:
			"Appointment platform with RBAC, Redis sessions, mobile, web, and backend services.",
		stack: ["NestJS", "TypeScript", "Flutter", "React", "Redis", "RBAC"],
		links: [
			{ label: "Mobile", href: "https://github.com/Sisyetad/MedicalScheduler" },
			{ label: "Web", href: "https://github.com/Nama21yo/medicare" }
		],
		impact: ["Role-based patient and doctor flows.", "Redis-backed session and cache design."],
		tags: ["System Design", "RBAC", "Redis"],
		relatedBlogs: ["kademlia"]
	},
	{
		id: "job-matching-microservices",
		title: "Job-Matching Microservices",
		category: "System Design",
		period: "January 2025 - February 2025",
		description:
			"GCP microservices platform with Docker, Kubernetes, PostgreSQL, and WebSocket reliability work.",
		stack: ["Go", "GCP", "Docker", "Kubernetes", "PostgreSQL", "WebSocket"],
		links: [{ label: "Company", href: "https://kyotocreative.com/" }],
		impact: [
			"Improved reliability to 95%.",
			"Reduced average query time by 40% under simulated load."
		],
		tags: ["System Design", "Microservices", "Kubernetes"],
		relatedBlogs: ["kademlia"]
	}
];

export const blogNotes: BlogNote[] = [
	{
		id: "gsoc-2026-week-0",
		title: "GSoC 2026: Amharic DBpedia Ontology Mapping — Week 0",
		category: "gsoc-2026",
		excerpt:
			"Kicking off GSoC 2026 with DBpedia by researching Amharic ontology alignment using Afro-XLM-R and LangGraph. Here's what I did during Week 0.",
		body: [
			"## What is this project about?",
			"This summer I'm working on [[GSoC 2026]] with [[DBpedia]] to extend the [[Amharic DBpedia Chapter]]. The goal is to build an agentic system that can map Amharic text entities to their correct DBpedia ontology classes — a critical step toward making Amharic knowledge accessible in the global knowledge graph.",
			"The project leverages [[Afro-XLM-R]], a multilingual transformer model optimized for African languages, fine-tuned with [[LoRA]] and orchestrated through [[LangGraph]] for robust agentic pipeline design.",
			"## Week 0 Progress Report",
			"**Mentorship & Communication**",
			"I had my first onboarding meeting with my [[GSoC Mentors]] — [[Prof. Dr. Ricardo Usbeck]], [[Andargachew]], [[Tilahun Abedissa Taffa]], and [[Hizkiel Mitiku Alemayehu]]. We introduced ourselves and locked in weekly sync meetings for Fridays at 2:00 PM. I also joined all primary communication channels: Slack, WhatsApp, and Microsoft Teams.",
			"My mentors have rich backgrounds — Prof. Usbeck leads AI research in Germany, Andargachew is a lecturer at Addis Ababa University specializing in knowledge graphs and NLP, Tilahun is a PhD researcher at Leuphana University working on hybrid QA systems for low-resource languages, and Hizkiel is a PhD candidate at Paderborn University focused on NLP and Digital Humanities.",
			"**Research & Literature Review**",
			"I conducted a deep-dive revision of the [[Amharic DBpedia Chapter]] research paper and analyzed the three property-retriever models developed by the [[DICE-Research team]]. I also refreshed my core knowledge of [[Transformers]], [[BERT]], and efficient fine-tuning methods like [[LoRA]].",
			"**Technical Exploration**",
			"I performed model benchmarking on Kaggle using GPU access to evaluate [[mBERT]], [[XLM-R]], and [[Afro-XLM-R]]. After thorough experimentation, I validated [[Afro-XLM-R]] as the optimal base model for Amharic ontology mapping.",
			"I selected [[LangGraph]] as the primary framework for building the project's agentic orchestration layer. Here's why:",
			"- It is used by production-grade companies like LinkedIn",
			"- It has large community support",
			"- It supports both Python and JavaScript (unlike alternatives like Mastra)",
			"**Documentation & Branding**",
			"Developed and launched this personal portfolio website and started writing weekly GSoC progress blog posts.",
			"## Looking Ahead",
			"Over the next 11 weeks I will be posting weekly updates. Next up: diving deeper into the Afro-XLM-R fine-tuning pipeline and setting up the LangGraph agent architecture for ontology alignment. Stay tuned."
		],
		wikiLinks: [
			{ label: "GSoC 2026", slug: "gsoc-2026", href: "https://summerofcode.withgoogle.com/" },
			{ label: "DBpedia", slug: "dbpedia", href: "https://www.dbpedia.org/" },
			{ label: "Prof. Dr. Ricardo Usbeck", slug: "ricardo-usbeck", href: "https://www.leuphana.de/en/research/artificial-intelligence-and-explainability.html" },
			{ label: "Tilahun Abedissa Taffa", slug: "tilahun-abedissa-taffa" },
			{ label: "Hizkiel Mitiku Alemayehu", slug: "hizkiel-mitiku-alemayehu" },
			{ label: "Andargachew", slug: "andargachew" },
			{ label: "Amharic DBpedia Chapter", slug: "amharic-dbpedia-chapter" },
			{ label: "DICE-Research team", slug: "dice-research", href: "https://dice-research.org/" },
			{ label: "Afro-XLM-R", slug: "afro-xlm-r", href: "https://huggingface.co/dICE-org/afro-xlm-r" },
			{ label: "mBERT", slug: "mbert" },
			{ label: "XLM-R", slug: "xlm-r" },
			{ label: "Transformers", slug: "transformers", href: "https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)" },
			{ label: "BERT", slug: "bert" },
			{ label: "LoRA", slug: "lora" },
			{ label: "LangGraph", slug: "langgraph", href: "https://langchain.com/langgraph" },
			{ label: "GSoC Mentors", slug: "gsoc-mentors" }
		],
		linkedProjects: [],
		tags: ["gsoc-2026", "nlp", "knowledge-graphs", "amharic", "dbpedia"]
	},
	{
		id: "kademlia",
		title: "Kademlia: wth is it? 🤔",
		category: "distributed-systems",
		excerpt:
			"A casual explanation of Kademlia, XOR distance, distributed hashmaps, torrents, and why this idea matters for large distributed systems.",
		body: [
			"The previous week I was reading a paper about [[Kademlia]] (wth is it?🤔).",
			"Don't worry it is very clear concept to discuss about, but some prerequisites first.",
			"Prerequisites",
			"1. [[Bitwise XOR]]: I know you will say wth but this analogy helps me to remember 😂. Think of XOR as a guy trying to manage a very messy love life (he has a wife and ex-wife😭). In any situation he don't want his wife to know about his ex-wife.",
			"If he is with just his current wife, he is happy (1). If he is with just his ex-wife, he is also happy (1). But if his wife AND his ex-wife are in the exact same room at the exact same time? Absolute disaster (0). If neither of them is there? He is just bored (0). So that is XOR 😂",
			"2. [[HashMap]]/Hashtable: If you worked on one programming I am sure you will know it. It is just a dictionary that stores data exactly like this: <Key, Value>. Eg. <Name, Someone>",
			"3. [[Distributed Systems]]: In computer science, if a task is too massive for one computer to handle (like storing a petabyte of data or handling a billion requests), we don't build a bigger computer. We get thousands of normal computers to collaborate and share the workload.",
			"About Kademlia",
			"Kademlia is essentially a [[Distributed Hashmap]]. In languages like Python or Java, a traditional hashmap stores data strictly on local memory. However, if a dataset is too large for one machine and you need a reliable method to distribute millions of <Key, Value> pairs across a network of independent computers, Kademlia is the blueprint you use to make it happen.",
			"How it works?",
			"In Kademlia, every single file (Key) and every single computer (Node) gets assigned a random 160-bit(20-byte) ID number.",
			"Major takeaway from the paper: Store the file on the computer whose ID number is mathematically closest to the file's ID number.",
			"So to calculate which one is closest we will use some distance metrics aka the [[Bitwise XOR]]. To find out how far a computer is from a file, it just XORs their two ID numbers together.",
			"Because XOR math is perfectly symmetrical and consistent, every computer inherently knows exactly which direction to send your search request.",
			"When you search for a file, your computer doesn't check every computer that exists inside the system. It looks at its address book and sends a request to the 3 computers it knows that are mathematically closer to the file's ID. Time Complexity: O(log n), where n is the total number of computers on the entire network.",
			"Where it is used?",
			"Yeah you guessed it! It is in [[Torrents]] 😂. The dudes that created torrent are so genius right? The way how it internally works OMG.",
			"I would expect it to be used in [[LLMs]] in the future. Since the current models have billions of parameters, we can't store all the layers inside a single computer. Rather, we store the layers across multiple computers then use Kademlia. Just a thought that I have lol 😂",
			"Suggestions",
			"If you want to checkout the math proves why this network never crashes, checkout the [[Original Paper]].",
			"Hope it wasn't boring."
		],
		wikiLinks: [
			{ label: "Kademlia", slug: "kademlia", href: "https://en.wikipedia.org/wiki/Kademlia" },
			{
				label: "Bitwise XOR",
				slug: "bitwise-xor",
				href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR"
			},
			{ label: "HashMap", slug: "hashmap", href: "https://en.wikipedia.org/wiki/Hash_table" },
			{
				label: "Distributed Systems",
				slug: "distributed-systems",
				href: "https://en.wikipedia.org/wiki/Distributed_computing"
			},
			{
				label: "Distributed Hashmap",
				slug: "distributed-hashmap",
				href: "https://en.wikipedia.org/wiki/Distributed_hash_table"
			},
			{ label: "Torrents", slug: "torrents", href: "https://en.wikipedia.org/wiki/BitTorrent" },
			{
				label: "LLMs",
				slug: "llms",
				href: "https://en.wikipedia.org/wiki/Large_language_model"
			},
			{
				label: "Original Paper",
				slug: "original-paper",
				href: "https://www.scs.stanford.edu/~dm/home/papers/kpos.pdf"
			}
		],
		linkedProjects: [
			"distributed-content-filtration",
			"job-matching-microservices",
			"semantic-search-qa"
		],
		tags: ["gsoc-2026", "distributed-systems", "system-design", "ML"]
	}
];

export const allProjects = resumeProjects;

export function getProjectTitle(id: string) {
	return allProjects.find((item) => item.id === id)?.title ?? id;
}

export function getProjectSummary(id: string) {
	return allProjects.find((item) => item.id === id)?.description ?? "";
}

export function getProjectTags(id: string) {
	return allProjects.find((item) => item.id === id)?.tags ?? [];
}

export function getBlogTitle(id: string) {
	return blogNotes.find((note) => note.id === id)?.title ?? id;
}

export function getBlogsForProject(id: string) {
	return blogNotes.filter((note) => note.linkedProjects.includes(id));
}

export const experience = [
	{
		org: "iCog Labs",
		role: "AI Researcher / Optimization and Machine Learning",
		period: "Mar 2025 - Sep 2025",
		highlights: [
			"4x MeTTa-Moses speedup",
			"NumPy neural network library",
			"Distributed LLM filtration system"
		]
	},
	{
		org: "Kyoto Creative",
		role: "Backend and DevOps Engineer",
		period: "Jan 2025 - Feb 2025",
		highlights: [
			"GCP microservices",
			"Kubernetes deployment",
			"WebSocket reliability and PostgreSQL tuning"
		]
	},
	{
		org: "GDG on Campus AAU",
		role: "Technical Mentor",
		period: "Feb 2024 - Jun 2024",
		highlights: ["Mentored 48+ students", "Led 7 developers", "Set code review and CI/CD standards"]
	}
];

export const education = [
	{
		school: "Addis Ababa University",
		program: "BSc Software Engineering",
		period: "2023 - 2027",
		detail: "GPA 3.93/4.00. Focus: algorithms, distributed systems, OS, databases, networking, ML."
	},
	{
		school: "A2SV - Africa to Silicon Valley",
		program: "DSA and Backend Development in Go",
		period: "Jan 2025 - Nov 2025",
		detail:
			"800+ LeetCode/Codeforces problems, graph theory, dynamic programming, Go clean architecture."
	}
];

export const achievements = [
	"GDG Hackathon Winner: 15,000 ETB library management solution.",
	"Python instructor for 500+ students.",
	"Open source contributor: MeTTa-Moses, MeTTaLog, Sugar Labs, OpenELIS Global."
];

export const certifications = [
	{
		label: "Microsoft Azure Fundamentals (AZ-900)",
		href: "https://drive.google.com/file/d/1DwZgyfJbiLVTTDdWscNffBSrGaPq9gAo/view?usp=sharing"
	},
	{
		label: "Google IT Automation with Python",
		href: "https://drive.google.com/file/d/15Nu-27DNQaUkLMH13KI5Qu-wsAbmliko/view?usp=sharing"
	},
	{
		label: "Supervised Machine Learning",
		href: "https://drive.google.com/file/d/1UfiBIZHNYLwOZi0EQisFxj0nw_Z_kq69/view?usp=sharing"
	},
	{
		label: "Blockchain HashGraph Developer",
		href: "https://drive.google.com/file/d/1gJgig3hdxP4T4fhFp_o4th4C_vgM8P7I/view?usp=sharing&usp=embed_facebook"
	},
	{
		label: "Evangadi Tech MERN Stack Certified",
		href: "https://drive.google.com/file/d/15Nu-27DNQaUkLMH13KI5Qu-wsAbmliko/view?usp=sharing"
	}
];

export const skillGroups = [
	{ label: "ML", items: ["RAG", "MCP", "TensorFlow", "NumPy", "LangChain", "Optimization"] },
	{ label: "Backend", items: ["Go", "FastAPI", "NestJS", "gRPC", "GraphQL", "Redis"] },
	{
		label: "Distributed / Blockchain",
		items: ["Rust", "Ethereum", "Solidity", "Vyper", "Solana", "Kademlia", "P2P"]
	},
	{ label: "Data", items: ["PostgreSQL", "MongoDB", "Neo4j", "MySQL", "scikit-learn"] }
];
