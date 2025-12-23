# 🚀 Quick Start Guide

Get your Plant Health Detective up and running in 3 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
pip install -r requirements.txt
```

If you encounter any issues, try:
```bash
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir
```

## Step 2: Run the Application (30 seconds)

### Option A: Using the launcher (Recommended)
```bash
python run.py
```

### Option B: Direct Flask run
```bash
cd backend
python app.py
```

## Step 3: Open Your Browser (10 seconds)

Navigate to: **http://localhost:5000**

## 🎉 You're Ready!

### Try These First:

1. **Test the Disease Detection**
   - Click "Choose Image" button
   - Upload a plant photo (or find one online)
   - Wait 2-3 seconds for results

2. **Chat with the Assistant**
   - Type: "What is tomato early blight?"
   - Or click one of the quick action buttons
   - Ask follow-up questions!

3. **Explore Features**
   - Try drag & drop for images
   - Ask about treatments
   - Get prevention tips

## 🐛 Quick Troubleshooting

**Port 5000 already in use?**
```bash
# Change port in run.py (line with app.run)
app.run(debug=True, host='0.0.0.0', port=5001)
```

**Missing dependencies?**
```bash
pip install flask flask-cors tensorflow pillow opencv-python numpy
```

**Can't find image to test?**
- Search Google Images for "tomato plant disease"
- Use images from your garden
- Download sample plant disease images

## 💡 Pro Tips

- Use clear, well-lit photos for best detection
- Ask specific questions to the chatbot
- The chatbot remembers your detected disease
- Check the prevention tips to keep plants healthy

## 📱 Access from Phone

If running on your computer:
1. Find your computer's IP address
2. On phone browser: `http://YOUR_IP:5000`
3. Make sure phone and computer are on same network

---

**Need more help?** Check the full README.md or open an issue!
