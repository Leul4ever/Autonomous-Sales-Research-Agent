# Getting Started

Follow these steps to set up and run the AI GTM Engine locally.

## 1. Prerequisites
- **Node.js**: v18 or higher (v20+ recommended).
- **Python**: v3.10 or higher.
- **Git**: To manage the repository.

## 2. API Keys Setup
You need the following API keys in the `backend/.env` file:
- `GOOGLE_API_KEY`: For Gemini 1.5 Flash.
- `HUNTER_API_KEY`: For email lookup.
- `VAPI_PRIVATE_KEY` & `VAPI_PUBLIC_KEY`: For the Voice Agent.
- `VAPI_PHONE_NUMBER_ID`: For outgoing calls.

## 3. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate it:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `python main.py` (or use `start_backend.ps1` on Windows).

## 4. Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the app at: `http://localhost:3000`

## 5. Deployment Info
The app is designed to be proxy-aware. Ensure the `next.config.ts` points to the correct backend URL (default: `http://localhost:8000`).
