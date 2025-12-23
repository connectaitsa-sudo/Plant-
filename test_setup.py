#!/usr/bin/env python3
"""
Setup Verification Script
Tests if all components are working correctly
"""

import sys
import os

def print_header(text):
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60)

def test_imports():
    """Test if all required modules can be imported"""
    print_header("Testing Module Imports")
    
    modules = {
        'flask': 'Flask',
        'flask_cors': 'Flask-CORS',
        'tensorflow': 'TensorFlow',
        'PIL': 'Pillow',
        'cv2': 'OpenCV',
        'numpy': 'NumPy'
    }
    
    all_good = True
    for module, name in modules.items():
        try:
            __import__(module)
            print(f"✅ {name:20s} - OK")
        except ImportError as e:
            print(f"❌ {name:20s} - MISSING")
            all_good = False
    
    return all_good

def test_project_structure():
    """Test if all required files and directories exist"""
    print_header("Testing Project Structure")
    
    required_items = {
        'backend/app.py': 'Backend API',
        'backend/disease_detector.py': 'Disease Detector',
        'backend/chatbot.py': 'Chatbot',
        'backend/disease_data.py': 'Disease Database',
        'frontend/index.html': 'Frontend HTML',
        'frontend/style.css': 'Frontend CSS',
        'frontend/script.js': 'Frontend JavaScript',
        'requirements.txt': 'Dependencies File',
        'run.py': 'Launcher Script'
    }
    
    all_good = True
    for path, name in required_items.items():
        full_path = os.path.join(os.path.dirname(__file__), path)
        if os.path.exists(full_path):
            print(f"✅ {name:25s} - Found")
        else:
            print(f"❌ {name:25s} - Missing")
            all_good = False
    
    return all_good

def test_backend_imports():
    """Test if backend modules can be imported"""
    print_header("Testing Backend Components")
    
    backend_path = os.path.join(os.path.dirname(__file__), 'backend')
    sys.path.insert(0, backend_path)
    
    all_good = True
    
    try:
        from disease_data import DISEASE_DATABASE
        print(f"✅ Disease Database       - {len(DISEASE_DATABASE)} diseases loaded")
    except Exception as e:
        print(f"❌ Disease Database       - Error: {e}")
        all_good = False
    
    try:
        from chatbot import PlantHealthChatbot
        chatbot = PlantHealthChatbot()
        print(f"✅ Chatbot                - Initialized successfully")
    except Exception as e:
        print(f"❌ Chatbot                - Error: {e}")
        all_good = False
    
    try:
        from disease_detector import PlantDiseaseDetector
        detector = PlantDiseaseDetector()
        print(f"✅ Disease Detector       - Initialized successfully")
    except Exception as e:
        print(f"❌ Disease Detector       - Error: {e}")
        all_good = False
    
    return all_good

def test_chatbot_responses():
    """Test if chatbot can generate responses"""
    print_header("Testing Chatbot Functionality")
    
    backend_path = os.path.join(os.path.dirname(__file__), 'backend')
    sys.path.insert(0, backend_path)
    
    try:
        from chatbot import PlantHealthChatbot
        chatbot = PlantHealthChatbot()
        
        # Test greeting
        response = chatbot.get_response("hello")
        if "hello" in response.lower() or "hi" in response.lower():
            print("✅ Greeting Response      - Working")
        else:
            print("❌ Greeting Response      - Unexpected response")
            return False
        
        # Test disease query
        response = chatbot.get_response("what is tomato early blight")
        if "blight" in response.lower():
            print("✅ Disease Query          - Working")
        else:
            print("❌ Disease Query          - Unexpected response")
            return False
        
        # Test treatment query
        response = chatbot.get_response("how to treat tomato late blight")
        if "treat" in response.lower() or "remove" in response.lower() or "fungicide" in response.lower():
            print("✅ Treatment Query        - Working")
        else:
            print("❌ Treatment Query        - Unexpected response")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Chatbot Test           - Error: {e}")
        return False

def main():
    """Run all tests"""
    print("\n")
    print("🌱" * 30)
    print("   PLANT HEALTH DETECTIVE - SETUP VERIFICATION")
    print("🌱" * 30)
    
    results = []
    
    # Run tests
    results.append(("Module Imports", test_imports()))
    results.append(("Project Structure", test_project_structure()))
    results.append(("Backend Components", test_backend_imports()))
    results.append(("Chatbot Functionality", test_chatbot_responses()))
    
    # Print summary
    print_header("Test Summary")
    
    all_passed = True
    for test_name, passed in results:
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name:25s} : {status}")
        if not passed:
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if all_passed:
        print("✅ ALL TESTS PASSED!")
        print("\n🎉 Your Plant Health Detective is ready to use!")
        print("🚀 Run: python run.py")
        print("🌐 Then open: http://localhost:5000")
    else:
        print("❌ SOME TESTS FAILED")
        print("\n📋 Please fix the issues above before running the application.")
        print("💡 Try: pip install -r requirements.txt")
    
    print("=" * 60 + "\n")
    
    return 0 if all_passed else 1

if __name__ == '__main__':
    sys.exit(main())
