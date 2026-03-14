# Technical Architecture

## 1. System Overview
The AI GTM Engine is a multi-agent system designed to automate the Go-To-Market workflow. It consists of a **Next.js** frontend, a **FastAPI** backend, and a series of specialized **AI Agents** orchestrated by **LangChain**.

## 2. Tech Stack
- **Frontend**: Next.js 16 (App Router), Tailwind CSS 4.0, Framer Motion, Lucide Icons.
- **Backend**: FastAPI, Uvicorn, Python 3.10+.
- **Database**: SQLite (via SQLAlchemy) for high-speed local persistence.
- **AI Orchestration**: LangChain (integrating Google Gemini).

## 3. Component Breakdown

### Frontend (Next.js)
The frontend serves as the command center. It uses a **Next.js Proxy** to securely route API calls to the Python backend without exposing internal infrastructure.

### Backend (FastAPI)
The backend is purely asynchronous. It handles:
- Persistence of research and call logs.
- Coordination of LLM prompts.
- Integration with external service providers (Hunter.io, Vapi).

### Intelligence Layer (LangChain & Gemini 1.5 Flash)
We use Gemini 1.5 Flash for its high speed and large context window.
- **Lead Agent**: Researches companies using DuckDuckGo.
- **Content Agent**: Generates social media strategies.
- **Voice Agent**: Connects to Vapi for autonomous phone calls.

## 4. External APIs
| Provider | Purpose |
| :--- | :--- |
| **Google Gemini** | Core Reasoning & NLP |
| **Hunter.io** | Professional Email Discovery |
| **Vapi AI** | Ultra-realistic Voice Communication |
| **DuckDuckGo** | Live Web Search Capabilities |
