from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import models
from database import engine, get_db

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="D&H IT LABS API")

# Configure CORS so the frontend HTML can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace "*" with your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Schemas (for data validation) ---

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str

class ReviewCreate(BaseModel):
    name: str
    course: str
    rating: int
    text: str

class ReviewResponse(BaseModel):
    name: str
    course: str
    rating: int
    text: str
    date: str # We'll format the datetime as a string

    class Config:
        from_attributes = True

class EnrollmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    course: str
    education: str
    message: Optional[str] = None
    # profileImage is ignored for JSON payload for now

class ServiceInquiryCreate(BaseModel):
    subject: str
    name: str
    company: Optional[str] = None
    email: str
    phone: str
    scale: str
    message: str

# --- API Endpoints ---

@app.post("/api/contact")
def create_contact_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    db_msg = models.ContactMessage(**message.model_dump())
    db.add(db_msg)
    db.commit()
    return {"message": "Contact message received successfully"}

@app.post("/api/reviews")
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    db_review = models.Review(**review.model_dump())
    db.add(db_review)
    db.commit()
    return {"message": "Review submitted successfully"}

@app.get("/api/reviews", response_model=List[ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    # Fetch approved reviews ordered by newest first
    reviews = db.query(models.Review).filter(models.Review.status == "approved").order_by(models.Review.created_at.desc()).all()
    
    # Format the date for the frontend
    response = []
    for r in reviews:
        response.append(ReviewResponse(
            name=r.name,
            course=r.course,
            rating=r.rating,
            text=r.text,
            date=r.created_at.strftime("%Y-%m-%d")
        ))
    return response

@app.post("/api/enroll")
def create_enrollment(enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    db_enrollment = models.Enrollment(**enrollment.model_dump())
    db.add(db_enrollment)
    db.commit()
    return {"message": "Enrollment submitted successfully"}

@app.post("/api/service-inquiry")
def create_service_inquiry(inquiry: ServiceInquiryCreate, db: Session = Depends(get_db)):
    db_inquiry = models.ServiceInquiry(**inquiry.model_dump())
    db.add(db_inquiry)
    db.commit()
    return {"message": "Service inquiry submitted successfully"}

@app.get("/")
def read_root():
    return {"message": "D&H IT LABS API is running"}
