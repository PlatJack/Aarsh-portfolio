// All site content lives here. Update this file to update the site.

export const profile = {
  name: 'Aarsh Desai',
  role: 'Deep Learning Engineer',
  company: { name: 'Nanonets', url: 'https://nanonets.com' },
  location: 'Bengaluru, India',
  email: 'desaiaarsh4@gmail.com',
  resume: '/Aarsh_Desai_Resume.pdf',
  siteUrl: 'https://platjack.netlify.app',
  tagline:
    'I build multimodal and agentic AI systems that hold up on messy, real-world documents.',
  about: [
    'I work on Document AI at Nanonets. I build agentic memory pipelines that learn from user feedback, and I fine-tune vision-language models for enterprise-grade extraction.',
    'Before that I did research at IIT Bombay, IIT Madras and NIT Puducherry, on speaker diarization, multimodal emotion recognition and energy-efficient medical imaging. I was lucky to learn from wonderful mentors there, and our work turned into four peer-reviewed papers.',
    'I graduated from IIIT Dharwad in 2025 with a BTech in Data Science & AI. Outside work I still enjoy a good competitive programming problem.',
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
  mentors?: string;
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
      'Architected a multi-tiered agentic memory pipeline driven by real-time user feedback, eliminating instruction conflicts and letting agents adapt to evolving logic and edge-case rules.',
      'Fine-tuned domain-specific multimodal models with robust training pipelines that minimise hallucinations and maximise extraction quality on noisy, real-world inputs.',
      'Led high-priority precision initiatives, diagnosing failure cases and shipping tailored model improvements to meet strict enterprise SLAs.',
      'Fine-tuned foundation models (SigLIP, Qwen2.5-VL) with contrastive learning for document clustering and retrieval. Designed a custom vision embedding model that beat SOTA by 30% on retrieval.',
      'Built a human-in-the-loop annotation pipeline with active learning and custom UIs, speeding up high-quality label acquisition by 70%.',
    ],
    tags: ['Agentic AI', 'VLMs', 'Qwen2.5-VL', 'SigLIP', 'Contrastive Learning', 'PyTorch'],
  },
  {
    company: 'Robert Bosch Centre for Data Science & AI, IIT Madras',
    roles: [{ title: 'Research Intern', period: 'Jun 2024 — Nov 2024' }],
    location: 'Remote',
    mentors: 'Dr. Gokul S Krishnan & Dr. Sanjay Bankapur',
    points: [
      'Engineered a multimodal stock prediction system combining transformer-based social sentiment, financial news and technical indicators for swing trading.',
      'Optimised time-series forecasting and feature-selection pipelines for a 25% accuracy gain over baseline models.',
    ],
    tags: ['Transformers', 'Time Series', 'Multimodal'],
  },
  {
    company: 'Centre for Educational Technology, IIT Bombay',
    roles: [{ title: 'Research Intern', period: 'May 2023 — Sep 2024' }],
    location: 'Mumbai',
    mentors: 'Dr. Ashwin T S & Dr. Ramkumar Rajendran',
    points: [
      'Developed AffectBots, a multimodal (audio, video, text) tutoring system that analysed 100+ hours of student engagement with 88% emotion-recognition accuracy.',
      'Built speaker diarization with PyAnnote and Whisper for Indo-English classrooms across 140+ hours of interactions, outperforming existing models by 65%. Published at IEEE TALE 2024, where it received the Best Student Paper award.',
    ],
    tags: ['Whisper', 'PyAnnote', 'Speech', 'Affective Computing'],
  },
  {
    company: 'Vocab.Ai',
    roles: [{ title: 'MLOps Intern', period: 'Aug 2023 — Aug 2024' }],
    location: 'Remote',
    points: [
      'Built a full-stack pipeline ingesting 100,000+ customer-service conversations via Google Business APIs at 98% reliability, with a web UI tracking behavioural metrics.',
      'Fine-tuned LLaMA 2 and GPT-3.5 Turbo with LangChain for sentiment, topic modelling and conversation scoring, improving accuracy by 8%.',
    ],
    tags: ['LLMs', 'LangChain', 'MLOps'],
  },
  {
    company: 'Dept. of CSE, NIT Puducherry',
    roles: [{ title: 'Deep Learning Intern', period: 'Dec 2023 — Jan 2024' }],
    location: 'Karaikal',
    mentors: 'Dr. Girish G N & Dr. Sanjay Bankapur',
    points: [
      'Optimised lung-nodule classification and segmentation models on LIDC-IDRI, cutting energy consumption by 77% with near-zero accuracy loss via pruning and quantization.',
    ],
    tags: ['Medical Imaging', 'Quantization', 'Pruning'],
  },
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  year: number;
  url?: string;
  award?: string;
};

export const publications: Publication[] = [
  {
    title:
      'Exploring Emotional Trajectories through Valence and Arousal in Open-Ended Math Learning Environments',
    authors:
      'Desai, A., Kartik, N. V. J. K., Gupta, P., M., Vinayak, Vanahalli, M. K., Rajendran, R., T S, A. & Biswas, G.',
    venue: 'International Conference on Technology for Education',
    venueShort: 'T4E 2025',
    year: 2025,
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
  tags: string[];
  url?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    title: 'Online Schooling for the Specially Abled',
    description:
      'Real-time computer vision pipeline that reads facial expressions and gaze to adapt learning content. Containerised and deployed on AWS, built end-to-end in a 48-hour sprint.',
    tags: ['TensorFlow', 'OpenCV', 'Streamlit', 'Docker', 'AWS'],
    url: 'https://github.com/PlatJack/DRS-Hackathon-2',
    highlight: '1st of 50 teams',
  },
  {
    title: 'Emotional Monitoring of Crypto Traders',
    description:
      'A trading platform that monitors traders’ emotional state and delivers personalised interventions to support better decision-making.',
    tags: ['Affective Computing', 'Web', 'Hackathon'],
    url: 'https://github.com/hackfest-dev/HF24-Nexus',
  },
  {
    title: 'Centio.AI',
    description:
      'Conversational AI platform with regular chat, assistant-style task automation, in-depth research and document management.',
    tags: ['LLMs', 'Agents', 'RAG'],
    url: 'https://github.com/VinayakRai5/Centio.AI',
  },
  {
    title: 'Alumni Connect',
    description:
      'Flutter app for the career cell at IIIT Dharwad with social image sharing, job postings and in-app applications for alumni engagement.',
    tags: ['Flutter', 'Mobile'],
    url: 'https://github.com/NVJKKartik/Alumni_connect',
  },
];

export const achievements = [
  {
    title: 'Director’s Gold Medal',
    detail: 'Best Outgoing Student, IIIT Dharwad, Batch of 2025',
  },
  {
    title: 'Best Student Paper',
    detail: 'IEEE TALE 2024, for our work on speaker diarization in classrooms',
  },
  {
    title: 'Competitive programming',
    detail: 'Rank 19 in CodeChef Starters 57 · peak 4★ on CodeChef · top 3% on LeetCode',
  },
  {
    title: 'Ganglia Tech Collegiate Hackathon',
    detail: '1st place, with a team project on accessible online schooling',
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Core',
    items: ['Agentic AI', 'Vision-Language Models', 'Multimodal AI', 'Document AI', 'MLOps'],
  },
  {
    group: 'AI & Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'HuggingFace', 'LangChain', 'OpenAI API', 'OpenCV', 'Keras'],
  },
  {
    group: 'Optimization & Serving',
    items: ['Quantization', 'Pruning', 'vLLM', 'Triton', 'FastAPI', 'Flask'],
  },
  {
    group: 'Languages & Data',
    items: ['Python', 'C/C++', 'Go', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'Argo CD', 'Grafana'],
  },
];

export const education = [
  {
    school: 'Indian Institute of Information Technology, Dharwad',
    degree: 'BTech, Data Science & Artificial Intelligence',
    detail: 'CGPA 9.19 · Director’s Gold Medal',
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
  { label: 'Document retrieval vs SOTA', context: 'Custom vision embedding model · Nanonets', value: 30, display: '+30%', direction: 'up' },
  { label: 'Label acquisition speed', context: 'Human-in-the-loop + active learning · Nanonets', value: 70, display: '+70%', direction: 'up' },
  { label: 'Speaker diarization vs existing', context: 'Whisper + PyAnnote · IIT Bombay', value: 65, display: '+65%', direction: 'up' },
  { label: 'Energy consumption', context: 'Lung-nodule CNNs, near-zero accuracy loss · NIT Puducherry', value: 77, display: '−77%', direction: 'down' },
  { label: 'Emotion recognition accuracy', context: 'AffectBots, 100+ hrs multimodal data · IIT Bombay', value: 88, display: '88%', direction: 'abs' },
  { label: 'Ingestion reliability', context: '100,000+ conversations · Vocab.Ai', value: 98, display: '98%', direction: 'abs' },
  { label: 'Forecast accuracy vs baseline', context: 'Multimodal stock prediction · IIT Madras', value: 25, display: '+25%', direction: 'up' },
];

export type Cluster = { id: string; label: string; color: string; center: [number, number, number] };

export const clusters: Cluster[] = [
  { id: 'docai', label: 'Document AI & VLMs', color: '#22d3ee', center: [-4.6, 0.9, 0.6] },
  { id: 'agents', label: 'LLMs & Agents', color: '#a78bfa', center: [-0.8, 2.6, -1.6] },
  { id: 'affect', label: 'Speech & Affective AI', color: '#fb7185', center: [3.8, 1.3, 0.4] },
  { id: 'efficient', label: 'Efficient & Medical DL', color: '#a3e635', center: [0.9, -2.9, 1.6] },
  { id: 'forecast', label: 'Time Series', color: '#fbbf24', center: [-3.6, -2.5, -1.2] },
  { id: 'cp', label: 'Competition & Honours', color: '#e2e8f0', center: [4.4, -1.5, -1.0] },
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
  { id: 'nanonets', label: 'Nanonets', kind: 'work', cluster: 'docai', detail: 'Deep Learning Engineer. Agentic memory pipelines and fine-tuned VLMs for enterprise document extraction.', url: 'https://nanonets.com' },
  { id: 'embed', label: 'Vision embeddings', kind: 'project', cluster: 'docai', detail: 'Contrastive fine-tuning of SigLIP / Qwen2.5-VL; a custom model beating SOTA by 30% on document retrieval.' },
  { id: 'hil', label: 'HIL annotation', kind: 'project', cluster: 'docai', detail: 'Active-learning annotation pipeline with custom UIs: 70% faster high-quality labels.' },
  { id: 'memory', label: 'Agentic memory', kind: 'project', cluster: 'agents', detail: 'Multi-tiered memory driven by real-time user feedback, so agents adapt to evolving rules without instruction conflicts.' },
  { id: 'vocab', label: 'Vocab.Ai', kind: 'work', cluster: 'agents', detail: 'MLOps Intern. Fine-tuned LLaMA 2 & GPT-3.5 for conversation scoring over 100k+ conversations.' },
  { id: 'centio', label: 'Centio.AI', kind: 'project', cluster: 'agents', detail: 'Conversational AI with task automation, research and document management.', url: 'https://github.com/VinayakRai5/Centio.AI' },
  { id: 'tale', label: 'TALE 2024 · Best Paper', kind: 'paper', cluster: 'affect', gold: true, detail: 'Advancing Speaker Diarization With Whisper Speech Recognition for Different Learning Environments.', url: 'https://doi.org/10.1109/TALE62452.2024.10834319' },
  { id: 't4e25', label: 'T4E 2025', kind: 'paper', cluster: 'affect', detail: 'Exploring Emotional Trajectories through Valence and Arousal in Open-Ended Math Learning Environments.' },
  { id: 't4e24', label: 'T4E 2024', kind: 'paper', cluster: 'affect', detail: 'Unlocking the Triggers: automating identification of SSMR triggers in collaborative problem-solving.', url: 'https://doi.org/10.1007/978-981-95-1734-3_6' },
  { id: 'iitb', label: 'IIT Bombay', kind: 'work', cluster: 'affect', detail: 'Research Intern. AffectBots multimodal tutoring and Indo-English speaker diarization.' },
  { id: 'schooling', label: 'Accessible schooling', kind: 'project', cluster: 'affect', detail: 'Gaze + expression CV pipeline adapting content for specially-abled students. 1st of 50 teams.', url: 'https://github.com/PlatJack/DRS-Hackathon-2' },
  { id: 'crypto', label: 'Trader emotion monitor', kind: 'project', cluster: 'affect', detail: 'Monitors traders’ emotional state and delivers personalised interventions.', url: 'https://github.com/hackfest-dev/HF24-Nexus' },
  { id: 'indiscon', label: 'INDISCON 2025', kind: 'paper', cluster: 'efficient', detail: 'Energy-Efficient Depthwise Separable CNNs for Classification and Segmentation of Lung Cancer Nodules.', url: 'https://doi.org/10.1109/INDISCON66021.2025.11254247' },
  { id: 'nitpy', label: 'NIT Puducherry', kind: 'work', cluster: 'efficient', detail: 'Deep Learning Intern. Pruning + quantization for 77% lower energy on LIDC-IDRI.' },
  { id: 'iitm', label: 'IIT Madras', kind: 'work', cluster: 'forecast', detail: 'Research Intern at RBCDSAI. Multimodal stock prediction with sentiment, news and technicals.' },
  { id: 'codechef', label: 'CodeChef #19 global', kind: 'award', cluster: 'cp', detail: 'Global rank 19 in CodeChef Starters 57; peak 4★ rating.' },
  { id: 'leetcode', label: 'LeetCode top 3%', kind: 'award', cluster: 'cp', detail: 'Ranked within the top 3% of global participants.' },
  { id: 'gold', label: 'Director’s Gold Medal', kind: 'award', cluster: 'cp', gold: true, detail: 'Best Outgoing Student, IIIT Dharwad, Batch of 2025.' },
];
