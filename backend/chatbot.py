"""
Plant Health Chatbot
Provides information about plant diseases, treatments, and general care advice
Supports English and Roman Urdu
"""

import re
from disease_data import DISEASE_DATABASE, GENERAL_CARE_TIPS
from language_data import (
    is_urdu_query, get_response_template, translate_disease_name,
    DISEASE_NAMES_URDU, RESPONSES_URDU, TREATMENT_TERMS_URDU
)

class PlantHealthChatbot:
    def __init__(self):
        self.disease_db = DISEASE_DATABASE
        self.care_tips = GENERAL_CARE_TIPS
        self.conversation_history = []
        
    def get_response(self, user_message, context=None):
        """
        Generate a response based on user message and context
        Context can include detected disease information from image analysis
        Supports English and Roman Urdu
        """
        user_message_lower = user_message.lower().strip()
        
        # Detect language
        is_urdu = is_urdu_query(user_message)
        lang = 'ur' if is_urdu else 'en'
        
        # Check if context includes a detected disease
        if context and 'disease' in context:
            disease_name = context['disease']
            if disease_name in self.disease_db:
                return self._get_disease_context_response(disease_name, user_message_lower, lang)
        
        # Pattern matching for different types of questions
        if self._is_greeting(user_message_lower, lang):
            return self._get_greeting_response(lang)
        
        elif self._is_asking_about_disease(user_message_lower, lang):
            return self._search_disease_info(user_message_lower, lang)
        
        elif self._is_asking_about_treatment(user_message_lower, lang):
            return self._search_treatment_info(user_message_lower, lang)
        
        elif self._is_asking_about_symptoms(user_message_lower, lang):
            return self._search_symptom_info(user_message_lower, lang)
        
        elif self._is_asking_about_prevention(user_message_lower, lang):
            return self._search_prevention_info(user_message_lower, lang)
        
        elif self._is_asking_about_care(user_message_lower, lang):
            return self._get_care_advice(user_message_lower, lang)
        
        elif self._is_asking_how_to_use(user_message_lower, lang):
            return self._get_usage_instructions(lang)
        
        else:
            return self._get_default_response(user_message_lower, lang)
    
    def _is_greeting(self, message, lang='en'):
        if lang == 'ur':
            greetings = ['assalam', 'salam', 'hello', 'hi', 'hey', 'kya hal', 'adab']
        else:
            greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings']
        return any(greeting in message for greeting in greetings)
    
    def _get_greeting_response(self, lang='en'):
        if lang == 'ur':
            return get_response_template('greeting', lang)
        
        return """Hello! 👋 I'm your Plant Health Assistant. I can help you with:

🔍 **Disease Detection**: Upload a plant image to detect diseases
💊 **Treatment Advice**: Get treatment recommendations for plant diseases
🌱 **Plant Care**: General tips for keeping your plants healthy
📚 **Disease Information**: Learn about symptoms, causes, and prevention

How can I help you today?"""
    
    def _is_asking_about_disease(self, message, lang='en'):
        if lang == 'ur':
            keywords = ['kya hai', 'batayein', 'bataiye', 'maloomat', 'samjhayein', 'bimari', 'beemari']
        else:
            keywords = ['what is', 'tell me about', 'information about', 'explain', 'disease', 'blight', 'rot', 'mold', 'rust']
        return any(keyword in message for keyword in keywords)
    
    def _is_asking_about_treatment(self, message, lang='en'):
        if lang == 'ur':
            keywords = ['ilaaj', 'ilaj', 'theek', 'kaise karein', 'kya karein', 'upay', 'tareeqa']
        else:
            keywords = ['treat', 'cure', 'fix', 'remedy', 'solution', 'how to treat', 'what should i do']
        return any(keyword in message for keyword in keywords)
    
    def _is_asking_about_symptoms(self, message, lang='en'):
        if lang == 'ur':
            keywords = ['alamaat', 'alamat', 'nishani', 'pehchan', 'kaise dikhta']
        else:
            keywords = ['symptom', 'sign', 'look like', 'identify', 'recognize']
        return any(keyword in message for keyword in keywords)
    
    def _is_asking_about_prevention(self, message, lang='en'):
        if lang == 'ur':
            keywords = ['bachao', 'bachna', 'rokna', 'hifazat', 'kaise bachein']
        else:
            keywords = ['prevent', 'avoid', 'stop', 'protection', 'how to prevent']
        return any(keyword in message for keyword in keywords)
    
    def _is_asking_about_care(self, message, lang='en'):
        if lang == 'ur':
            keywords = ['paani', 'pani', 'khad', 'dhoop', 'mitti', 'dekhbhal', 'ugana', 'ugayein']
        else:
            keywords = ['water', 'fertiliz', 'sunlight', 'soil', 'care', 'grow', 'mulch', 'spacing']
        return any(keyword in message for keyword in keywords)
    
    def _is_asking_how_to_use(self, message, lang='en'):
        if lang == 'ur':
            keywords = ['kaise istemal', 'kaise', 'madad', 'guide', 'rahnumai']
        else:
            keywords = ['how to use', 'how do i', 'how can i', 'help me', 'guide']
        return any(keyword in message for keyword in keywords)
    
    def _search_disease_info(self, message, lang='en'):
        """Search for disease information based on message content"""
        found_diseases = []
        
        # For Urdu, also check Urdu disease names
        if lang == 'ur':
            for disease_key, urdu_name in DISEASE_NAMES_URDU.items():
                if urdu_name.lower() in message or disease_key.lower() in message:
                    found_diseases.append((disease_key, self.disease_db[disease_key]))
            
            if found_diseases:
                response = ""
                for disease_key, disease_info in found_diseases[:2]:
                    response += f"\n**{translate_disease_name(disease_key, lang)}**\n\n"
                    response += f"{disease_info['description']}\n\n"
                    response += f"**{TREATMENT_TERMS_URDU['severity']}**: {disease_info['severity']}\n\n"
                    response += f"**{TREATMENT_TERMS_URDU['symptoms']}**:\n"
                    for symptom in disease_info['symptoms']:
                        response += f"• {symptom}\n"
                    response += "\n"
                
                response += "\nIlaaj ya bachao ke tareeqon ke baare mein jaanna chahte hain?"
                return response
            else:
                return get_response_template('disease_not_found', lang)
        
        for disease_key, disease_info in self.disease_db.items():
            disease_name_lower = disease_info['name'].lower()
            if disease_name_lower in message or disease_key.lower() in message:
                found_diseases.append((disease_key, disease_info))
        
        if found_diseases:
            response = ""
            for disease_key, disease_info in found_diseases[:2]:  # Limit to 2 diseases
                response += f"\n**{disease_info['name']}**\n\n"
                response += f"{disease_info['description']}\n\n"
                response += f"**Severity**: {disease_info['severity']}\n\n"
                response += "**Symptoms**:\n"
                for symptom in disease_info['symptoms']:
                    response += f"• {symptom}\n"
                response += "\n"
            
            response += "\nWould you like to know about treatment or prevention methods?"
            return response
        else:
            return """I couldn't find information about that specific disease. I have information about these diseases:

• Tomato Early Blight
• Tomato Late Blight
• Tomato Leaf Mold
• Tomato Septoria Leaf Spot
• Potato Early Blight
• Potato Late Blight
• Pepper Bacterial Spot
• Corn Common Rust
• Grape Black Rot
• Apple Scab
• Strawberry Leaf Scorch

You can also upload an image of your plant for disease detection!"""
    
    def _search_treatment_info(self, message, lang='en'):
        """Search for treatment information"""
        found_diseases = []
        
        # For Urdu, check Urdu disease names
        if lang == 'ur':
            for disease_key, urdu_name in DISEASE_NAMES_URDU.items():
                if urdu_name.lower() in message or disease_key.lower() in message:
                    found_diseases.append((disease_key, self.disease_db[disease_key]))
            
            if found_diseases:
                response = ""
                for disease_key, disease_info in found_diseases[:2]:
                    response += f"\n**{translate_disease_name(disease_key, lang)} Ka {TREATMENT_TERMS_URDU['treatment']}**:\n\n"
                    for i, treatment in enumerate(disease_info['treatment'], 1):
                        response += f"{i}. {treatment}\n"
                    response += "\n"
                return response
            else:
                return "Meherbani karke bataiye kis bimari ka ilaaj jaanna hai, ya apne paudhay ki tasveer upload karein."
        
        for disease_key, disease_info in self.disease_db.items():
            disease_name_lower = disease_info['name'].lower()
            if disease_name_lower in message or disease_key.lower() in message:
                found_diseases.append((disease_key, disease_info))
        
        if found_diseases:
            response = ""
            for disease_key, disease_info in found_diseases[:2]:
                response += f"\n**Treatment for {disease_info['name']}**:\n\n"
                for i, treatment in enumerate(disease_info['treatment'], 1):
                    response += f"{i}. {treatment}\n"
                response += "\n"
            
            return response
        else:
            return "Please specify which disease you'd like treatment information for, or upload an image of your plant for analysis."
    
    def _search_symptom_info(self, message, lang='en'):
        """Search for symptom information"""
        found_diseases = []
        
        # For Urdu, check Urdu disease names
        if lang == 'ur':
            for disease_key, urdu_name in DISEASE_NAMES_URDU.items():
                if urdu_name.lower() in message or disease_key.lower() in message:
                    found_diseases.append((disease_key, self.disease_db[disease_key]))
            
            if found_diseases:
                response = ""
                for disease_key, disease_info in found_diseases[:2]:
                    response += f"\n**{translate_disease_name(disease_key, lang)} Ki {TREATMENT_TERMS_URDU['symptoms']}**:\n\n"
                    for symptom in disease_info['symptoms']:
                        response += f"• {symptom}\n"
                    response += "\n"
                return response
            else:
                return "Meherbani karke bataiye kis bimari ki alamaat jaanni hain, ya apne symptoms bataiye main pehchan mein madad kar sakta hoon."
        
        for disease_key, disease_info in self.disease_db.items():
            disease_name_lower = disease_info['name'].lower()
            if disease_name_lower in message or disease_key.lower() in message:
                found_diseases.append((disease_key, disease_info))
        
        if found_diseases:
            response = ""
            for disease_key, disease_info in found_diseases[:2]:
                response += f"\n**Symptoms of {disease_info['name']}**:\n\n"
                for symptom in disease_info['symptoms']:
                    response += f"• {symptom}\n"
                response += "\n"
            
            return response
        else:
            return "Please specify which disease you'd like to know symptoms for, or describe the symptoms you're seeing and I can help identify the disease."
    
    def _search_prevention_info(self, message, lang='en'):
        """Search for prevention information"""
        found_diseases = []
        
        # For Urdu, check Urdu disease names
        if lang == 'ur':
            for disease_key, urdu_name in DISEASE_NAMES_URDU.items():
                if urdu_name.lower() in message or disease_key.lower() in message:
                    found_diseases.append((disease_key, self.disease_db[disease_key]))
            
            if found_diseases:
                response = ""
                for disease_key, disease_info in found_diseases[:2]:
                    response += f"\n**{translate_disease_name(disease_key, lang)} Se {TREATMENT_TERMS_URDU['prevention']}**:\n\n"
                    for i, prevention in enumerate(disease_info['prevention'], 1):
                        response += f"{i}. {prevention}\n"
                    response += "\n"
                return response
            else:
                return "Meherbani karke bataiye kis bimari se bachna hai. Main alag alag bimariyon ke bachao ki tafseel de sakta hoon."
        
        for disease_key, disease_info in self.disease_db.items():
            disease_name_lower = disease_info['name'].lower()
            if disease_name_lower in message or disease_key.lower() in message:
                found_diseases.append((disease_key, disease_info))
        
        if found_diseases:
            response = ""
            for disease_key, disease_info in found_diseases[:2]:
                response += f"\n**Prevention for {disease_info['name']}**:\n\n"
                for i, prevention in enumerate(disease_info['prevention'], 1):
                    response += f"{i}. {prevention}\n"
                response += "\n"
            
            return response
        else:
            return "Please specify which disease you'd like prevention information for. I can provide detailed prevention strategies for various plant diseases."
    
    def _get_care_advice(self, message, lang='en'):
        """Provide general plant care advice"""
        if lang == 'ur':
            if 'paani' in message or 'pani' in message:
                return get_response_template('watering', lang)
            elif 'khad' in message:
                return get_response_template('fertilizing', lang)
            elif 'dhoop' in message:
                return get_response_template('sunlight', lang)
            else:
                return get_response_template('general_care', lang)
        
        if 'water' in message:
            return f"**Watering Tips**: {self.care_tips['watering']}\n\nRemember: Overwatering is more harmful than underwatering for most plants!"
        
        elif 'fertiliz' in message:
            return f"**Fertilizing Tips**: {self.care_tips['fertilizing']}\n\nOver-fertilizing can harm plants. Less is often more!"
        
        elif 'sun' in message or 'light' in message:
            return f"**Sunlight Requirements**: {self.care_tips['sunlight']}\n\nInsufficient light leads to weak, leggy plants."
        
        elif 'soil' in message:
            return f"**Soil Tips**: {self.care_tips['soil']}\n\nGood soil is the foundation of healthy plants!"
        
        elif 'spacing' in message:
            return f"**Spacing Tips**: {self.care_tips['spacing']}\n\nProper spacing prevents disease and competition."
        
        elif 'mulch' in message:
            return f"**Mulching Tips**: {self.care_tips['mulching']}\n\nMulch is one of the best things you can do for your garden!"
        
        else:
            return """**General Plant Care Tips**:

🚰 **Water**: Deep, infrequent watering is better than shallow, frequent watering
☀️ **Sunlight**: Most vegetables need 6-8 hours of direct sun
🌱 **Soil**: Well-draining, organic-rich soil (pH 6.0-7.0)
🍽️ **Fertilizer**: Use balanced fertilizer per package directions
🌿 **Spacing**: Follow recommended spacing for air circulation
🍂 **Mulch**: 2-3 inches around plants

What specific aspect of plant care would you like to know more about?"""
    
    def _get_disease_context_response(self, disease_name, user_message, lang='en'):
        """Generate response with context of a detected disease"""
        if disease_name not in self.disease_db:
            if lang == 'ur':
                return "Mujhe is bimari ke baare mein maloomat nahi hai."
            return "I don't have information about that disease."
        
        disease_info = self.disease_db[disease_name]
        display_name = translate_disease_name(disease_name, lang) if lang == 'ur' else disease_info['name']
        
        if lang == 'ur':
            if 'ilaaj' in user_message or 'ilaj' in user_message or 'theek' in user_message or 'kaise karein' in user_message:
                response = f"**{display_name} Ka {TREATMENT_TERMS_URDU['treatment']}**:\n\n"
                for i, treatment in enumerate(disease_info['treatment'], 1):
                    response += f"{i}. {treatment}\n"
                return response
            
            elif 'bachao' in user_message or 'bachna' in user_message:
                response = f"**{display_name} Se {TREATMENT_TERMS_URDU['prevention']}**:\n\n"
                for i, prevention in enumerate(disease_info['prevention'], 1):
                    response += f"{i}. {prevention}\n"
                return response
            
            else:
                response = f"**{display_name}**\n\n"
                response += f"{disease_info['description']}\n\n"
                response += f"**{TREATMENT_TERMS_URDU['severity']}**: {disease_info['severity']}\n\n"
                response += f"**{TREATMENT_TERMS_URDU['treatment']}**:\n"
                for i, treatment in enumerate(disease_info['treatment'][:3], 1):
                    response += f"{i}. {treatment}\n"
                response += "\nBachao ya alamaat ke baare mein aur tafseel chahiye?"
                return response
        
        if 'treat' in user_message or 'cure' in user_message or 'fix' in user_message:
            response = f"**Treatment for {disease_info['name']}**:\n\n"
            for i, treatment in enumerate(disease_info['treatment'], 1):
                response += f"{i}. {treatment}\n"
            return response
        
        elif 'prevent' in user_message:
            response = f"**Prevention for {disease_info['name']}**:\n\n"
            for i, prevention in enumerate(disease_info['prevention'], 1):
                response += f"{i}. {prevention}\n"
            return response
        
        else:
            response = f"**{disease_info['name']}**\n\n"
            response += f"{disease_info['description']}\n\n"
            response += f"**Severity**: {disease_info['severity']}\n\n"
            response += "**Treatment**:\n"
            for i, treatment in enumerate(disease_info['treatment'][:3], 1):
                response += f"{i}. {treatment}\n"
            response += "\nWould you like more details about prevention or specific symptoms?"
            return response
    
    def _get_usage_instructions(self, lang='en'):
        if lang == 'ur':
            return get_response_template('how_to_use', lang)
        
        return """**How to Use This System**:

1️⃣ **Image Detection**: 
   • Click "Upload Image" or drag & drop a plant photo
   • The system will analyze it and detect any diseases
   • You'll get disease information and treatment recommendations

2️⃣ **Chatbot**:
   • Ask questions about plant diseases
   • Get treatment recommendations
   • Learn about prevention strategies
   • Get general plant care advice

3️⃣ **Example Questions**:
   • "What is tomato early blight?"
   • "How do I treat late blight?"
   • "How can I prevent leaf mold?"
   • "My plant has brown spots, what could it be?"

Try uploading an image or ask me anything about plant health!"""
    
    def _get_default_response(self, message, lang='en'):
        """Default response when no pattern matches"""
        # Try to find any disease mentioned
        for disease_key, disease_info in self.disease_db.items():
            if disease_key.lower().replace('_', ' ') in message:
                return self._search_disease_info(message, lang)
        
        if lang == 'ur':
            return get_response_template('default', lang)
        
        return """I'm here to help with plant disease detection and treatment! 

You can:
• Upload an image for disease detection
• Ask about specific plant diseases
• Get treatment recommendations
• Learn prevention strategies
• Get general plant care tips

What would you like to know?"""
    
    def get_all_diseases(self):
        """Return list of all diseases in database"""
        return [
            {
                'key': key,
                'name': info['name'],
                'severity': info['severity']
            }
            for key, info in self.disease_db.items()
        ]
    
    def get_disease_details(self, disease_key):
        """Get detailed information about a specific disease"""
        if disease_key in self.disease_db:
            return self.disease_db[disease_key]
        return None
