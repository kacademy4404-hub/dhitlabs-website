from database import engine
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT current_database();"))
        db_name = result.scalar()
        print(f"\n✅ SUCCESS: Connected to PostgreSQL database '{db_name}' successfully!")
except Exception as e:
    print("\n❌ ERROR: Could not connect to the database.")
    print(f"Details: {e}")
