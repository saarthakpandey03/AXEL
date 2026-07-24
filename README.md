# 🚀 AXEL – AI Workspace

AXEL is a next-generation AI workspace that allows users to interact with multiple knowledge sources using local LLMs. Instead of being just another chatbot, AXEL acts as a unified AI assistant capable of understanding documents, websites, GitHub repositories, YouTube videos, images, and more.

Built with **FastAPI**, **Ollama**, **LangChain**, **ChromaDB**, **Redis**, and a modern **React** frontend.

---

## ✨ Features

### 🤖 AI Chat
- General AI Chat (Llama 3)
- Context-aware conversations
- Session-based memory
- Multi-turn conversations

### 📚 Retrieval-Augmented Generation (RAG)
- PDF Support
- DOCX Support
- PPTX Support
- TXT / Markdown
- CSV / Excel
- Website Indexing
- GitHub Repository Indexing
- YouTube Transcript Indexing
- Folder Indexing
- Multi-document Search

### 🖼 Vision
- Image Captioning (LLaVA)
- OCR Text Extraction
- Image Understanding

### ⚡ Backend
- FastAPI REST API
- ChromaDB Vector Database
- Sentence Transformers
- Redis Session Management
- LangChain Pipelines
- Ollama Local LLM Integration

### 💻 Frontend (In Progress)
- Modern AI Workspace UI
- Interactive Landing Page
- Animated Particle Blob
- Chat Interface
- Drag & Drop Upload
- Session History

---

# 🏗 Tech Stack

## Backend

- FastAPI
- LangChain
- Ollama
- ChromaDB
- Redis
- Sentence Transformers
- OpenCV
- EasyOCR
- PyPDF
- Python

## Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Three Fiber
- Drei

---

# 📁 Project Structure

```
AXEL/
│
├── backend/
│   ├── core/
│   ├── database/
│   ├── loaders/
│   ├── memory/
│   ├── models/
│   ├── parsers/
│   ├── services/
│   ├── storage/
│   ├── vision/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── requirements.txt
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/AXEL.git
cd AXEL
```

---

## Backend Setup

Create Virtual Environment

```bash
python -m venv .venv
```

Activate

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Install Ollama

Install Ollama from:

https://ollama.com

Pull required models

```bash
ollama pull llama3
ollama pull llava
```

---

## Start Redis

```bash
redis-server
```

---

## Run Backend

```bash
uvicorn backend.main:app --reload
```

API

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| POST /message | Chat with AXEL |
| POST /upload | Upload Documents / Images |
| GET / | Health Check |

---

# 🛣 Roadmap

## ✅ Completed

- FastAPI Backend
- Local LLM Integration
- ChromaDB
- Redis Sessions
- Multi-source RAG
- Image Understanding
- OCR
- Multi-document Retrieval

---

## 🚧 In Progress

- React Frontend
- Interactive Landing Page
- Animated AI Blob
- Workspace UI
- Streaming Responses

---

## 🔮 Planned

- Voice Assistant
- Whisper Integration
- Image Generation
- AI Agents
- SQL Agent
- Code Interpreter
- Web Search
- Authentication
- Docker Deployment
- Cloud Deployment

---

# 📸 Screenshots

Coming Soon

---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome.

Feel free to open issues or submit pull requests.

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Saarthak Pandey**

Building **AXEL** — an AI Workspace designed to become your second brain.
