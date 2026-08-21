# 🤖 AXEL

> **An AI-powered multi-source knowledge assistant built with FastAPI, React, RAG, Gemini, Groq and ChromaDB.**

AXEL is an intelligent AI assistant that can chat with users, analyze multiple types of content, build a knowledge base from different sources, and answer questions using Retrieval-Augmented Generation (RAG).

The goal of AXEL is to provide a single interface where users can interact with AI models and provide different knowledge sources such as websites, GitHub repositories, YouTube videos, documents, images, and folders.

---

## ✨ Features

### 💬 AI Chat

AXEL supports conversational AI using multiple providers.

- Google Gemini
- Groq
- Multiple AI model selection
- Session-based conversation memory
- Automatic conversation history
- Context-aware responses

---

## 🧠 RAG (Retrieval-Augmented Generation)

Users can provide knowledge sources and AXEL converts them into a searchable vector database.

Workflow:

```text
Input Source
     ↓
Content Extraction
     ↓
Text Chunking
     ↓
Embeddings
     ↓
ChromaDB Vector Storage
     ↓
Semantic Search
     ↓
Relevant Context
     ↓
Gemini / Groq
     ↓
Final Answer
```

This allows AXEL to answer questions based on the uploaded or ingested knowledge instead of relying only on the AI model's general knowledge.

---

## 📚 Supported Knowledge Sources

AXEL can process multiple input types.

### 🌐 Websites

Provide a website URL and AXEL extracts its content for querying.

```text
https://example.com
```

---

### ▶️ YouTube Videos

Provide a YouTube URL.

```text
https://youtube.com/...
```

AXEL extracts available content/transcripts and creates a searchable knowledge source.

---

### 💻 GitHub Repositories

Provide a GitHub repository URL.

```text
https://github.com/user/repository
```

AXEL can ingest repository content and allow users to ask questions about the project.

---

### 📄 Documents

Supported document formats include:

- PDF
- DOCX
- PPTX
- XLSX
- XLS
- CSV
- TXT
- Markdown

Users can upload documents and ask questions based on their content.

---

### 🖼️ Images

AXEL supports image analysis using AI vision models.

It can analyze:

- UI screenshots
- Code screenshots
- Error messages
- Documents
- Tables
- Charts
- Text inside images
- General scenes and objects

The AI generates a structured description of the uploaded image.

---

### 📁 Folders

AXEL can process supported content from folders and convert it into a searchable knowledge source.

---

## 👁️ AI Vision

AXEL includes image understanding capabilities.

The system can analyze an image and identify:

1. Overall scene
2. Objects
3. UI elements
4. Code
5. Error messages
6. Tables
7. Charts
8. Documents
9. Visible text
10. Important details

This makes AXEL useful for debugging screenshots, analyzing interfaces, reading documents, and understanding visual content.

---

## 🧠 Conversation Memory

AXEL maintains session-based conversation memory.

The assistant can use recent conversation history to provide context-aware responses.

Example:

```text
User: Explain this project.

AXEL: This project is a React application...

User: What technology does it use?

AXEL understands that "it" refers to the previously discussed project.
```

Each session maintains its own conversation context.

---

## 🔀 AI Provider Support

AXEL supports multiple AI providers.

### Google Gemini

Used for:

- General chat
- RAG responses
- Image analysis

### Groq

Used as an alternative AI provider for fast inference.

The architecture allows switching between providers and models.

```text
User
  ↓
Provider Selection
  ↓
Gemini / Groq
  ↓
AI Response
```

---

## 🧩 Smart Input Classification

AXEL automatically detects the type of user input.

Supported classifications include:

```text
YouTube URL
Website URL
GitHub Repository
Document
Image
Folder
Normal Chat
```

Example:

```text
YouTube URL
      ↓
YouTube Ingestion

Website URL
      ↓
Website Ingestion

GitHub URL
      ↓
Repository Ingestion

Document
      ↓
Document Processing

Image
      ↓
Vision Analysis

Normal Message
      ↓
Chat / RAG
```

---

## 🗄️ Vector Database

AXEL uses **ChromaDB** for semantic search and knowledge retrieval.

The pipeline:

```text
Text
 ↓
Chunking
 ↓
SentenceTransformer Embeddings
 ↓
Vector Database
 ↓
Similarity Search
 ↓
Relevant Context
 ↓
LLM
```

Current embedding model:

```text
all-MiniLM-L6-v2
```

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- CSS
- Axios

### Backend

- Python
- FastAPI
- Uvicorn

### AI & LLM

- Google Gemini API
- Groq API

### RAG

- Sentence Transformers
- ChromaDB
- Semantic Search

### Other Tools

- Docker
- Docker Compose
- Git & GitHub
- Environment Variables

---

# 🏗️ Project Architecture

```text
AXEL
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   │
│   ├── auth/
│   │
│   ├── core/
│   │   ├── chat.py
│   │   ├── classifier.py
│   │   ├── dependencies.py
│   │   ├── rag.py
│   │   ├── router.py
│   │   └── session.py
│   │
│   ├── database/
│   │
│   ├── memory/
│   │
│   ├── payment/
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │   ├── ingest.py
│   │   ├── chunking.py
│   │   └── image_generation.py
│   │
│   ├── uploads/
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── chroma_db/
│
├── .env
├── .gitignore
├── .dockerignore
├── docker-compose.yml
└── README.md
```

---

# 🔄 Request Flow

## Normal Chat

```text
User Message
     ↓
Input Classifier
     ↓
Check Knowledge Sources
     ↓
RAG Search (if available)
     ↓
Gemini / Groq
     ↓
Response
```

If no knowledge source is loaded:

```text
User
 ↓
Chat Engine
 ↓
Gemini / Groq
 ↓
Response
```

---

## Knowledge-Based Question

```text
User Question
      ↓
Session Collections
      ↓
ChromaDB Search
      ↓
Relevant Chunks
      ↓
Conversation Context
      ↓
LLM Prompt
      ↓
Gemini / Groq
      ↓
Final Answer
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AXEL
```

---

## 2. Environment Setup

Create a `.env` file in the project root.

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

If authentication or payment services require additional environment variables, add them according to your backend configuration.

---

## 3. Run Without Docker

### Backend

Create and activate a virtual environment:

```bash
python -m venv .venv
```

Mac/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Run FastAPI:

```bash
uvicorn backend.main:app --reload
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🐳 Run with Docker

AXEL can run using Docker Compose.

Make sure Docker Desktop is running.

From the project root:

```bash
docker compose up --build
```

Services:

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:8000` |
| API Docs | `http://localhost:8000/docs` |

To stop containers:

```bash
docker compose down
```

To rebuild:

```bash
docker compose up --build
```

---

# 🔐 Environment Variables

Example:

```env
GEMINI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

⚠️ Never commit your `.env` file to GitHub.

---

# 📡 API Overview

## Send Message

```http
POST /message
```

Example request:

```json
{
  "message": "Explain this topic",
  "provider": "gemini",
  "model": null
}
```

---

## Upload File

```http
POST /upload
```

Supports provider and model selection.

The backend processes the uploaded file and routes it to the appropriate ingestion or vision pipeline.

---

## Authentication

AXEL includes authentication routes for user-related functionality.

Authentication logic is separated from the core AI pipeline.

---

## Payments

Payment functionality is handled through a dedicated backend router.

```text
backend/payment/
```

This keeps payment-related functionality isolated from the AI and RAG systems.

---

# 🎯 Key Design Goals

AXEL is designed to be:

- Modular
- Multi-provider
- Multi-source
- Extensible
- Session-aware
- RAG-powered
- Easy to deploy

The architecture separates:

```text
UI
 ↓
API
 ↓
Router
 ↓
Input Classification
 ↓
Chat / RAG / Vision / Ingestion
 ↓
AI Provider
 ↓
Response
```

---

# 🔮 Future Improvements

Potential improvements include:

- Streaming AI responses
- More AI providers
- Local LLM support
- Advanced agent workflows
- Web search integration
- Better document parsing
- OCR improvements
- Multi-modal RAG
- Knowledge source management UI
- Persistent user chat history
- Cloud deployment
- Usage analytics
- Rate limiting
- Background ingestion for large files
- Production-ready Docker deployment

---

# 👨‍💻 Author

**Saarthak Pandey**

Built as a personal AI assistant and multi-source RAG platform combining conversational AI, knowledge retrieval, image understanding, and multiple AI providers.

---

## ⭐ If You Like AXEL

Consider giving the repository a star and following the project's development.