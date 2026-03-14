import os
import asyncio
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.tools import DuckDuckGoSearchRun

load_dotenv()

async def test_agent():
    print("--- Diagnostic Start ---")
    
    # 1. Check Env
    google_key = os.getenv("GOOGLE_API_KEY")
    hunter_key = os.getenv("HUNTER_API_KEY")
    print(f"Google API Key present: {bool(google_key)}")
    print(f"Hunter API Key present: {bool(hunter_key)}")
    
    # 2. Test Search
    print("\nTesting DuckDuckGo Search...")
    try:
        search = DuckDuckGoSearchRun()
        res = search.run("Tesla company news")
        print(f"Search Success: {res[:100]}...")
    except Exception as e:
        print(f"Search Failed: {e}")

    # 3. Test Gemini
    model_name = "gemini-flash-latest"
    print(f"\nTesting Gemini ({model_name})...")
    try:
        llm = ChatGoogleGenerativeAI(model=model_name, temperature=0)
        res = llm.invoke("Say hello")
        print(f"Gemini Success: {res.content}")
    except Exception as e:
        print(f"Gemini Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_agent())
