"""
OpenAI-Powered Chatbot with Voice Support
Smart conversational AI for plant disease queries
"""

import os
from openai import OpenAI
from disease_data import DISEASE_DATABASE
from language_data import is_urdu_query
import base64
from gtts import gTTS
import tempfile

class OpenAIChatbot:
    def __init__(self):
        """Initialize OpenAI chatbot"""
        self.api_key = os.getenv('OPENAI_API_KEY', '')
        self.client = None
        self.use_ai = False
        
        if self.api_key:
            try:
                self.client = OpenAI(api_key=self.api_key)
                # Test the connection
                self.client.models.list()
                self.use_ai = True
                print("✅ OpenAI Chatbot initialized successfully!")
            except Exception as e:
                print(f"⚠️ Could not initialize OpenAI: {e}")
                self.use_ai = False
        else:
            print("⚠️ No OPENAI_API_KEY found. Using basic chatbot.")
            print("💡 Get API key from: https://platform.openai.com/api-keys")
        
        self.conversation_history = []
    
    def get_response(self, user_message, context=None, voice_output=False):
        """
        Get AI response for user query
        
        Args:
            user_message: User's question
            context: Optional context (detected disease, etc.)
            voice_output: If True, also generate voice response
            
        Returns:
            dict: Response with text and optional audio
        """
        # Detect language
        is_urdu = is_urdu_query(user_message)
        lang = 'ur' if is_urdu else 'en'
        
        if self.use_ai and self.client:
            response_text = self._get_ai_response(user_message, context, lang)
        else:
            response_text = self._get_fallback_response(user_message, context, lang)
        
        result = {'text': response_text}
        
        # Generate voice if requested
        if voice_output:
            try:
                audio_base64 = self._text_to_speech(response_text, lang)
                result['audio'] = audio_base64
            except Exception as e:
                print(f"Voice generation error: {e}")
        
        return result
    
    def _get_ai_response(self, user_message, context, lang):
        """Get response from OpenAI"""
        try:
            # Build context-aware prompt
            system_prompt = self._build_system_prompt(context, lang)
            
            # Create messages
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
            
            # Generate response
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"OpenAI Error: {e}")
            return self._get_fallback_response(user_message, context, lang)
    
    def _build_system_prompt(self, context, lang):
        """Build system prompt with context"""
        if lang == 'ur':
            base_prompt = """Aap ek expert Plant Health Doctor hain jo Roman Urdu mein baat karte hain.

Aapki expertise:
- Paudhon ki bimariyon ki diagnosis
- Practical treatment solutions
- Prevention strategies
- Plant care tips

Style:
- Roman Urdu mein clear jawab dein
- Simple language use karein
- Practical tips dein
- Step-by-step guidance
- Friendly aur helpful rahein

IMPORTANT: Sirf Roman Urdu mein jawab dein (English words: treatment, fungicide OK hain)"""
        else:
            base_prompt = """You are an expert Plant Health Doctor specializing in plant disease diagnosis and treatment.

Your expertise includes:
- Accurate disease identification
- Evidence-based treatment recommendations
- Prevention strategies
- Practical plant care advice

Communication style:
- Clear and concise
- Practical and actionable
- Friendly and supportive
- Step-by-step guidance when needed

Focus on giving specific, helpful advice that home gardeners can actually implement."""
        
        # Add detected disease context
        if context and 'disease' in context:
            disease_key = context['disease']
            if disease_key in DISEASE_DATABASE:
                disease_info = DISEASE_DATABASE[disease_key]
                if lang == 'ur':
                    base_prompt += f"\n\nCURRENT CONTEXT: User ne {disease_info['name']} detect ki hai. Is context ko dhyan mein rakhein."
                else:
                    base_prompt += f"\n\nCURRENT CONTEXT: User has detected {disease_info['name']}. Keep this in mind when responding."
        
        # Add disease database
        disease_count = len(DISEASE_DATABASE)
        if lang == 'ur':
            base_prompt += f"\n\nAapke paas {disease_count} common plant diseases ki detailed information hai."
        else:
            base_prompt += f"\n\nYou have detailed information about {disease_count} common plant diseases."
        
        return base_prompt
    
    def _get_fallback_response(self, user_message, context, lang):
        """Fallback when AI not available"""
        message_lower = user_message.lower()
        
        if any(word in message_lower for word in ['hello', 'hi', 'assalam', 'salam']):
            if lang == 'ur':
                return """Assalam-o-Alaikum! 👋 Main aapka Plant Health Doctor hoon.

Main aapki kaise madad kar sakta hoon:

🔬 **Disease Diagnosis** - Tasveer upload karein
💊 **Treatment** - Har bimari ka ilaaj
🛡️ **Prevention** - Bachao ke tareeqe  
🌱 **Care Tips** - Plant care advice
🎤 **Voice** - Mic se baat karein!

Kya sawal hai aapka?"""
            else:
                return """Hello! 👋 I'm your Plant Health Doctor.

How can I help you today:

🔬 **Diagnose** - Upload plant images
💊 **Treat** - Get treatment plans
🛡️ **Prevent** - Prevention strategies
🌱 **Care** - Expert advice
🎤 **Voice** - Talk using mic!

What would you like to know?"""
        
        # Treatment query
        if 'treat' in message_lower or 'ilaaj' in message_lower:
            if context and 'disease' in context:
                disease_key = context['disease']
                if disease_key in DISEASE_DATABASE:
                    disease_info = DISEASE_DATABASE[disease_key]
                    response = f"**{disease_info['name']} Treatment**:\n\n"
                    for i, treatment in enumerate(disease_info['treatment'][:5], 1):
                        response += f"{i}. {treatment}\n"
                    return response
        
        # Default
        if lang == 'ur':
            return """Main samajh nahi paaya. Kya aap:

• Kisi specific bimari ke baare mein poochna chahte hain?
• Treatment chahiye?
• Prevention tips chahiye?
• Mic button dabake baat karein!

Thoda aur detail dein ya tasveer upload karein."""
        else:
            return """I'd love to help! Could you:

• Ask about a specific disease?
• Need treatment advice?
• Want prevention tips?
• Use the mic button to speak!

Please provide more details or upload an image."""
    
    def _text_to_speech(self, text, lang):
        """Convert text to speech and return base64"""
        try:
            # Language mapping
            tts_lang = 'en' if lang == 'en' else 'ur'
            
            # Generate speech
            tts = gTTS(text=text, lang=tts_lang, slow=False)
            
            # Save to temp file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as fp:
                temp_file = fp.name
                tts.save(temp_file)
            
            # Read and encode
            with open(temp_file, 'rb') as audio_file:
                audio_data = audio_file.read()
                audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            
            # Cleanup
            os.remove(temp_file)
            
            return audio_base64
            
        except Exception as e:
            print(f"TTS Error: {e}")
            return None
