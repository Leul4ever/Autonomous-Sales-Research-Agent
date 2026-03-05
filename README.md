# 🚀 AI GTM Engine — Autonomous Sales & Marketing

A high-performance, autonomous Go-To-Market (GTM) engine built for the **Brainlancer** selection process. This platform integrates real-time web research, neural voice automation, and AI content generation into a single, premium dashboard.

---

## 🏗️ Core Engines

### 🔍 1. Lead Research Engine
*   **Autonomous Prospecting**: Uses GPT-4o and DuckDuckGo to research company initiatives.
*   **Contact Enrichment**: Integrated with Hunter.io to find and verify professional emails.
*   **AI Drafting**: Generates context-aware, personalized cold emails in seconds.

### 🎙️ 2. AI Voice Agent (Riley)
*   **Outbound Scheduling**: Trigger neural voice calls for appointment setting.
*   **Smart Persona**: "Riley" is an organized, warm assistant optimized for the healthcare scheduling niche.
*   **Vapi Integration**: Powered by Vapi.ai for sub-500ms conversation latency.

### ✍️ 3. Content & Visibility Engine
*   **Multi-Post Generation**: One topic → optimized posts for LinkedIn, Twitter, and Instagram.
*   **Viral Video Scripts**: Structured scripts for TikTok/Reels with hook, problem, and value.
*   **Audience Targeting**: Dynamic tone adjustment based on the target persona.

---

## 🛠️ Technology Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/).
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11), [LangChain](https://www.langchain.com/).
- **AI Tools**: OpenAI GPT-4o, Vapi.ai, Hunter.io.

---

## 📦 Getting Started

### 1. Prerequisites
- Python 3.11+
- Node.js 20+
- API Keys: OpenAI, Hunter.io, Vapi.ai.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
# Create .env from .env.example
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables
The system expects the following in `backend/.env`:
- `OPENAI_API_KEY`: For agents and content logic.
- `HUNTER_API_KEY`: For professional email lookups.
- `VAPI_PRIVATE_KEY`: For the voice agent trigger.

---

## 🏁 Submission
Built by **Leul** for the Brainlancer "Sales & Marketing" Architect assessment. 
[GitHub Repository](https://github.com/Leul4ever/Autonomous-Sales-Research-Agent)
