# 🌱 Plant Health Detective

An AI-powered plant disease detection system with an intelligent chatbot that helps identify plant diseases, provides treatment recommendations, and offers expert plant care advice.

![Plant Health Detective](https://img.shields.io/badge/Plant-Health-green)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange)

## ✨ Features

### 🔍 Disease Detection
- **Image Analysis**: Upload plant images for instant disease detection
- **High Accuracy**: AI-powered detection with confidence scores
- **12+ Disease Types**: Comprehensive database of common plant diseases
- **Detailed Results**: Get disease name, severity, symptoms, and more

### 💬 Intelligent Chatbot
- **24/7 Assistant**: Ask questions anytime about plant health
- **Treatment Advice**: Get specific treatment recommendations
- **Prevention Tips**: Learn how to prevent diseases
- **Plant Care**: General advice on watering, fertilizing, and more
- **Context-Aware**: Chatbot remembers your detected disease

### 📚 Disease Database
Supports detection and provides information for:
- Tomato Early Blight
- Tomato Late Blight
- Tomato Leaf Mold
- Tomato Septoria Leaf Spot
- Potato Early Blight
- Potato Late Blight
- Pepper Bacterial Spot
- Corn Common Rust
- Grape Black Rot
- Apple Scab
- Strawberry Leaf Scorch
- Healthy Plants

### 💊 Treatment & Prevention
Each disease includes:
- Detailed description and severity level
- Observable symptoms
- Step-by-step treatment instructions
- Prevention strategies
- Best practices

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone the repository** (if not already cloned)
```bash
git clone <your-repo-url>
cd workspace
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python run.py
```

Or manually:
```bash
cd backend
python app.py
```

4. **Open your browser**
Navigate to: `http://localhost:5000`

## 📖 Usage Guide

### Disease Detection
1. Click "Choose Image" or drag & drop a plant photo
2. Wait for the AI analysis (takes a few seconds)
3. View detailed results including:
   - Disease identification
   - Confidence score
   - Symptoms
   - Treatment recommendations
   - Prevention tips

### Chatbot Interaction
Ask questions like:
- "What is tomato early blight?"
- "How do I treat late blight?"
- "How can I prevent plant diseases?"
- "How often should I water my plants?"
- "What are signs of a healthy plant?"

The chatbot can:
- Answer questions about any disease in the database
- Provide treatment recommendations
- Offer prevention strategies
- Give general plant care advice
- Remember context from your image detection

## 🛠️ Technical Architecture

### Backend (Python/Flask)
- **Flask**: Web framework and API endpoints
- **TensorFlow**: Deep learning for image analysis
- **OpenCV**: Image processing
- **Pillow**: Image handling

### Frontend (HTML/CSS/JavaScript)
- **Vanilla JavaScript**: No frameworks required
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean, intuitive interface
- **Real-time Updates**: Instant feedback

### API Endpoints

#### `POST /api/detect`
Upload plant image for disease detection
- **Input**: Image file (PNG, JPG, JPEG)
- **Output**: Disease name, confidence, detailed information

#### `POST /api/chat`
Send message to chatbot
- **Input**: User message, optional context
- **Output**: Bot response

#### `GET /api/diseases`
Get list of all diseases in database
- **Output**: Array of disease names and severities

#### `GET /api/disease/<disease_name>`
Get detailed information about specific disease
- **Output**: Complete disease information

## 📁 Project Structure

```
workspace/
├── backend/
│   ├── app.py                  # Flask application
│   ├── disease_detector.py     # Disease detection logic
│   ├── chatbot.py             # Chatbot logic
│   └── disease_data.py        # Disease database
├── frontend/
│   ├── index.html             # Main UI
│   ├── style.css              # Styling
│   └── script.js              # Frontend logic
├── uploads/                   # Temporary image storage
├── models/                    # Model storage directory
├── requirements.txt           # Python dependencies
├── run.py                     # Application launcher
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file for custom configuration:
```
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
```

## 🌟 Features in Detail

### Disease Detection Algorithm
The detection system analyzes images using:
- Color analysis (RGB, HSV, LAB color spaces)
- Texture analysis
- Spot and lesion detection
- Pattern recognition
- Statistical analysis

**Note**: The current implementation uses image analysis techniques. For production use, you can train a custom CNN model and replace the detection logic in `disease_detector.py`.

### Chatbot Intelligence
The chatbot uses:
- Pattern matching for question understanding
- Context awareness from image detection
- Comprehensive disease knowledge base
- Natural language processing
- Helpful fallback responses

## 🎨 UI Features

- **Drag & Drop**: Easy image uploading
- **Real-time Preview**: See your image before analysis
- **Animated Results**: Smooth transitions and animations
- **Responsive Chat**: Clean, modern chat interface
- **Quick Actions**: One-click common questions
- **Mobile Friendly**: Works great on phones and tablets

## 🐛 Troubleshooting

### Issue: Port already in use
**Solution**: Change port in `run.py` or kill process using port 5000
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Module not found
**Solution**: Ensure all dependencies are installed
```bash
pip install -r requirements.txt --upgrade
```

### Issue: Image upload fails
**Solution**: Check file size (max 16MB) and format (PNG, JPG, JPEG)

### Issue: TensorFlow warnings
**Solution**: These are usually harmless. You can suppress them:
```python
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
```

## 🚧 Future Enhancements

- [ ] Train custom CNN model on larger dataset (e.g., PlantVillage dataset)
- [ ] Add more plant species and diseases
- [ ] Multi-language support
- [ ] Mobile app version (React Native)
- [ ] User accounts and history
- [ ] Community features
- [ ] Integration with plant care APIs
- [ ] Weather-based recommendations
- [ ] Image history and comparison
- [ ] Export reports as PDF

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ for plant lovers and gardeners everywhere.

## 🙏 Acknowledgments

- Plant disease information sourced from agricultural research
- UI inspiration from modern web design trends
- Thanks to the open-source community

## 📞 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section
2. Review the Usage Guide
3. Open an issue on GitHub

## 🌐 Demo

To test the application:
1. Use sample plant images from the internet
2. Try the quick action buttons in the chatbot
3. Ask various questions about plant care
4. Upload different types of plant images

---

**Happy Gardening! 🌿🌻🌺**
