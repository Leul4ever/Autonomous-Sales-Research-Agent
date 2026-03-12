import os
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

models_to_test = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro-latest",
    "gemini-pro",
    "gemini-1.5-flash",
    "gemini-2.0-flash-001"
]

for model in models_to_test:
    print(f"--- Testing {model} ---")
    try:
        llm = ChatGoogleGenerativeAI(model=model, google_api_key=api_key)
        res = llm.invoke("Say hi")
        print(f"SUCCESS: {model} -> {res.content}")
        break # Found one!
    except Exception as e:
        print(f"FAILED: {model} -> {str(e)}")
