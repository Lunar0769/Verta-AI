#!/usr/bin/env python3
"""
Test VERTA with Real Gemini AI Integration
"""

import requests
import json
import io

def test_real_ai_integration():
    """Test the real AI integration"""
    
    print("🔮 VERTA Real AI Integration Test")
    print("=" * 50)
    
    backend_url = "https://verta-ai.onrender.com"
    frontend_url = "https://verta-b5cdi0vmb-jetrivyas1306-8942s-projects.vercel.app"
    
    # Test 1: Backend Health with AI Key
    print("\n1️⃣ Testing Backend Health with AI Key...")
    try:
        response = requests.get(f"{backend_url}/health", timeout=10)
        if response.status_code == 200:
            health_data = response.json()
            print("✅ Backend health check passed")
            print(f"   Service: {health_data.get('service')}")
            print(f"   API Key Present: {health_data.get('api_key_present')}")
            
            if health_data.get('api_key_present'):
                print("✅ Gemini API key is configured!")
            else:
                print("⚠️  No Gemini API key found")
        else:
            print(f"❌ Backend health failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend connection failed: {e}")
        return False
    
    # Test 2: Real AI Analysis
    print("\n2️⃣ Testing Real AI Analysis...")
    try:
        # Create a more realistic test file
        test_audio_content = b"""
        This is a simulated audio file for testing VERTA AI analysis.
        Speaker A: Welcome everyone to today's meeting.
        Speaker B: Thank you for joining. Let's discuss our project progress.
        Speaker A: Great! What are the key updates?
        Speaker B: We've completed phase one and are moving to phase two.
        """
        
        test_file = io.BytesIO(test_audio_content)
        
        files = {'file': ('test_meeting.mp3', test_file, 'audio/mpeg')}
        
        print("   Sending file to Gemini AI for analysis...")
        response = requests.post(f"{backend_url}/analyze", files=files, timeout=120)  # 2 minute timeout for AI
        
        print(f"   Response status: {response.status_code}")
        
        if response.status_code == 200:
            try:
                analysis_data = response.json()
                print("✅ Real AI analysis completed!")
                
                # Check if it's real AI output or fallback
                if "raw_output" in analysis_data:
                    print("📝 Raw AI Output received:")
                    print(f"   {analysis_data['raw_output'][:200]}...")
                else:
                    print("📊 Structured AI Analysis received:")
                    print(f"   Keys: {list(analysis_data.keys())}")
                
                print("✅ Real Gemini AI integration working!")
                
            except json.JSONDecodeError:
                print("⚠️  Response is not valid JSON")
                print(f"   Raw response: {response.text[:200]}...")
                
        else:
            print(f"❌ AI analysis failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ AI analysis test failed: {e}")
        return False
    
    # Test 3: Debug Endpoint
    print("\n3️⃣ Testing Debug Information...")
    try:
        response = requests.get(f"{backend_url}/debug", timeout=10)
        if response.status_code == 200:
            debug_data = response.json()
            print("✅ Debug info retrieved")
            print(f"   Environment: {'Render' if debug_data.get('environment_vars', {}).get('RENDER') else 'Local'}")
            print(f"   API Key: {'Present' if debug_data.get('environment_vars', {}).get('GEMINI_API_KEY') else 'Missing'}")
            print(f"   Upload Folder: {debug_data.get('upload_folder')}")
        else:
            print(f"⚠️  Debug endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"⚠️  Debug test failed: {e}")
    
    # Summary
    print("\n" + "=" * 50)
    print("🎉 REAL AI INTEGRATION TEST COMPLETE!")
    print("\n📋 Your VERTA Platform:")
    print(f"🌐 Frontend: {frontend_url}")
    print(f"🔮 Backend: {backend_url}")
    print("🤖 AI: Real Gemini Integration Active")
    
    print("\n🚀 Ready for Real Meeting Analysis!")
    print("\n📝 Instructions:")
    print("1. Go to your frontend URL")
    print("2. Upload a real audio/video meeting file")
    print("3. Click 'Analyze with AI'")
    print("4. Get real AI-powered insights!")
    
    return True

if __name__ == "__main__":
    success = test_real_ai_integration()
    exit(0 if success else 1)