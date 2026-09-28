// All site content lives here. Update this file to update the site.

export const profile = {
  name: 'Aarsh Desai',
  role: 'Deep Learning Engineer',
  company: { name: 'Nanonets', url: 'https://nanonets.com' },
  location: 'Bengaluru, India',
  email: 'desaiaarsh4@gmail.com',
  resume: '/Aarsh_Desai_Resume.pdf',
  siteUrl: 'https://platjack.netlify.app',
  tagline: 'I work on vision-language models and agents that extract structured data from messy, real-world documents.',
  about: [
    'I’m a Deep Learning Engineer at Nanonets. I work on memory for data-extraction agents, and on multimodal pipelines that pull structured data out of noisy documents.',
    'Before that I was a research intern at IIT Bombay, IIT Madras and NIT Puducherry, working on speaker diarization, emotion recognition, forecasting and efficient medical imaging. That work led to four peer-reviewed papers.',
    'I graduated from IIIT Dharwad in 2025 with a BTech in Data Science & AI. While there I led the Data Science and AI Society and the quiz club.',
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/PlatJack' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aarsh-desai-499194175/' },
    { label: 'Email', url: 'mailto:desaiaarsh4@gmail.com' },
  ],
};

export type Job = {
  company: string;
  url?: string;
  roles: { title: string; period: string }[];
  location: string;
  points: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: 'Nanonets',
    url: 'https://nanonets.com',
    roles: [
      { title: 'Deep Learning Engineer', period: 'Jul 2025 — Present' },
      { title: 'Deep Learning Intern', period: 'Jan 2025 — Jul 2025' },
    ],
    location: 'Bengaluru',
    points: [
      'Designed a multi-layer memory framework for data-extraction agents that turns real-time user feedback and historical data patterns into rules by measuring user intent. It flags conflicting instructions and lets agents adapt as business logic and edge cases change.',
      'Improved domain-specific multimodal pipelines for structured data extraction from documents, focusing on latency, cost and hallucinations on noisy real-world inputs.',
      'Led precision work for enterprise customers: diagnosed why certain methods kept failing and shipped targeted fixes to meet strict accuracy SLAs across workflows.',
      'As an intern, fine-tuned SigLIP and Qwen2.5-VL encoders with contrastive learning for clustering and retrieval embeddings. The final model outperformed SOTA baselines by 30% on highly unstructured layouts and templates.',
      'Built a human-in-the-loop annotation framework combining active learning with custom labelling UIs, making high-quality label collection 70% faster.',
    ],
    tags: ['Agents', 'Memory', 'VLMs', 'SigLIP', 'Qwen2.5-VL', 'Contrastive Learning'],
  },
  {
    company: 'Robert Bosch Centre for Data Science & AI, IIT Madras',
    roles: [{ title: 'Research Intern', period: 'Jun 2024 — Nov 2024' }],
    location: 'Remote',
    points: [
      'Worked on a multimodal stock prediction system for swing trading that used transformer-based sentiment from social media and financial news along with technical indicators.',
      'Tuned the time-series forecasting models and feature selection, improving prediction accuracy by 25% over historical price baselines.',
    ],
    tags: ['Transformers', 'Time Series', 'Sentiment'],
  },
  {
    company: 'Centre for Educational Technology, IIT Bombay',
    roles: [{ title: 'Research Intern', period: 'May 2023 — Sep 2024' }],
    location: 'Mumbai',
    points: [
      'Built a speaker diarization pipeline with PyAnnote and Whisper for Indo-English classroom conversations (140+ hours). It outperformed existing SOTA models by 65% and won Best Student Paper at IEEE TALE 2024.',
      'Worked on AffectBots, a web-based tutoring system that recognises student emotion from video and adjusts its teaching accordingly.',
    ],
    tags: ['Whisper', 'PyAnnote', 'Speech', 'Affective Computing'],
  },
  {
    company: 'Vocab.Ai',
    roles: [{ title: 'MLOps Intern', period: 'Aug 2023 — Aug 2024' }],
    location: 'Remote',
    points: [
      'Built a pipeline for ingesting customer-service chats in real time through Google Business APIs, and a dashboard showing how CS agent behaviour affects TAT and CSAT scores.',
    ],
    tags: ['Data Pipelines', 'Dashboards', 'MLOps'],
  },
  {
    company: 'Dept. of CSE, NIT Puducherry',
    roles: [{ title: 'Deep Learning Intern', period: 'Dec 2023 — Jan 2024' }],
    location: 'Karaikal',
    points: [
      'Cut the energy use of lung-nodule classification and segmentation models so they can run on edge devices in low-resource areas. Compared depthwise separable CNNs, pruning and quantization on LIDC-IDRI with minimal accuracy loss.',
    ],
    tags: ['Medical Imaging', 'Edge AI', 'Quantization', 'Pruning'],
  },
];

export const leadership = [
  { role: 'President', org: 'Data Science and AI Society, IIIT Dharwad', period: 'Oct 2023 — Oct 2024' },
  { role: 'Club Lead', org: 'InQuizitive, the Quiz Club of IIIT Dharwad', period: 'Oct 2022 — Dec 2023' },
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  year: number;
  url?: string;
  award?: string;
  note?: string;
};

export const publications: Publication[] = [
  {
    title:
      'Exploring Emotional Trajectories through Valence and Arousal in Open-Ended Math Learning Environments',
    authors:
      'Desai, A., Kartik, N. V. J. K., Gupta, P., M, V., Vanahalli, M. K., Rajendran, R., T S, A. & Biswas, G.',
    venue: 'International Conference on Technology for Education',
    venueShort: 'T4E 2025',
    year: 2025,
    url: 'https://par.nsf.gov/biblio/10660268',
    note: 'NSF Award 2112635',
  },
  {
    title:
      'Energy-Efficient Depthwise Separable CNNs for Classification and Segmentation of Lung Cancer Nodules',
    authors:
      'Sharma, V., Kartik, N. V. J. K., Vinayak, Desai, A., Gupta, P., Vanahalli, M. K., Prasad, B. M., Bankapur, S. S. & Girish, G. N.',
    venue: 'IEEE India Council International Subsections Conference',
    venueShort: 'INDISCON 2025',
    year: 2025,
    url: 'https://doi.org/10.1109/INDISCON66021.2025.11254247',
  },
  {
    title:
      'Advancing Speaker Diarization With Whisper Speech Recognition for Different Learning Environments',
    authors:
      'Desai, A., Kartik, N. V. J. K., Gupta, P., Vinayak, V., T S, A., Vanahalli, M. K. & Rajendran, R.',
    venue: 'IEEE Intl. Conference on Teaching, Assessment and Learning for Engineering',
    venueShort: 'IEEE TALE 2024',
    year: 2024,
    url: 'https://doi.org/10.1109/TALE62452.2024.10834319',
    award: 'Best Student Paper',
  },
  {
    title:
      'Unlocking the Triggers: Automating the Identification of Triggers of Socially Shared Metacognitive Regulation in Collaborative Problem-Solving',
    authors:
      'Kartik, N. V. J. K., Gupta, P., M, V., Desai, A., Badhe, V., T S, A., Vanahalli, M. K. & Rajendran, R.',
    venue: 'International Conference on Technology for Education',
    venueShort: 'T4E 2024',
    year: 2024,
    url: 'https://doi.org/10.1007/978-981-95-1734-3_6',
  },
];

export type Project = {
  title: string;
  description: string;
  points?: string[];
  tags: string[];
  url?: string;
  date?: string;
};

export const projects: Project[] = [
  {
    title: 'Attention and Emotion Sensing for Online Learning',
    description:
      'A real-time webcam tool that flags drowsy, distracted or disengaged students for teachers of students with special needs.',
    points: [
      'Uses facial landmarks to detect and track head pose, eye closure and gaze.',
      'Trained a CNN from scratch on FER-2013, reaching 62.7% accuracy across 7 emotions.',
      'Later brought the idea to a study platform’s PDF viewer with in-browser gaze tracking and an alert when the reader looks away. Everything runs offline, so video never leaves the device.',
    ],
    tags: ['TensorFlow', 'OpenCV', 'dlib', 'WebGazer.js'],
    url: 'https://github.com/PlatJack/DRS-Hackathon-2',
    date: 'May 2023',
  },
];

export const achievements = [
  {
    title: 'Director’s Gold Medal',
    detail: 'Best all-round graduating student, batch of 2025, IIIT Dharwad',
  },
  {
    title: 'Best Student Paper',
    detail: 'IEEE TALE 2024',
  },
  {
    title: 'Ganglia Tech Collegiate Hackathon',
    detail: '1st place',
  },
  {
    title: 'Competitive programming',
    detail: 'Global rank 19 in CodeChef Starters 57 · peak 4★ on CodeChef · top 3% on LeetCode',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Focus Areas', items: ['Vision-Language Models', 'Agentic Systems', 'Multimodal Learning'] },
  {
    group: 'ML & Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'LangChain', 'LangGraph', 'OpenCV'],
  },
  { group: 'Training & Serving', items: ['vLLM', 'Triton Inference Server', 'FastAPI', 'Quantization', 'Pruning'] },
  {
    group: 'Languages & Data',
    items: ['Python', 'C/C++', 'Go', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch'],
  },
  {
    group: 'Infrastructure',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Argo CD', 'GitHub Actions', 'Grafana'],
  },
];

export const education = [
  {
    school: 'Indian Institute of Information Technology, Dharwad',
    degree: 'BTech, Data Science & Artificial Intelligence',
    detail: 'CGPA 9.19',
    period: '2021 — 2025',
  },
  {
    school: 'G.D. Goenka International School, Surat',
    degree: 'CBSE Higher Secondary',
    detail: '94.4%',
    period: '2021',
  },
];

// ---- Pipeline view ----

export type Metric = {
  label: string;
  context: string;
  value: number; // bar fill, 0–100
  display: string;
  direction: 'up' | 'down' | 'abs';
};

export const metrics: Metric[] = [
  { label: 'Retrieval vs SOTA baselines', context: 'Fine-tuned SigLIP / Qwen2.5-VL encoders · Nanonets', value: 30, display: '+30%', direction: 'up' },
  { label: 'Label collection speed', context: 'Human-in-the-loop + active learning · Nanonets', value: 70, display: '+70%', direction: 'up' },
  { label: 'Speaker diarization vs SOTA', context: 'PyAnnote + Whisper, 140+ hrs of classroom audio · IIT Bombay', value: 65, display: '+65%', direction: 'up' },
  { label: 'Forecast accuracy vs price baselines', context: 'Multimodal stock prediction · IIT Madras', value: 25, display: '+25%', direction: 'up' },
];

export type Cluster = { id: string; label: string; color: string; center: [number, number, number] };

export const clusters: Cluster[] = [
  { id: 'docai', label: 'Document AI & VLMs', color: '#22d3ee', center: [-4.6, 0.9, 0.6] },
  { id: 'agents', label: 'Agents & Data Pipelines', color: '#a78bfa', center: [-0.8, 2.6, -1.6] },
  { id: 'affect', label: 'Speech & Affective AI', color: '#fb7185', center: [3.8, 1.3, 0.4] },
  { id: 'efficient', label: 'Efficient & Medical DL', color: '#a3e635', center: [0.9, -2.9, 1.6] },
  { id: 'forecast', label: 'Time Series', color: '#fbbf24', center: [4.6, -1.9, -0.8] },
  { id: 'cp', label: 'Honours & Community', color: '#e2e8f0', center: [-3.9, -2.4, -1.0] },
];

export type MapItem = {
  id: string;
  label: string;
  kind: 'paper' | 'project' | 'work' | 'award';
  cluster: string;
  detail: string;
  url?: string;
  gold?: boolean;
};

export const mapItems: MapItem[] = [
  { id: 'nanonets', label: 'Nanonets', kind: 'work', cluster: 'docai', detail: 'Deep Learning Engineer. Memory for data-extraction agents and multimodal extraction pipelines.', url: 'https://nanonets.com' },
  { id: 'extraction', label: 'Extraction pipelines', kind: 'project', cluster: 'docai', detail: 'Domain-specific multimodal pipelines for structured data extraction, tuned for latency, cost and hallucinations on noisy inputs.' },
  { id: 'embed', label: 'Vision embeddings', kind: 'project', cluster: 'docai', detail: 'Contrastive fine-tuning of SigLIP and Qwen2.5-VL encoders; 30% better than SOTA baselines on unstructured layouts.' },
  { id: 'hil', label: 'HIL annotation', kind: 'project', cluster: 'docai', detail: 'Active learning with custom labelling UIs, making high-quality label collection 70% faster.' },
  { id: 'memory', label: 'Agent memory', kind: 'project', cluster: 'agents', detail: 'Multi-layer memory that turns user feedback and historical patterns into rules, flags conflicting instructions, and adapts as business logic changes.' },
  { id: 'vocab', label: 'Vocab.Ai', kind: 'work', cluster: 'agents', detail: 'MLOps Intern. Real-time ingestion of customer-service chats and a dashboard linking agent behaviour to TAT and CSAT.' },
  { id: 'tale', label: 'TALE 2024 · Best Paper', kind: 'paper', cluster: 'affect', gold: true, detail: 'Advancing Speaker Diarization With Whisper Speech Recognition for Different Learning Environments.', url: 'https://doi.org/10.1109/TALE62452.2024.10834319' },
  { id: 't4e25', label: 'T4E 2025', kind: 'paper', cluster: 'affect', detail: 'Exploring Emotional Trajectories through Valence and Arousal in Open-Ended Math Learning Environments.', url: 'https://par.nsf.gov/biblio/10660268' },
  { id: 't4e24', label: 'T4E 2024', kind: 'paper', cluster: 'affect', detail: 'Unlocking the Triggers: automating identification of SSMR triggers in collaborative problem-solving.', url: 'https://doi.org/10.1007/978-981-95-1734-3_6' },
  { id: 'iitb', label: 'IIT Bombay', kind: 'work', cluster: 'affect', detail: 'Research Intern. Speaker diarization for Indo-English classrooms and the AffectBots tutoring system.' },
  { id: 'affectbots', label: 'AffectBots', kind: 'project', cluster: 'affect', detail: 'Web-based tutoring system that recognises student emotion from video and adjusts its teaching.' },
  { id: 'attention', label: 'Attention sensing', kind: 'project', cluster: 'affect', detail: 'Webcam tool that flags drowsy or distracted students from head pose, eye closure and gaze. Runs fully offline.', url: 'https://github.com/PlatJack/DRS-Hackathon-2' },
  { id: 'indiscon', label: 'INDISCON 2025', kind: 'paper', cluster: 'efficient', detail: 'Energy-Efficient Depthwise Separable CNNs for Classification and Segmentation of Lung Cancer Nodules.', url: 'https://doi.org/10.1109/INDISCON66021.2025.11254247' },
  { id: 'nitpy', label: 'NIT Puducherry', kind: 'work', cluster: 'efficient', detail: 'Deep Learning Intern. Lower-energy lung-nodule models for edge devices in low-resource areas.' },
  { id: 'iitm', label: 'IIT Madras', kind: 'work', cluster: 'forecast', detail: 'Research Intern at RBCDSAI. Multimodal stock prediction with sentiment, news and technical indicators.' },
  { id: 'gold', label: 'Director’s Gold Medal', kind: 'award', cluster: 'cp', gold: true, detail: 'Best all-round graduating student, batch of 2025, IIIT Dharwad.' },
  { id: 'codechef', label: 'CodeChef #19', kind: 'award', cluster: 'cp', detail: 'Global rank 19 in CodeChef Starters 57; peak 4★ rating.' },
  { id: 'leetcode', label: 'LeetCode top 3%', kind: 'award', cluster: 'cp', detail: 'Top 3% of global participants.' },
  { id: 'hackathon', label: 'Ganglia Tech · 1st', kind: 'award', cluster: 'cp', detail: '1st place at the Ganglia Tech Collegiate Hackathon.' },
  { id: 'society', label: 'DS & AI Society', kind: 'work', cluster: 'cp', detail: 'President of the Data Science and AI Society, IIIT Dharwad (2023–24).' },
  { id: 'quiz', label: 'InQuizitive', kind: 'work', cluster: 'cp', detail: 'Club Lead of InQuizitive, the quiz club of IIIT Dharwad (2022–23).' },
];
