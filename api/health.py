import json
import os
from urllib.parse import parse_qs

def handler(request, context):
    """Vercel serverless function for health check"""
    
    # Set CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    # Handle OPTIONS request for CORS
    method = request.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Check if Gemini API key is available
    api_key = os.getenv("GEMINI_API_KEY")
    ai_available = bool(api_key)
    
    response_data = {
        "status": "healthy",
        "service": "VERTA Serverless API",
        "version": "1.0.0",
        "ai_model": "available" if ai_available else "unavailable",
        "timestamp": "2024-12-11"
    }
    
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(response_data)
    }