"""
AI-Powered Chatbot using Google Gemini
Smart conversational AI for plant disease queries
"""

import os
import google.generativeai as genai
from disease_data import DISEASE_DATABASE
from language_data import is_urdu_query

class AIChatbot:
    def __init__(self):
        """Initialize AI chatbot with Gemini"""
        self.api_key = os.getenv('GEMINI_API_KEY', '')
        self.model = None
        self.use_ai = False
        
        if self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel('gemini-pro')
                self.use_ai = True
                print("✅ AI Chatbot (Gemini) initialized successfully!")
            except Exception as e:
                print(f"⚠️ Could not initialize Gemini: {e}")
                self.use_ai = False
        else:
            print("⚠️ No GEMINI_API_KEY found. Using basic chatbot.")
            print("💡 Get free API key from: https://makersuite.google.com/app/apikey")
        
        self.conversation_history = []
    
    def get_response(self, user_message, context=None):
        """
        Get AI response for user query
        
        Args:
            user_message: User's question
            context: Optional context (detected disease, etc.)
            
        Returns:
            str: AI-generated response
        """
        # Detect language
        is_urdu = is_urdu_query(user_message)
        lang = 'ur' if is_urdu else 'en'
        
        if self.use_ai and self.model:
            return self._get_ai_response(user_message, context, lang)
        else:
            return self._get_fallback_response(user_message, context, lang)
    
    def _get_ai_response(self, user_message, context, lang):
        """Get response from Gemini AI"""
        try:
            # Build context-aware prompt
            system_prompt = self._build_system_prompt(context, lang)
            full_prompt = f"{system_prompt}\n\nUser Question: {user_message}\n\nPlease provide a helpful, accurate response."
            
            # Generate response
            response = self.model.generate_content(full_prompt)
            
            if response and response.text:
                return response.text
            else:
                return self._get_fallback_response(user_message, context, lang)
                
        except Exception as e:
            print(f"AI Error: {e}")
            return self._get_fallback_response(user_message, context, lang)
    
    def _build_system_prompt(self, context, lang):
        """Build system prompt with context"""
        if lang == 'ur':
            base_prompt = """Aap ek Plant Health Expert hain jo Roman Urdu mein baat karte hain.
Aapka kaam hai:
- Paudhon ki bimariyon ke baare mein batana
- Ilaaj aur bachao ke tareeqe suggest karna
- Paudhon ki dekhbhal ki tips dena
- Simple aur clear Roman Urdu mein jawab dena

IMPORTANT: Hamesha Roman Urdu mein jawab dein (jaise: "Aap", "kaise", "karein", "paudhay")"""
        else:
            base_prompt = """You are a Plant Health Expert chatbot.
Your role is to:
- Provide information about plant diseases
- Suggest treatments and prevention methods
- Give plant care tips
- Be helpful, accurate, and friendly

IMPORTANT: Always give practical, actionable advice."""
        
        # Add detected disease context
        if context and 'disease' in context:
            disease_key = context['disease']
            if disease_key in DISEASE_DATABASE:
                disease_info = DISEASE_DATABASE[disease_key]
                if lang == 'ur':
                    base_prompt += f"\n\nDETECTED DISEASE: {disease_info['name']}\nUser ne yeh bimari detect ki hai. Is context ko dhyan mein rakhte hue jawab dein."
                else:
                    base_prompt += f"\n\nDETECTED DISEASE: {disease_info['name']}\nUser has detected this disease. Keep this context in mind when answering."
        
        # Add disease database context
        if lang == 'ur':
            base_prompt += f"\n\nAapke paas {len(DISEASE_DATABASE)} bimariyon ki maloomat hai including: Tamatar, Aalu, Shimla Mirch, Makai, Angoor, Seb, etc."
        else:
            base_prompt += f"\n\nYou have information about {len(DISEASE_DATABASE)} plant diseases including: Tomato, Potato, Pepper, Corn, Grape, Apple, etc."
        
        return base_prompt
    
    def _get_fallback_response(self, user_message, context, lang):
        """Fallback response when AI is not available"""
        message_lower = user_message.lower()
        
        # Simple pattern matching
        if any(word in message_lower for word in ['hello', 'hi', 'assalam', 'salam']):
            if lang == 'ur':
                return """Assalam-o-Alaikum! 👋

Main aapka Plant Health Assistant hoon. Main aapki madad kar sakta hoon:

🔍 **Bimari Ki Pehchan** - Tasveer upload karein
💊 **Ilaaj** - Har bimari ka ilaaj
🌱 **Dekhbhal** - Paudhon ki care tips
🛡️ **Bachao** - Prevention strategies

Aap kya jaanna chahte hain?"""
            else:
                return """Hello! 👋

I'm your Plant Health Assistant. I can help you with:

🔍 **Disease Detection** - Upload plant images
💊 **Treatment** - Get treatment recommendations
🌱 **Care Tips** - Plant care advice
🛡️ **Prevention** - Disease prevention strategies

How can I help you today?"""
        
        elif any(word in message_lower for word in ['paani', 'water']):
            if lang == 'ur':
                return """**Paani Dene Ke Tips** 💧

1. **Kitna**: Zyada tar paudhon ko hafte mein 1-2 inch paani chahiye
2. **Kab**: Subah ke waqt paani dein (8-10 AM best)
3. **Kaise**: Gehri paani dein lekin kam bar
4. **Kahan**: Mitti par dein, patte par nahi

⚠️ **Yaad Rakhein**: Zyada paani se jyada nuksaan hota hai!

Koi aur sawal?"""
            else:
                return """**Watering Tips** 💧

1. **Amount**: Most plants need 1-2 inches per week
2. **Timing**: Water in the morning (8-10 AM best)
3. **Method**: Deep watering, less frequently
4. **Where**: Water at soil level, not on leaves

⚠️ **Remember**: Overwatering is worse than underwatering!

Any other questions?"""
        
        elif 'ilaaj' in message_lower or 'treatment' in message_lower:
            if context and 'disease' in context:
                disease_key = context['disease']
                if disease_key in DISEASE_DATABASE:
                    disease_info = DISEASE_DATABASE[disease_key]
                    if lang == 'ur':
                        response = f"**{disease_info['name']} Ka Ilaaj**:\n\n"
                        for i, treatment in enumerate(disease_info['treatment'][:5], 1):
                            response += f"{i}. {treatment}\n"
                        return response
            
            if lang == 'ur':
                return "Meherbani karke bataiye kis bimari ka ilaaj chahiye? Ya paudhay ki tasveer upload karein."
            else:
                return "Please specify which disease you need treatment for, or upload a plant image."
        
        # Default responses
        if lang == 'ur':
            return """Main aapki madad karna chahta hoon! 🌱

Aap yeh kar sakte hain:
• Paudhay ki tasveer upload karein
• Kisi bimari ke baare mein poochein
• Dekhbhal ke tips lein
• Ilaaj ke tareeqe jaanein

Kya aap mujhe thoda aur detail mein bata sakte hain?"""
        else:
            return """I'd love to help you! 🌱

You can:
• Upload a plant image for detection
• Ask about specific diseases
• Get care tips
• Learn treatment methods

Could you please provide more details about what you need?"""
