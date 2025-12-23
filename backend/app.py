from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
try:
    from huggingface_detector import HuggingFaceDetector
    USE_HUGGINGFACE = True
except Exception as e:
    print(f"⚠️ Could not load Hugging Face detector: {e}")
    from disease_detector import PlantDiseaseDetector
    USE_HUGGINGFACE = False

# Try to use OpenAI chatbot, fallback to basic if not available
try:
    from openai_chatbot import OpenAIChatbot
    chatbot = OpenAIChatbot()
    print("✅ Using OpenAI Chatbot")
except Exception as e:
    print(f"⚠️ Could not load OpenAI chatbot: {e}")
    try:
        from ai_chatbot import AIChatbot
        chatbot = AIChatbot()
        print("✅ Using AI Chatbot (Gemini)")
    except:
        from chatbot import PlantHealthChatbot
        chatbot = PlantHealthChatbot()
        print("⚠️ Using Basic Chatbot")

from treatment_videos import get_treatment_videos
from video_generator import get_reliable_videos, UNIVERSAL_FALLBACK_VIDEOS
from werkzeug.utils import secure_filename
import base64

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize detector
if USE_HUGGINGFACE:
    print("✅ Using Hugging Face Model (38+ diseases)")
    detector = HuggingFaceDetector()
else:
    print("⚠️ Using Basic Detector")
    detector = PlantDiseaseDetector()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/detect', methods=['POST'])
def detect_disease():
    """Detect plant disease from uploaded image"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Detect disease
            result = detector.detect(filepath)
            
            # Add treatment videos with fallbacks
            if 'disease' in result:
                videos = get_reliable_videos(result['disease'])
                
                # If still no videos, use universal fallbacks
                if not videos or len(videos) == 0:
                    videos = UNIVERSAL_FALLBACK_VIDEOS
                
                result['treatment_videos'] = videos
                
                # Add detection quality message
                if 'detection_quality' in result:
                    result['quality_message'] = result['detection_quality']
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify(result)
        else:
            return jsonify({'error': 'Invalid file type. Please upload an image (PNG, JPG, JPEG)'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chatbot messages with voice support"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        context = data.get('context', {})
        voice_output = data.get('voice_output', False)
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get response (text and optional audio)
        result = chatbot.get_response(user_message, context, voice_output)
        
        # Handle both dict and string responses
        if isinstance(result, dict):
            response_data = result
        else:
            response_data = {'text': result}
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Get list of all diseases"""
    try:
        diseases = chatbot.get_all_diseases()
        return jsonify({'diseases': diseases})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/disease/<disease_name>', methods=['GET'])
def get_disease_info(disease_name):
    """Get detailed information about a specific disease"""
    try:
        info = chatbot.get_disease_details(disease_name)
        if info:
            return jsonify(info)
        else:
            return jsonify({'error': 'Disease not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🌱 Plant Health Detection & Chatbot Server Starting...")
    print("📊 Loading disease detection model...")
    print("🤖 Initializing chatbot...")
    print("✅ Server ready at http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
