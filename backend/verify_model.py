import os
import sys
# Add current directory to path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from content_engine.engine import ContentEngine
engine = ContentEngine()
print(f"VERIFICATION: Engine model is {engine.llm.model}")
