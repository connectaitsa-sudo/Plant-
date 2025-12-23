from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from disease_detector import PlantDiseaseDetector
from chatbot import PlantHealthChatbot
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

# Initialize detector and chatbot
detector = PlantDiseaseDetector()
chatbot = PlantHealthChatbot()

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
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify(result)
        else:
            return jsonify({'error': 'Invalid file type. Please upload an image (PNG, JPG, JPEG)'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chatbot messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        context = data.get('context', {})
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        response = chatbot.get_response(user_message, context)
        
        return jsonify({'response': response})
    
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
