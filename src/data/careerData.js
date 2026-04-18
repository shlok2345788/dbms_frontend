export const careers = [
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'Engineering',
    experience: 'Mid-Level',
    salary: '$120k-$180k',
    growth: '35% (2024-2030)',
    description: 'Design, train, and deploy production-grade machine learning systems.',
    skills: ['Python', 'Machine Learning', 'PyTorch', 'MLOps', 'Cloud'],
    tools: ['Python', 'PyTorch', 'MLflow', 'Docker', 'Kubernetes', 'AWS'],
    responsibilities: [
      'Build and optimize ML pipelines for training and inference.',
      'Collaborate with product and data teams to solve business problems.',
      'Deploy and monitor models with reliability and scalability.',
      'Improve model quality through experimentation and evaluation.'
    ],
    education: ['BS/MS in CS, AI, or related field', 'Strong statistics and linear algebra foundation'],
    related: ['data-scientist', 'mlops-engineer', 'ai-research-scientist']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Analytics',
    experience: 'Mid-Level',
    salary: '$110k-$170k',
    growth: '31% (2024-2030)',
    description: 'Extract insights from data and build predictive models for strategic decisions.',
    skills: ['Python', 'Statistics', 'SQL', 'Machine Learning', 'Data Visualization'],
    tools: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Tableau', 'Jupyter'],
    responsibilities: [
      'Analyze datasets and identify high-impact opportunities.',
      'Develop predictive models and communicate findings.',
      'Define metrics and run experiments with stakeholders.',
      'Create dashboards and insight reports for business teams.'
    ],
    education: ['BS/MS in Data Science, Math, CS, or related field', 'Knowledge of probability and experimentation'],
    related: ['ml-engineer', 'ai-consultant', 'ai-product-manager']
  },
  {
    id: 'ai-research-scientist',
    title: 'AI Research Scientist',
    category: 'Research',
    experience: 'Senior',
    salary: '$150k-$240k',
    growth: '28% (2024-2030)',
    description: 'Invent and evaluate novel algorithms in deep learning and generative AI.',
    skills: ['Deep Learning', 'LLMs', 'Mathematics', 'PyTorch', 'Research Writing'],
    tools: ['PyTorch', 'JAX', 'Weights & Biases', 'Python', 'Linux'],
    responsibilities: [
      'Design new model architectures and training methods.',
      'Run large-scale experiments and ablations.',
      'Publish findings and contribute to open-source research.',
      'Collaborate with engineering to bring research into products.'
    ],
    education: ['MS/PhD in AI, ML, CS, or related field', 'Track record of research papers or patents'],
    related: ['nlp-engineer', 'computer-vision-engineer', 'ml-engineer']
  },
  {
    id: 'nlp-engineer',
    title: 'NLP Engineer',
    category: 'Engineering',
    experience: 'Mid-Level',
    salary: '$125k-$190k',
    growth: '34% (2024-2030)',
    description: 'Develop language understanding and generation systems for intelligent products.',
    skills: ['NLP', 'Python', 'LLMs', 'Deep Learning', 'MLOps'],
    tools: ['Transformers', 'PyTorch', 'spaCy', 'LangChain', 'Vector DBs'],
    responsibilities: [
      'Build and fine-tune NLP/LLM pipelines.',
      'Evaluate model outputs with qualitative and quantitative metrics.',
      'Design retrieval and prompt workflows for production use.',
      'Improve safety and robustness of language systems.'
    ],
    education: ['BS/MS in CS, Computational Linguistics, or related field', 'Experience with transformer-based models'],
    related: ['prompt-engineer', 'ai-research-scientist', 'ml-engineer']
  },
  {
    id: 'computer-vision-engineer',
    title: 'Computer Vision Engineer',
    category: 'Engineering',
    experience: 'Mid-Level',
    salary: '$130k-$195k',
    growth: '30% (2024-2030)',
    description: 'Create image/video intelligence systems for detection, segmentation, and tracking.',
    skills: ['Computer Vision', 'Deep Learning', 'Python', 'PyTorch', 'MLOps'],
    tools: ['OpenCV', 'PyTorch', 'TensorFlow', 'CUDA', 'ONNX'],
    responsibilities: [
      'Develop CV models for detection and classification tasks.',
      'Optimize inference speed and deployment performance.',
      'Build data labeling and augmentation pipelines.',
      'Maintain reliability across challenging real-world conditions.'
    ],
    education: ['BS/MS in CS, Robotics, EE, or related field', 'Strong linear algebra and image processing knowledge'],
    related: ['robotics-engineer', 'ml-engineer', 'ai-research-scientist']
  },
  {
    id: 'ai-product-manager',
    title: 'AI Product Manager',
    category: 'Product',
    experience: 'Mid-Level',
    salary: '$135k-$210k',
    growth: '29% (2024-2030)',
    description: 'Define AI product strategy and align model capabilities with user value.',
    skills: ['Product Thinking', 'Data Analysis', 'AI Fundamentals', 'Roadmapping', 'Communication'],
    tools: ['Jira', 'Amplitude', 'SQL', 'Figma', 'Notion'],
    responsibilities: [
      'Define product vision, roadmap, and success metrics.',
      'Translate AI constraints into clear product decisions.',
      'Coordinate cross-functional delivery with engineering and design.',
      'Measure outcomes and iterate on user feedback.'
    ],
    education: ['BS in technical or business field', 'Experience shipping digital products'],
    related: ['ai-consultant', 'data-scientist', 'ai-trainer']
  },
  {
    id: 'mlops-engineer',
    title: 'MLOps Engineer',
    category: 'Engineering',
    experience: 'Senior',
    salary: '$130k-$200k',
    growth: '38% (2024-2030)',
    description: 'Operationalize ML systems with CI/CD, observability, and model governance.',
    skills: ['MLOps', 'Cloud', 'Python', 'Docker', 'Kubernetes'],
    tools: ['Kubeflow', 'MLflow', 'Docker', 'Kubernetes', 'AWS/GCP'],
    responsibilities: [
      'Build robust ML deployment and monitoring infrastructure.',
      'Automate retraining, validation, and rollback workflows.',
      'Manage feature stores and model registries.',
      'Ensure compliance, reliability, and cost efficiency.'
    ],
    education: ['BS in CS or related field', 'DevOps and cloud engineering experience'],
    related: ['ml-engineer', 'cloud-architect', 'ai-research-scientist']
  },
  {
    id: 'ai-ethics-specialist',
    title: 'AI Ethics Specialist',
    category: 'Research',
    experience: 'Mid-Level',
    salary: '$110k-$170k',
    growth: '26% (2024-2030)',
    description: 'Design governance frameworks for fairness, privacy, and responsible AI use.',
    skills: ['AI Governance', 'Policy', 'Risk Assessment', 'Bias Evaluation', 'Communication'],
    tools: ['Model Cards', 'Fairness Toolkits', 'Audit Frameworks', 'Documentation Systems'],
    responsibilities: [
      'Develop responsible AI standards and controls.',
      'Audit model behavior for bias and safety risks.',
      'Guide teams on privacy and regulatory requirements.',
      'Create transparent reporting for stakeholders.'
    ],
    education: ['BS/MS in CS, policy, law, or ethics-related field', 'Knowledge of AI regulations and compliance'],
    related: ['ai-consultant', 'ai-product-manager', 'ai-research-scientist']
  },
  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    category: 'Engineering',
    experience: 'Senior',
    salary: '$120k-$190k',
    growth: '27% (2024-2030)',
    description: 'Build intelligent robotic systems combining hardware, software, and machine learning.',
    skills: ['Robotics', 'Computer Vision', 'Python', 'Control Systems', 'ROS'],
    tools: ['ROS', 'Gazebo', 'OpenCV', 'C++', 'Python'],
    responsibilities: [
      'Develop robot perception and control systems.',
      'Simulate and test robotic behavior in varied environments.',
      'Integrate hardware sensors with AI inference pipelines.',
      'Improve safety and reliability in deployment settings.'
    ],
    education: ['BS/MS in Robotics, ME, EE, or CS', 'Strong control systems fundamentals'],
    related: ['computer-vision-engineer', 'ml-engineer', 'ai-research-scientist']
  },
  {
    id: 'prompt-engineer',
    title: 'Prompt Engineer',
    category: 'Product',
    experience: 'Entry-Level',
    salary: '$95k-$160k',
    growth: '42% (2024-2030)',
    description: 'Design prompt and workflow systems that improve LLM reliability and output quality.',
    skills: ['LLMs', 'Prompt Design', 'NLP', 'Evaluation', 'Domain Knowledge'],
    tools: ['OpenAI APIs', 'LangChain', 'Prompt Testing Tools', 'Vector Databases'],
    responsibilities: [
      'Design, test, and optimize prompt templates.',
      'Build retrieval-augmented workflows for factuality.',
      'Define evaluation benchmarks and quality thresholds.',
      'Document best practices for team-wide reuse.'
    ],
    education: ['BS in any analytical discipline', 'Experience with LLM APIs and prompt evaluation'],
    related: ['nlp-engineer', 'ai-trainer', 'ai-product-manager']
  },
  {
    id: 'ai-trainer',
    title: 'AI Trainer',
    category: 'Analytics',
    experience: 'Entry-Level',
    salary: '$80k-$135k',
    growth: '25% (2024-2030)',
    description: 'Curate, label, and refine data and feedback loops to improve AI systems.',
    skills: ['Data Annotation', 'Prompt Evaluation', 'Domain Expertise', 'Quality Control', 'NLP'],
    tools: ['Annotation Platforms', 'LLM Evaluation Suites', 'Spreadsheet Tools'],
    responsibilities: [
      'Label and validate training data quality.',
      'Create rubric-driven evaluation for model outputs.',
      'Partner with research teams on failure modes.',
      'Improve model quality via feedback loops.'
    ],
    education: ['BS or equivalent practical experience', 'Strong language and analytical skills'],
    related: ['prompt-engineer', 'data-scientist', 'ai-ethics-specialist']
  },
  {
    id: 'ai-consultant',
    title: 'AI Consultant',
    category: 'Product',
    experience: 'Senior',
    salary: '$140k-$230k',
    growth: '33% (2024-2030)',
    description: 'Guide organizations in AI strategy, implementation planning, and value realization.',
    skills: ['AI Strategy', 'Business Analysis', 'Data Literacy', 'Communication', 'Change Management'],
    tools: ['BI Tools', 'Roadmapping Software', 'Cloud Platforms', 'Presentation Tools'],
    responsibilities: [
      'Assess AI readiness and define transformation roadmap.',
      'Recommend architecture, teams, and execution plans.',
      'Align AI initiatives with business KPIs.',
      'Coach stakeholders on adoption and governance.'
    ],
    education: ['BS/MS in business, engineering, or analytics', 'Consulting or product leadership experience'],
    related: ['ai-product-manager', 'data-scientist', 'ai-ethics-specialist']
  }
];

export const skills = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    demand: 96,
    description: 'Core language for data pipelines, model training, and AI services.',
    path: ['Syntax and data structures', 'NumPy and Pandas', 'APIs and automation projects'],
    resources: [
      { label: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/' },
      { label: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/' }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Core AI',
    demand: 95,
    description: 'Foundations of supervised and unsupervised learning with model evaluation.',
    path: ['Regression and classification', 'Model metrics and validation', 'Capstone with real datasets'],
    resources: [
      { label: 'Andrew Ng ML Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
      { label: 'Scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' }
    ]
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'Core AI',
    demand: 93,
    description: 'Neural networks, optimization, and advanced representation learning.',
    path: ['Neural net fundamentals', 'CNNs/RNNs/Transformers', 'Performance tuning'],
    resources: [
      { label: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/' },
      { label: 'Fast.ai', url: 'https://course.fast.ai/' }
    ]
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    category: 'Core AI',
    demand: 91,
    description: 'Text understanding, generation, and retrieval workflows.',
    path: ['Text preprocessing', 'Transformers and embeddings', 'RAG systems'],
    resources: [
      { label: 'Hugging Face Course', url: 'https://huggingface.co/learn' },
      { label: 'spaCy Training', url: 'https://spacy.io/usage/training' }
    ]
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'Core AI',
    demand: 88,
    description: 'Image/video-based AI for detection, tracking, and segmentation.',
    path: ['Image processing basics', 'Detection models', 'Deployment optimization'],
    resources: [
      { label: 'OpenCV Docs', url: 'https://docs.opencv.org/' },
      { label: 'Papers With Code CV', url: 'https://paperswithcode.com/area/computer-vision' }
    ]
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'Frameworks',
    demand: 82,
    description: 'Production-ready deep learning framework for scalable model development.',
    path: ['Keras model building', 'Custom training loops', 'Serving and deployment'],
    resources: [
      { label: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' },
      { label: 'TensorFlow Hub', url: 'https://www.tensorflow.org/hub' }
    ]
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'Frameworks',
    demand: 90,
    description: 'Research-friendly deep learning framework with strong ecosystem support.',
    path: ['Tensor fundamentals', 'Model training workflows', 'Distributed training basics'],
    resources: [
      { label: 'PyTorch Learn', url: 'https://pytorch.org/tutorials/' },
      { label: 'Lightning AI', url: 'https://lightning.ai/' }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics',
    category: 'Math',
    demand: 87,
    description: 'Probability, inference, and experimentation for robust model design.',
    path: ['Probability basics', 'Hypothesis testing', 'A/B testing projects'],
    resources: [
      { label: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
      { label: 'Think Stats Book', url: 'https://greenteapress.com/wp/think-stats-2e/' }
    ]
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data',
    demand: 86,
    description: 'Essential for querying, transforming, and validating structured data.',
    path: ['SELECT and joins', 'Window functions', 'Analytics use cases'],
    resources: [
      { label: 'SQLBolt', url: 'https://sqlbolt.com/' },
      { label: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Platforms',
    category: 'Infrastructure',
    demand: 84,
    description: 'Use AWS/GCP/Azure for scalable model training and serving.',
    path: ['Core services', 'Container deployment', 'Cost and reliability optimization'],
    resources: [
      { label: 'AWS ML Learning Plan', url: 'https://aws.amazon.com/training/learn-about/machine-learning/' },
      { label: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/' }
    ]
  },
  {
    id: 'mlops',
    name: 'MLOps',
    category: 'Infrastructure',
    demand: 89,
    description: 'Automate CI/CD, model registry, monitoring, and retraining workflows.',
    path: ['Model lifecycle basics', 'CI/CD for ML', 'Observability and governance'],
    resources: [
      { label: 'Made With ML', url: 'https://madewithml.com/' },
      { label: 'MLOps Guide', url: 'https://ml-ops.org/' }
    ]
  },
  {
    id: 'llms',
    name: 'Large Language Models',
    category: 'Core AI',
    demand: 97,
    description: 'Prompting, fine-tuning, and retrieval workflows for modern AI products.',
    path: ['Prompt patterns', 'RAG architecture', 'Evaluation and safety'],
    resources: [
      { label: 'OpenAI Platform Docs', url: 'https://platform.openai.com/docs' },
      { label: 'LangChain Docs', url: 'https://python.langchain.com/docs/' }
    ]
  }
];

export const categories = ['All', 'Engineering', 'Research', 'Analytics', 'Product'];
export const skillCategories = ['All', 'Programming', 'Core AI', 'Frameworks', 'Math', 'Data', 'Infrastructure'];

export const assessmentQuestions = [
  {
    id: 1,
    title: 'Which domain excites you the most?',
    options: ['Building AI products', 'Researching new algorithms', 'Analyzing data for business insights', 'Designing AI systems at scale']
  },
  {
    id: 2,
    title: 'How would you rate your technical skill level?',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  {
    id: 3,
    title: 'What is your educational background?',
    options: ['Computer Science or Engineering', 'Mathematics or Statistics', 'Business or Management', 'Other']
  },
  {
    id: 4,
    title: 'What work environment do you prefer?',
    options: ['Fast-paced product teams', 'Research labs', 'Client-facing strategic projects', 'Cross-functional operations']
  },
  {
    id: 5,
    title: 'Which tasks do you enjoy most?',
    options: ['Coding and deployment', 'Experimentation and papers', 'Problem framing and dashboards', 'Roadmapping and stakeholder alignment']
  },
  {
    id: 6,
    title: 'What is your near-term career goal?',
    options: ['Get my first AI role', 'Specialize deeply in one area', 'Lead AI product initiatives', 'Consult across industries']
  }
];
