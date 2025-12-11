#!/usr/bin/env python3
"""
VERTA Minimal Backend - Test Version
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        "service": "VERTA API",
        "status": "running",
        "version": "1.0.0",
        "message": "Backend is working!"
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "VERTA API",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        # Get uploaded file
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Return sample analysis
        result = {
            "file_info": {
                "filename": file.filename,
                "processed_at": datetime.now().isoformat(),
                "analysis_type": "Sample Analysis - Backend Working!"
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
                }
            ],
            "engagement_score": {
                "score": 85,
                "explanation": "High engagement with active participation from multiple speakers. Backend is working correctly!"
            },
            "meeting_summary": {
                "key_points": [
                    "Meeting agenda was clearly established and followed",
                    "Project progress was comprehensively reviewed",
                    "Backend deployment is successful"
                ],
                "decisions": [
                    "Continue with current project approach",
                    "Backend is now working properly"
                ],
                "open_questions": [
                    "What are the next steps for the project?"
                ],
                "risks_or_concerns": []
            },
            "action_items": [
                {
                    "description": "Verify backend functionality",
                    "owner": "Development Team",
                    "priority": "High"
                }
            ],
            "improvement_suggestions": [
                "Backend is now working correctly",
                "File upload and analysis endpoints are functional"
            ]
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)