from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Review(Base):
    __tablename__ = "student_reviews"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    course = Column(String(200), nullable=False)
    rating = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)
    status = Column(String(50), default="approved") # Can be pending/approved
    created_at = Column(DateTime, default=datetime.utcnow)

class Enrollment(Base):
    __tablename__ = "course_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    course = Column(String(200), nullable=False)
    education = Column(String(100), nullable=False)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ServiceInquiry(Base):
    __tablename__ = "service_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String(200), nullable=False)
    name = Column(String(100), nullable=False)
    company = Column(String(100), nullable=True)
    email = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    scale = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
