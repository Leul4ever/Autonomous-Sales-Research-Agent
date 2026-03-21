import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

db_url = os.getenv("DATABASE_URL")
print(f"Testing connection to: {db_url}")

try:
    conn = psycopg2.connect(db_url)
    print("SUCCESS: Connected to Supabase!")
    conn.close()
except Exception as e:
    print(f"FAILED: {e}")
