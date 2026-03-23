export const projectData = [
    {
        title: 'National Exam Resource Platform',
        slug: 'student-hub',
        category: 'Full Stack & AI',
        description: 'AI-powered exam ecosystem that converts static Ethiopian national exam papers into interactive, auto-graded mock exams with analytics for students and administrators.',
        shortDescription:
            'A high-performance, AI-powered educational ecosystem that transforms static national exam PDFs into interactive, auto-graded mock exams, backed by dashboards for students and administrators.',
        challenge:
            'Students rely on static, scattered exam PDFs with no feedback, no timing simulation, and no central dashboard. Manually digitizing thousands of exam variants is slow and error-prone.',
        architecturePoints: [
            'Decoupled three-tier architecture for high availability and responsiveness.',
            'Client layer built with Next.js + Tailwind CSS powering landing hub, student dashboard, and admin panel.',
            'Logic layer on FastAPI with async REST endpoints and background tasks for heavy AI processing.',
            'Data & AI layer using PostgreSQL/SQLAlchemy for relational modeling and Gemini/OpenAI for exam extraction.',
        ],
        techDetails: {
            Frontend: ['Next.js (React)', 'TailwindCSS', 'Framer Motion', 'Lucide Icons'],
            Backend: ['FastAPI', 'Uvicorn', 'Pydantic'],
            Database: ['PostgreSQL', 'SQLAlchemy', 'Alembic'],
            AI: ['Google Gemini Pro', 'OpenAI GPT-4o', 'Prompt Engineering'],
            Infra: ['SMTP', 'JWT Auth', 'Asyncio/Threading'],
        },
        tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'GPT-4o'],
        url: 'https://ethioexamhub-frontend-getw.vercel.app/login', // TODO: replace with live deployment URL
        featured: true,
    },
    {
        title: 'Insurance Risk Analytics',
        slug: 'Insurance-Risk-Analytics',
        category: 'Data Science',
        description: 'Built predictive models for insurance claims. Performed EDA, hypothesis testing, and loss analysis.',
        tech: ['Python', 'CI/CD', 'Git', 'DVC'],
        url: 'https://github.com/nigus21/Insurance-risk-analytics', // TODO: replace with live deployment URL
    },
    {
        title: 'Consumer Complaint Intelligence System (RAG)',
        slug: 'Intelligent-Complaint-Analysis',
        category: 'AI',
        description:
            'Enterprise-grade RAG analytics platform that ingests 6GB+ of unstructured consumer complaints and turns them into grounded, explainable insights for compliance teams.',
        shortDescription:
            'An enterprise RAG system for CrediTrust Financial that compresses 4.5M+ consumer complaints into interactive, grounded insights while respecting strict on-prem and Windows constraints.',
        challenge:
            'Compliance teams manually parsed millions of complaint records with poor keyword tools, causing long audit cycles and missed patterns, while cloud LLMs conflicted with enterprise Windows deployments and privacy rules.',
        architecturePoints: [
            'Modular “retrieval-first” architecture optimized for local, enterprise hardware.',
            'Data engineering layer performs streaming ETL, PII redaction, and silo segmentation by product line.',
            'Semantic memory uses all-MiniLM-L6-v2 embeddings stored in ChromaDB with ONNX Runtime + DirectML GPU acceleration.',
            'RAG pipeline built around a context-locked Flan-T5 synthesis engine that grounds every answer in specific complaint IDs.',
        ],
        techDetails: {
            'AI & NLP': ['Google Flan-T5', 'Sentence-Transformers (all-MiniLM-L6-v2)', 'LangChain'],
            'Vector Engine': ['ChromaDB', 'ONNX Runtime', 'DirectML'],
            'Data Science': ['Python 3.12', 'Pandas (streaming IO)', 'Parquet', 'NumPy'],
            Interface: ['Gradio'],
            DevOps: ['Git', 'Batch Processing Scripts', 'Windows ML Deployment'],
        },
        tech: ['RAG', 'ChromaDB', 'Flan-T5', 'Sentence-Transformers'],
        url: 'https://github.com/nigus21/Rag-Complaint-Analysis', // TODO: replace with live demo or internal video URL
    },
    {
        title: 'RAG-Based Customer Feedback Chatbot',
        slug: 'RAG-Based-Customer-Feedback-Chatbot',
        category: 'AI',
        description: 'Converts customer feedback into actionable insights using Retrieval-Augmented Generation.',
        tech: ['RAG', 'LLMs', 'Vector DB'],
    },
    {
        title: 'IT Salary Survey Analysis (EU)',
        slug: 'IT-Salary-Survey-Analysis',
        category: 'Data Science',
        description: 'Analyzed salary trends, gender gaps, and influencing factors. Created data visualizations.',
        tech: ['Python', 'Pandas', 'Data Viz'],
    },
];
