# 🚀 AI GTM Engine: The Future of Autonomous Sales

The **AI GTM Engine** is a high-performance, autonomous prospecting and marketing platform. It bridges the gap between raw data and closed deals by deploying a fleet of AI agents that research, create, and call prospects on your behalf.

![AI GTM Engine Banner](https://img.shields.io/badge/AI-GTM_Engine-blueviolet?style=for-the-badge&logo=probot)
![Tech Stack](https://img.shields.io/badge/Built_With-Next.js_|_FastAPI_|_Gemini-emerald?style=for-the-badge)

## ✨ Core Intelligence Modules

### 🔍 [1] Autonomous Lead Research
*   **The Brain:** Performs deep-web OSINT via DuckDuckGo to uncover company pivots, recent news, and high-level business goals.
*   **The Hands:** Automatically integrates with **Hunter.io** to discover and verify professional emails for key decision-makers.
*   **The Result:** A perfectly researched target profile ready for outreach.

### 🎙️ [2] "Riley" AI Voice Agent
*   **Technology:** Powered by **Vapi AI** with ultra-realistic neural voices (<500ms latency).
*   **Capability:** Riley doesn't just read a script; she listens, understands intent, and autonomously schedules appointments directly onto your calendar.

### ✍️ [3] Content Velocity Engine
*   **Strategy:** Transforms a single "core topic" into a multi-platform social media campaign.
*   **Output:** Structured, platform-specific posts for LinkedIn, X (Twitter), and Instagram, plus a 60-second video storyboard.

---

## 🛠️ The Tech Stack

### Frontend (The Face)
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4.0 + Glassmorphism
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend (The Muscle)
- **API:** FastAPI (Async Python)
- **Orchestration:** LangChain
- **AI Models:** Google Gemini 1.5 Flash
- **Database:** SQLite (SQLAlchemy ORM)

---

## 🛡️ Security & Environment Control
**CRITICAL:** This project is built with security first.
- **Sensitive Data:** All API keys (Gemini, Hunter, Vapi) are managed via a `.env` file in the `backend/` directory.
- **Git Safety:** The root `.gitignore` is strictly configured to **exclude all `.env` and `.env.*` files**. 
- **Privacy:** Your secret keys will **never** be pushed to GitHub or any public repository. 

> [!IMPORTANT]
> When moving this project between machines, **you must manually move your `.env` file** (e.g., via flash drive or secure vault). It is NOT tracked by Git.

---

## 🚦 Getting Started

1.  **Clone the Repo**: `git clone ...`
2.  **Environment Setup**: Copy `.env.example` to `.env` in the backend and add your keys.
3.  **Run Backend**: Navigate to `backend/` and run `.\start_backend.ps1`.
4.  **Run Frontend**: Navigate to `frontend/` and run `npm run dev`.

For detailed setup instructions and architectural deep-dives, see the [**Documentation Folder**](./docs/).

---
*Built for the next generation of sales leaders.*
