# 🌿 Usage Examples - Plant Health Detective

## Getting Started

### Starting the Application

```bash
# Method 1: Using the launcher (Recommended)
python3 run.py

# Method 2: Direct Flask run
cd backend
python3 app.py
```

Then open your browser to: `http://localhost:5000`

---

## Example Usage Scenarios

### Scenario 1: Detecting Tomato Disease

**Steps:**
1. Take a clear photo of your tomato plant leaves
2. Open the application in your browser
3. Click "Choose Image" or drag the image onto the upload area
4. Wait 2-3 seconds for analysis
5. Review the detection results:
   - Disease name: "Tomato Early Blight"
   - Confidence: 85%
   - Severity: Moderate

**Expected Output:**
```
Disease: Tomato Early Blight
Confidence: 85%

Symptoms:
• Brown spots with concentric rings on lower leaves
• Yellow halo around spots
• Leaves turn yellow and drop

Treatment:
1. Remove and destroy infected leaves immediately
2. Apply copper-based fungicide or chlorothalonil
3. Use organic neem oil spray weekly
...
```

---

### Scenario 2: Asking the Chatbot About Diseases

**Question**: "What is tomato late blight?"

**Response**:
```
**Tomato Late Blight**

A devastating disease caused by Phytophthora infestans that can 
destroy entire crops rapidly in cool, wet conditions.

Severity: Severe

Symptoms:
• Large brown/gray water-soaked spots on leaves
• White fuzzy growth on leaf undersides
• Brown firm spots on fruit
• Rapid plant collapse in humid weather

Would you like to know about treatment or prevention methods?
```

---

### Scenario 3: Getting Treatment Advice

**Question**: "How do I treat early blight?"

**Response**:
```
**Treatment for Tomato Early Blight**:

1. Remove and destroy infected leaves immediately
2. Apply copper-based fungicide or chlorothalonil
3. Use organic neem oil spray weekly
4. Improve air circulation around plants
5. Water at soil level, not on leaves
```

---

### Scenario 4: Learning About Prevention

**Question**: "How can I prevent plant diseases?"

**Response**:
```
**Prevention for Tomato Early Blight**:

1. Rotate crops every 2-3 years
2. Use disease-resistant varieties
3. Mulch around plants to prevent soil splash
4. Space plants properly for air flow
5. Remove plant debris at season end
```

---

### Scenario 5: Getting General Plant Care Tips

**Question**: "How often should I water my plants?"

**Response**:
```
**Watering Tips**: Water plants deeply but infrequently. 
Most plants need 1-2 inches per week. Water early morning 
to allow foliage to dry.

Remember: Overwatering is more harmful than underwatering 
for most plants!
```

---

### Scenario 6: Using Quick Actions

Click any quick action button to instantly ask common questions:

**Button: "Tomato Blight"**
→ Asks: "What is tomato early blight?"

**Button: "Prevention Tips"**
→ Asks: "How do I prevent plant diseases?"

**Button: "Watering Guide"**
→ Asks: "How often should I water my plants?"

**Button: "Healthy Plants"**
→ Asks: "What are signs of a healthy plant?"

---

## Chatbot Question Examples

### Disease Information Questions
- "What is tomato early blight?"
- "Tell me about late blight"
- "Information about leaf mold"
- "Explain septoria leaf spot"
- "What is bacterial spot?"

### Treatment Questions
- "How do I treat tomato early blight?"
- "How to cure late blight?"
- "What should I do for leaf mold?"
- "Treatment for bacterial spot"
- "How to fix rust on corn?"

### Symptom Questions
- "What are the symptoms of early blight?"
- "Signs of late blight"
- "How do I identify leaf mold?"
- "What does bacterial spot look like?"

### Prevention Questions
- "How can I prevent early blight?"
- "How to avoid late blight?"
- "Prevention for plant diseases"
- "How to protect my plants?"

### General Care Questions
- "How often should I water my plants?"
- "How do I fertilize tomatoes?"
- "How much sunlight do plants need?"
- "What kind of soil is best?"
- "How to space my plants?"
- "Should I use mulch?"

---

## Tips for Best Results

### For Disease Detection:
1. **Use Clear Photos**: Well-lit, in-focus images
2. **Show Affected Areas**: Focus on diseased leaves/stems
3. **Avoid Shadows**: Take photos in good lighting
4. **Fill the Frame**: Get close to the plant
5. **Multiple Angles**: Try different perspectives if first result seems wrong

### For Chatbot:
1. **Be Specific**: Include plant name in questions (e.g., "tomato late blight")
2. **Ask Follow-ups**: The bot remembers your detected disease
3. **Use Natural Language**: No need for rigid commands
4. **Try Quick Actions**: Use buttons for common questions
5. **Explore Features**: Ask about symptoms, treatments, prevention, and care

---

## Sample Conversation Flow

**User uploads image of diseased tomato plant**

**Bot**: "I've analyzed your plant image and detected: **Tomato Early Blight** 
(85% confidence). Ask me anything about this disease or its treatment!"

**User**: "What should I do?"

**Bot**: 
```
**Treatment for Tomato Early Blight**:

1. Remove and destroy infected leaves immediately
2. Apply copper-based fungicide or chlorothalonil
3. Use organic neem oil spray weekly
4. Improve air circulation around plants
5. Water at soil level, not on leaves
```

**User**: "How can I prevent this in the future?"

**Bot**:
```
**Prevention for Tomato Early Blight**:

1. Rotate crops every 2-3 years
2. Use disease-resistant varieties
3. Mulch around plants to prevent soil splash
4. Space plants properly for air flow
5. Remove plant debris at season end
```

**User**: "How often should I water?"

**Bot**: "**Watering Tips**: Water plants deeply but infrequently. Most plants 
need 1-2 inches per week. Water early morning to allow foliage to dry..."

---

## API Usage Examples

### Using cURL

**Detect Disease:**
```bash
curl -X POST http://localhost:5000/api/detect \
  -F "image=@/path/to/plant-image.jpg"
```

**Chat:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is tomato early blight?"}'
```

**Get Diseases:**
```bash
curl http://localhost:5000/api/diseases
```

**Get Disease Info:**
```bash
curl http://localhost:5000/api/disease/Tomato_Early_Blight
```

### Using Python

```python
import requests

# Detect disease
with open('plant-image.jpg', 'rb') as f:
    response = requests.post(
        'http://localhost:5000/api/detect',
        files={'image': f}
    )
    print(response.json())

# Chat
response = requests.post(
    'http://localhost:5000/api/chat',
    json={'message': 'What is tomato early blight?'}
)
print(response.json())
```

---

## Troubleshooting Common Issues

### Issue: Detection seems wrong
**Solution**: 
- Try a clearer photo
- Ensure good lighting
- Focus on diseased areas
- Upload a different angle

### Issue: Chatbot doesn't understand
**Solution**:
- Use full disease name (e.g., "tomato late blight" not just "blight")
- Try rephrasing the question
- Use quick action buttons
- Be more specific

### Issue: Image upload fails
**Solution**:
- Check file format (PNG, JPG, JPEG only)
- Ensure file size < 16MB
- Try a different browser
- Check console for errors

---

## Best Practices

1. **Regular Monitoring**: Upload plant images regularly to catch diseases early
2. **Keep History**: Take notes of detected diseases and treatments used
3. **Follow Treatments**: Apply recommended treatments consistently
4. **Implement Prevention**: Use prevention strategies before diseases appear
5. **Ask Questions**: Don't hesitate to ask the chatbot for clarification

---

**Happy Gardening! 🌱🌻**

For more information, see:
- `README.md` - Complete documentation
- `QUICKSTART.md` - Quick setup guide
- `PROJECT_SUMMARY.md` - Technical overview
