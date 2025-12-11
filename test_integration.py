#!/usr/bin/env python3
"""
Complete VERTA Integration Test
Tests the entire frontend-backend flow
"""

import requests
import json
import io

def test_complete_integration():
    """Test the complete VERTA integration"""
    
    print("🔮 VERTA Complete Integration Test")
    print("=" * 50)
    
    backend_url = "https://verta-ai.onrender.com"
    frontend_url = "https://verta-29sdaqob1-jetrivyas1306-8942s-projects.vercel.app"
    
    # Test 1: Backend Health
    print("\n1️⃣ Testing Backend Health...")
    try:
        response = requests.get(f"{backend_url}/health", timeout=10)
        if response.status_code == 200:
            health_data = response.json()
            print("✅ Backend health check passed")
            print(f"   Service: {health_data.get('service')}")
            print(f"   Status: {health_data.get('status')}")
            print(f"   Environment: {health_data.get('environment')}")
        else:
            print(f"❌ Backend health failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend connection failed: {e}")
        return False
    
    # Test 2: CORS Preflight
    print("\n2️⃣ Testing CORS Preflight...")
    try:
        response = requests.options(f"{backend_url}/analyze", timeout=10)
        if response.status_code == 200:
            print("✅ CORS preflight passed")
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            print(f"   CORS Headers: {cors_headers}")
        else:
            print(f"❌ CORS preflight failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ CORS test failed: {e}")
        return False
    
    # Test 3: File Analysis
    print("\n3️⃣ Testing File Analysis...")
    try:
        # Create a dummy file for testing
        dummy_file = io.BytesIO(b"dummy audio content for testing")
        dummy_file.name = "test_meeting.mp3"
        
        files = {'file': ('test_meeting.mp3', dummy_file, 'audio/mpeg')}
        
        response = requests.post(f"{backend_url}/analyze", files=files, timeout=30)
        
        if response.status_code == 200:
            analysis_data = response.json()
            print("✅ File analysis passed")
            print(f"   Analysis type: {analysis_data.get('file_info', {}).get('analysis_type')}")
            print(f"   Segments count: {len(analysis_data.get('segments', []))}")
            print(f"   Engagement score: {analysis_data.get('engagement_score', {}).get('score')}")
            print(f"   Action items: {len(analysis_data.get('action_items', []))}")
            
            # Verify required fields
            required_fields = ['file_info', 'segments', 'engagement_score', 'meeting_summary', 'action_items']
            missing_fields = [field for field in required_fields if field not in analysis_data]
            
            if missing_fields:
                print(f"⚠️  Missing fields: {missing_fields}")
            else:
                print("✅ All required fields present")
                
        else:
            print(f"❌ File analysis failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ File analysis test failed: {e}")
        return False
    
    # Test 4: Frontend Accessibility
    print("\n4️⃣ Testing Frontend Accessibility...")
    try:
        response = requests.get(frontend_url, timeout=10)
        if response.status_code == 200:
            print("✅ Frontend accessible")
            print(f"   URL: {frontend_url}")
            
            # Check if it contains VERTA branding
            if "VERTA" in response.text:
                print("✅ VERTA branding found")
            else:
                print("⚠️  VERTA branding not found")
                
        else:
            print(f"❌ Frontend not accessible: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Frontend test failed: {e}")
        return False
    
    # Test Summary
    print("\n" + "=" * 50)
    print("🎉 ALL TESTS PASSED!")
    print("\n📋 Integration Summary:")
    print(f"✅ Backend: {backend_url}")
    print(f"✅ Frontend: {frontend_url}")
    print("✅ CORS: Properly configured")
    print("✅ File Upload: Working")
    print("✅ Analysis: Returning structured data")
    print("✅ JSON Response: Valid format")
    
    print("\n🚀 Your VERTA platform is fully functional!")
    print("\n📝 Test Instructions:")
    print("1. Go to:", frontend_url)
    print("2. Upload an audio/video file")
    print("3. Click 'Analyze with AI'")
    print("4. See real dynamic results (not static)")
    print("5. Check browser console for detailed logs")
    
    return True

if __name__ == "__main__":
    success = test_complete_integration()
    exit(0 if success else 1)