import json
import os
from urllib.parse import parse_qs

def handler(request, context):
    """Vercel serverless function for file analysis"""
    
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    # Handle OPTIONS request for CORS
    method = request.get('httpMethod', 'POST')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Only allow POST requests
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({"error": "Method not allowed"})
        }
    
    try:
        # Create comprehensive sample analysis
        analysis_result = {
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
                },
                {
                    "time_range": "04:30–06:00",
                    "speaker": "Speaker C",
                    "transcript": "I suggest we prioritize the critical issues first and allocate additional resources where needed.",
                    "sentiment": "Neutral",
                    "sentiment_reason": "Strategic and analytical approach",
                    "topic": "Resource allocation and prioritization"
                }
            ],
            "engagement_score": {
                "score": 87,
                "explanation": "High engagement with active participation from multiple speakers. Clear communication, structured discussion flow, and collaborative problem-solving approach."
            },
            "meeting_summary": {
                "key_points": [
                    "Meeting agenda was clearly established and followed",
                    "Project progress was comprehensively reviewed",
                    "Team collaboration appears highly effective",
                    "Challenges were identified and solutions proposed",
                    "Resource allocation strategies were discussed"
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
                    "What additional resources are needed for optimal outcomes?",
                    "How can we improve communication between team members?"
                ],
                "risks_or_concerns": [
                    "Potential timeline delays if challenges persist",
                    "Need for additional resources may impact budget constraints",
                    "Communication gaps could affect project coordination"
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
                },
                {
                    "description": "Implement priority-based task management system",
                    "owner": "Speaker C",
                    "priority": "High"
                }
            ],
            "improvement_suggestions": [
                "Consider using visual aids and presentations for better engagement",
                "Allocate specific time slots for each agenda item to maintain focus",
                "Ensure all participants have equal opportunity to contribute ideas",
                "Document decisions and action items in real-time during meetings",
                "Implement regular check-ins to monitor progress on action items"
            ]
        }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(analysis_result)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                "error": "Analysis failed",
                "details": str(e)
            })
        }