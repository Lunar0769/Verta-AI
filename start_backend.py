#!/usr/bin/env python3
"""
VERTA Backend Startup Script
Quick start for local development
"""

import os
import sys
import subprocess

def main():
    print("🔮 VERTA AI Meeting Intelligence Backend")
    print("=" * 50)
    
    # Check if requirements are installed
    try:
        import fastapi
        import uvicorn
        print("✅ FastAPI dependencies found")
    except ImportError:
        print("❌ FastAPI not found. Installing dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements_render.txt"])
    
    # Check for API key
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        print("✅ Gemini API key found")
    else:
        print("⚠️  No Gemini API key found (will use sample analysis)")
        print("   Set GEMINI_API_KEY environment variable for real AI analysis")
    
    print("\n🚀 Starting FastAPI backend...")
    print("📡 Backend will be available at: http://localhost:8000")
    print("📚 API documentation at: http://localhost:8000/docs")
    print("🔧 Health check at: http://localhost:8000/health")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the backend
    try:
        subprocess.run([sys.executable, "backend.py"])
    except KeyboardInterrupt:
        print("\n👋 Backend stopped")

if __name__ == "__main__":
    main()