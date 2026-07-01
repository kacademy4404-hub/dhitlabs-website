import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# PostgreSQL connection string format: postgresql://user:password@host:port/database_name
# Change these values to match your local PostgreSQL setup or cloud URL
DATABASE_URL = os.environ.get(
    "DATABASE_URL", 
    "postgresql://postgres:d&hitlabspvtltd@localhost:5432/dhitlabs_db"
)

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a SessionLocal class. Each instance of this class will be a database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our database models
Base = declarative_base()

# Dependency to get the database session in our API endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
