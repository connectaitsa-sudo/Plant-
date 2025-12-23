#!/usr/bin/env python3
"""
Plant Health Detective - Application Launcher
"""

import os
import sys

def check_dependencies():
    """Check if all required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    required_modules = [
        'flask',
        'flask_cors',
        'tensorflow',
        'PIL',
        'cv2',
        'numpy'
    ]
    
    missing = []
    for module in required_modules:
        try:
            __import__(module)
        except ImportError:
            missing.append(module)
    
    if missing:
        print("❌ Missing dependencies:")
        for module in missing:
            print(f"   - {module}")
        print("\n📦 Install dependencies with:")
        print("   pip install -r requirements.txt")
        return False
    
    print("✅ All dependencies installed!")
    return True

def create_directories():
    """Create necessary directories"""
    dirs = ['uploads', 'backend']
    for directory in dirs:
        os.makedirs(directory, exist_ok=True)

def main():
    """Main launcher function"""
    print("=" * 60)
    print("🌱 Plant Health Detective")
    print("   AI-Powered Plant Disease Detection & Treatment Advisor")
    print("=" * 60)
    print()
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Create necessary directories
    create_directories()
    
    # Change to backend directory and run the Flask app
    backend_path = os.path.join(os.path.dirname(__file__), 'backend')
    sys.path.insert(0, backend_path)
    
    # Import and run the Flask app
    try:
        from app import app
        print()
        print("=" * 60)
        print("🎉 Server starting...")
        print("🌐 Open your browser and navigate to:")
        print("   http://localhost:5000")
        print("=" * 60)
        print()
        print("💡 Tips:")
        print("   • Upload a plant image to detect diseases")
        print("   • Use the chatbot to ask questions")
        print("   • Press CTRL+C to stop the server")
        print()
        
        app.run(debug=True, host='0.0.0.0', port=5000)
        
    except KeyboardInterrupt:
        print("\n\n👋 Shutting down gracefully...")
        print("Thank you for using Plant Health Detective!")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
