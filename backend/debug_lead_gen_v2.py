import os
import asyncio
import traceback
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

async def test_agent_full():
    print("--- Detailed Diagnostic Start ---")
    
    try:
        # 1. Init
        print("Initializing LLM...")
        llm = ChatGoogleGenerativeAI(model="gemini-flash-latest", temperature=0)
        search = DuckDuckGoSearchRun()
        
        # 2. Test Search
        print("Testing Search...")
        try:
            context = search.run("Tesla company recent news")
            print(f"Search context: {context[:100]}...")
        except Exception as e:
            print(f"Search failed (non-fatal): {e}")
            context = "Fallback context"

        # 3. Test Domain Retrieval
        print("Testing Domain Retrieval...")
        domain_prompt = "What is the official website domain of Tesla? Return only the domain (e.g. apple.com)."
        try:
            domain_response = llm.invoke(domain_prompt)
            print(f"Domain Response: {domain_response}")
            domain = domain_response.content.strip()
            print(f"Domain: {domain}")
        except Exception as e:
            print("Domain Retrieval Failed!")
            traceback.print_exc()
            return

        # 4. Test Email Generation
        print("Testing Email Generation...")
        prompt = ChatPromptTemplate.from_template("Write a cold email to {company} using context: {context}")
        chain = prompt | llm
        try:
            res = chain.invoke({"company": "Tesla", "context": context})
            print(f"Email Success: {res.content[:100]}...")
        except Exception as e:
            print("Email Generation Failed!")
            traceback.print_exc()
            return

        print("\n--- Diagnostic Complete: Everything seems fine in this environment ---")

    except Exception as e:
        print(f"Unexpected Fatal Error during test setup: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_agent_full())
