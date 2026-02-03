import os
import asyncio
from sqlmodel import create_engine, select, Session
from dotenv import load_dotenv
import sqlalchemy

def check_connection():
    # Load environment variables from backend/.env
    env_path = os.path.join(os.getcwd(), 'backend', '.env')
    load_dotenv(dotenv_path=env_path)
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not found in .env")
        return False
    
    print(f"Connecting to: {db_url.split('@')[1] if '@' in db_url else 'unknown'}")
    
    try:
        engine = create_engine(db_url)
        with Session(engine) as session:
            # Try a simple query
            result = session.exec(sqlalchemy.text("SELECT 1")).first()
            if result:
                print("Database connection successful!")
                return True
            else:
                print("Database connection failed: No result from SELECT 1")
                return False
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False

if __name__ == "__main__":
    check_connection()
