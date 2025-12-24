# 🔑 API Keys Setup Guide

## ⚠️ IMPORTANT SECURITY NOTICE

**Your OpenAI API key has been added to the `.env` file, but NEVER commit this file to Git!**

The `.env` file is already in `.gitignore` to prevent accidental commits.

---

## 🔐 API Keys Configuration

### Current Setup

Your project is configured with the following API keys:

#### OpenAI API Key ✅
```
Status: CONFIGURED
Location: .env file (VITE_OPENAI_API_KEY)
Model: GPT-4 Vision (gpt-4-vision-preview)
```

#### Gemini AI API Key ⚠️
```
Status: NOT CONFIGURED
Location: .env file (VITE_GEMINI_API_KEY)
Action Required: Add your key to use Gemini AI
```

---

## 🚀 Quick Start

### 1. Check Your `.env` File

Your `.env` file is located at: `/workspace/.env`

```env
# OpenAI API Configuration (✅ Already configured)
VITE_OPENAI_API_KEY=sk-proj-fyN_H8VMCI8...

# Gemini AI API Configuration (⚠️ Add your key)
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# API Selection (openai or gemini)
VITE_AI_PROVIDER=openai
```

### 2. Get a Gemini API Key (Optional)

If you want to use Google's Gemini AI:

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key
4. Paste it in `.env` file:
   ```
   VITE_GEMINI_API_KEY=your-actual-gemini-key
   ```

### 3. Switch Between AI Providers

Edit `.env` to change the AI provider:

```env
# Use OpenAI (default)
VITE_AI_PROVIDER=openai

# Or use Gemini AI
VITE_AI_PROVIDER=gemini
```

### 4. Restart Development Server

After changing `.env`, restart your server:

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

---

## 🎯 How It Works

### File Structure

```
/workspace/
├── .env                          ← Your API keys (NEVER COMMIT!)
├── .env.example                  ← Template for other developers
├── src/
│   ├── services/
│   │   ├── ai.ts                ← Main AI service wrapper
│   │   ├── openai.ts            ← OpenAI implementation
│   │   └── gemini.ts            ← Gemini implementation
│   └── components/
│       └── PlantAnalyzer.tsx    ← Image upload & analysis UI
```

### AI Service Flow

1. **User uploads image** → `PlantAnalyzer.tsx`
2. **Image converted to base64** → Binary data
3. **AI service called** → `ai.ts` (selects provider)
4. **Analysis performed** → OpenAI or Gemini API
5. **Results displayed** → Beautiful UI with disease info

---

## 📝 API Usage

### OpenAI GPT-4 Vision

**Features:**
- Advanced image understanding
- High accuracy disease detection
- Detailed treatment recommendations
- JSON structured responses

**Cost:**
- ~$0.01 per image analysis
- Pricing: https://openai.com/pricing

**Rate Limits:**
- Free tier: 3 RPM (requests per minute)
- Paid tier: Higher limits based on plan

### Google Gemini AI

**Features:**
- Fast processing
- Good accuracy
- Free tier available
- Multimodal capabilities

**Cost:**
- Free tier: 60 requests per minute
- Pricing: https://ai.google.dev/pricing

**Rate Limits:**
- Free: 60 RPM
- Paid: Higher limits

---

## 🛡️ Security Best Practices

### ✅ DO:
- Keep `.env` file local only
- Use environment variables
- Rotate keys regularly
- Monitor API usage
- Set spending limits

### ❌ DON'T:
- Commit `.env` to Git
- Share keys publicly
- Hard-code keys in source
- Use keys in frontend (production)
- Expose keys in error messages

---

## 🔧 Advanced Configuration

### Production Deployment

For production, use environment variables on your hosting platform:

#### Vercel
```bash
vercel env add VITE_OPENAI_API_KEY
vercel env add VITE_GEMINI_API_KEY
vercel env add VITE_AI_PROVIDER
```

#### Netlify
```bash
# In Netlify Dashboard:
# Site settings → Environment variables
VITE_OPENAI_API_KEY=your-key
VITE_GEMINI_API_KEY=your-key
VITE_AI_PROVIDER=openai
```

#### Environment File
```bash
# Copy .env.example for new environments
cp .env.example .env.production
# Then edit .env.production with production keys
```

---

## 🧪 Testing API Keys

### Test OpenAI Key

```bash
# Run the app
npm run dev

# Upload a plant image
# Check browser console for any errors
```

### Test Gemini Key

1. Set `VITE_AI_PROVIDER=gemini` in `.env`
2. Add your Gemini key
3. Restart server
4. Upload an image
5. Check results

### Verify Configuration

Check which AI provider is active:

```typescript
// In browser console
import { getAIProvider } from './services/ai'
console.log(getAIProvider()) // 'openai' or 'gemini'
```

---

## 🐛 Troubleshooting

### Error: "OpenAI API key is not configured"

**Solution:**
1. Check `.env` file exists
2. Verify `VITE_OPENAI_API_KEY` is set
3. Restart dev server
4. Clear browser cache

### Error: "Invalid API key"

**Solution:**
1. Verify key is correct (no extra spaces)
2. Check key hasn't expired
3. Verify key has proper permissions
4. Try regenerating key

### Error: "Rate limit exceeded"

**Solution:**
1. Wait a few seconds
2. Upgrade API plan
3. Implement request caching
4. Add retry logic

### Error: "Failed to fetch"

**Solution:**
1. Check internet connection
2. Verify API endpoints are accessible
3. Check CORS settings
4. Disable browser extensions

### Images Not Analyzing

**Solution:**
1. Check image size (< 5MB)
2. Verify image format (JPG, PNG)
3. Check browser console for errors
4. Try different image

---

## 📊 Monitoring Usage

### OpenAI Dashboard
- Visit: https://platform.openai.com/usage
- View API calls and costs
- Set spending limits
- Monitor rate limits

### Gemini Dashboard
- Visit: https://makersuite.google.com/app/
- View quota usage
- Check rate limits
- Upgrade if needed

---

## 💡 Tips & Tricks

### Optimize Costs

1. **Compress images** before upload
2. **Cache results** for same images
3. **Use lower resolution** for preview
4. **Implement rate limiting** on frontend
5. **Set user quotas** in production

### Improve Accuracy

1. **Use good quality images**
2. **Proper lighting** in photos
3. **Close-up shots** of affected areas
4. **Multiple angles** for complex cases
5. **Clear, focused** images

### Better Performance

1. **Resize images** to optimal size (800x800px)
2. **Convert to JPEG** for smaller size
3. **Use WebP** format when supported
4. **Lazy load** analyzer component
5. **Add loading states** for UX

---

## 🔄 Switching AI Providers

### When to Use OpenAI
- Need highest accuracy
- Complex disease detection
- Detailed analysis required
- Budget allows

### When to Use Gemini
- High volume processing
- Cost optimization needed
- Fast responses required
- Free tier sufficient

### Use Both
Switch based on context:
```typescript
// In ai.ts, add logic:
if (highPriorityAnalysis) {
  return openai.analyzePlantImage(image)
} else {
  return gemini.analyzePlantImage(image)
}
```

---

## 📚 Additional Resources

### Documentation
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

### Support
- OpenAI: https://help.openai.com
- Gemini: https://ai.google.dev/support
- Project Issues: GitHub repository

---

## ✅ Setup Checklist

Before going live:

- [ ] OpenAI API key configured
- [ ] Gemini API key configured (optional)
- [ ] `.env` file in `.gitignore`
- [ ] Tested image upload
- [ ] Verified AI responses
- [ ] Set spending limits
- [ ] Production env vars configured
- [ ] Error handling tested
- [ ] Rate limiting implemented
- [ ] Monitoring setup

---

## 🎉 You're All Set!

Your PlantCure application is now powered by AI! 🤖

### Next Steps:
1. Test the image analyzer
2. Upload plant photos
3. Review AI accuracy
4. Adjust prompts if needed
5. Monitor API usage

**Need help?** Check the documentation or open an issue!

---

**🔐 Remember: Keep your API keys secret!**

Never share them publicly or commit them to version control.
