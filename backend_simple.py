#!/usr/bin/env python3
"""
VERTA Simple FastAPI Backend for Render
Simplified version to fix CORS and method issues
"""

import os
import json
from datetime import datetime
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="VERTA AI API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_sample_analysis(filename: str = "meeting.mp4"):
    """Create sample analysis"""
    return {
        "file_info": {
            "filename": filename,
            "processed_at": datetime.now().isoformat(),
            "analysis_type": "Sample Analysis"
        },
        "segments": [
            {
                "time_range": "00:00–01:30",
                "speaker": "Speaker A",
                "transcript": "Welcome everyone to today's meeting. Let's start by reviewing our agenda and objectives for this session.",
                "sentiment": "Positive",
                "sentiment_reason": "Welcoming and organized tone",
                "topic": "Meeting introduction and agenda review"
            },
            {
                "time_range": "01:30–03:00",
                "speaker": "Speaker B",
                "transcript": "Thank you for the introduction. I'd like to present our progress on the current project and discuss the challenges we've encountered.",
                "sentiment": "Neutral",
                "sentiment_reason": "Professional and informative presentation",
                "topic": "Project progress update"
            },
            {
                "time_range": "03:00–04:30",
                "speaker": "Speaker A",
                "transcript": "That's great progress. What are the next steps we need to take to address these challenges?",
                "sentiment": "Positive",
                "sentiment_reason": "Constructive and solution-focused",
                "topic": "Next steps discussion"
            }
        ],
        "engagement_score": {
            "score": 87,
            "explanation": "High engagement with active participation from multiple speakers. Clear communication and structured discussion flow."
        },
        "meeting_summary": {
            "key_points": [
                "Meeting agenda was clearly established and followed",
                "Project progress was comprehensively reviewed",
                "Team collaboration appears highly effective",
                "Challenges were identified and solutions proposed"
            ],
            "decisions": [
                "Continue with current project approach with modifications",
                "Prioritize critical issues for immediate attention",
                "Allocate additional resources to challenging areas",
                "Schedule follow-up meeting for progress review"
            ],
            "open_questions": [
                "What are the specific timeline requirements for each phase?",
                "How should we prioritize the remaining tasks effectively?",
                "What additional resources are needed for optimal outcomes?"
            ],
            "risks_or_concerns": [
                "Potential timeline delays if challenges persist",
                "Need for additional resources may impact budget constraints"
            ]
        },
        "action_items": [
            {
                "description": "Prepare detailed project timeline with specific milestones",
                "owner": "Speaker A",
                "priority": "High"
            },
            {
                "description": "Schedule follow-up meeting for next week",
                "owner": "Speaker B",
                "priority": "Medium"
            },
            {
                "description": "Research additional resources and budget requirements",
                "owner": "Speaker A",
                "priority": "Medium"
            }
        ],
        "improvement_suggestions": [
            "Consider using visual aids and presentations for better engagement",
            "Allocate specific time slots for each agenda item to maintain focus",
            "Ensure all participants have equal opportunity to contribute ideas",
            "Document decisions and action items in real-time during meetings"
        ]
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "VERTA AI Meeting Intelligence API",
        "version": "1.0.0",
        "status": "running",
        "message": "Backend is working correctly!"
    }

@app.get("/health")
async def health():
    """Health check"""
    return {
        "status": "healthy",
        "service": "VERTA AI API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    """Analyze uploaded file"""
    try:
        if not file or not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        # For now, return sample analysis
        result = create_sample_analysis(file.filename)
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("backend_simple:app", host="0.0.0.0", port=port)