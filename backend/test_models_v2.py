import os
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# These were in the list_models.py output
models_to_test = [
    "gemini-flash-latest",
    "gemini-pro-latest",
    "gemini-2.0-flash",
]

for model in models_to_test:
    print(f"--- Testing {model} ---")
    try:
        llm = ChatGoogleGenerativeAI(model=model, google_api_key=api_key)
        res = llm.invoke("Say hi")
        print(f"SUCCESS: {model} -> {res.content}")
        # If we reach here, it works!
    except Exception as e:
        print(f"FAILED: {model} -> {str(e)}")
