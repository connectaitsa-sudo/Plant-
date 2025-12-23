"""
Multilingual Support - Roman Urdu and English
"""

LANGUAGES = {
    'en': 'English',
    'ur': 'Roman Urdu'
}

# Disease names in Roman Urdu
DISEASE_NAMES_URDU = {
    "Healthy": "Sehatmand Paudha",
    "Tomato_Early_Blight": "Tamatar Ki Jaldi Wali Bimari",
    "Tomato_Late_Blight": "Tamatar Ki Deri Wali Bimari",
    "Tomato_Leaf_Mold": "Tamatar Ke Patte Par Kharaab",
    "Tomato_Septoria_Leaf_Spot": "Tamatar Ke Patte Par Daag",
    "Potato_Early_Blight": "Aalu Ki Jaldi Wali Bimari",
    "Potato_Late_Blight": "Aalu Ki Deri Wali Bimari",
    "Pepper_Bell_Bacterial_Spot": "Shimla Mirch Ka Bacterial Daag",
    "Corn_Common_Rust": "Makai Ka Zang",
    "Grape_Black_Rot": "Angoor Ka Kala SaRan",
    "Apple_Scab": "Seb Ki Khujli",
    "Strawberry_Leaf_Scorch": "Strawberry Ke Patte Ka Jalna"
}

# Common responses in Roman Urdu
RESPONSES_URDU = {
    "greeting": """Assalam-o-Alaikum! 👋 Main aapka Plant Health Assistant hoon. Main aapki madad kar sakta hoon:

🔍 **Bimari Ki Pehchan**: Paudhay ki tasveer upload karein
💊 **Ilaaj Ki Mashwara**: Paudhay ki bimariyon ka ilaaj
🌱 **Paudhay Ki Dekhbhal**: Sehat mand paudhay ugane ki tips
🛡️ **Bachao Ke Tareeqay**: Bimariyon se bachne ke tareeqe

Aaj main aapki kya madad kar sakta hoon?""",

    "how_to_use": """**Yeh System Kaise Istemal Karein**:

1️⃣ **Tasveer Se Pehchan**: 
   • "Upload Image" par click karein ya tasveer drag & drop karein
   • System tasveer ka jaiza lega aur bimari ki pehchan karega
   • Aapko bimari ki maloomat aur ilaaj milega

2️⃣ **Chatbot**:
   • Paudhay ki bimariyon ke baare mein sawalaat poochein
   • Ilaaj ki salah hasil karein
   • Bachao ke tareeqe seekhein
   • Aam paudhay ki dekhbhal ki maloomat

3️⃣ **Misal Ke Sawalaat**:
   • "Tamatar ki jaldi wali bimari kya hai?"
   • "Late blight ka ilaaj kaise karein?"
   • "Paudhay ki bimariyon se kaise bachein?"
   • "Mere paudhay par brown spots hain, yeh kya ho sakta hai?"

Tasveer upload karein ya mujhse kuch bhi poochein!""",

    "watering": "**Paani Dene Ke Tips**: Paudhon ko gehri aur kam bar paani dein. Zyada tar paudhon ko hafte mein 1-2 inch paani chahiye. Subah ke waqt paani dein taake patte sookh jayein.",
    
    "fertilizing": "**Khad Dene Ke Tips**: Balanced khad (10-10-10) istemal karein. Packet ki hidayat ke mutabiq dein. Organic compost bohat acha hai.",
    
    "sunlight": "**Dhoop Ki Zaroorat**: Zyada tar sabziyon ko din mein 6-8 ghante seedhi dhoop chahiye. Patti wali sabziyan thori shade bardasht kar sakti hain.",
    
    "general_care": """**Aam Paudhay Ki Dekhbhal Ke Tips**:

🚰 **Paani**: Gehri, kam bar paani dena behtar hai
☀️ **Dhoop**: Zyada tar sabziyon ko 6-8 ghante dhoop chahiye
🌱 **Mitti**: Achi drainage wali, organic mitti (pH 6.0-7.0)
🍽️ **Khad**: Balanced khad package ke mutabiq
🌿 **Fasla**: Hawa ke liye sahi fasla rakhein
🍂 **Mulch**: Paudhon ke aas paas 2-3 inch mulch

Aap kis cheez ke baare mein aur jaanna chahte hain?""",

    "disease_not_found": """Mujhe us bimari ke baare mein maloomat nahi mili. Mere paas in bimariyon ki maloomat hai:

• Tamatar Ki Jaldi Wali Bimari
• Tamatar Ki Deri Wali Bimari
• Tamatar Ke Patte Par Kharaab
• Tamatar Ke Patte Par Daag
• Aalu Ki Jaldi Wali Bimari
• Aalu Ki Deri Wali Bimari
• Shimla Mirch Ka Bacterial Daag
• Makai Ka Zang
• Angoor Ka Kala Saaran
• Seb Ki Khujli
• Strawberry Ke Patte Ka Jalna

Aap apne paudhay ki tasveer bhi upload kar sakte hain!""",

    "default": """Main paudhay ki bimariyon ki pehchan aur ilaaj mein madad ke liye hoon!

Aap:
• Bimari ki pehchan ke liye tasveer upload karein
• Kisi khaas bimari ke baare mein poochein
• Ilaaj ki salah hasil karein
• Bachao ke tareeqe seekhein
• Aam paudhay ki dekhbhal ke tips lein

Aap kya jaanna chahte hain?"""
}

# Treatment terms in Roman Urdu
TREATMENT_TERMS_URDU = {
    "symptoms": "Alamaat",
    "treatment": "Ilaaj",
    "prevention": "Bachao",
    "severity": "Shiddat",
    "description": "Tafseel",
    "remove": "Hatayein",
    "apply": "Lagayein",
    "use": "Istemal karein",
    "spray": "Spray karein",
    "water": "Paani dein",
    "fungicide": "Fungicide (Kharaabi khatam karne wali dawa)",
    "immediately": "Foran",
    "regularly": "Mustanad tor par"
}

def translate_disease_name(disease_key, language='en'):
    """Translate disease name to specified language"""
    if language == 'ur':
        return DISEASE_NAMES_URDU.get(disease_key, disease_key)
    return disease_key

def get_response_template(key, language='en'):
    """Get response template in specified language"""
    if language == 'ur':
        return RESPONSES_URDU.get(key, RESPONSES_URDU['default'])
    return None  # Return None for English to use original responses

def is_urdu_query(message):
    """Detect if query is in Roman Urdu"""
    urdu_words = [
        # Greetings
        'assalam', 'salam', 'adab', 'walaikum',
        # Question words
        'kya', 'kaise', 'kyun', 'kab', 'kahan', 'kitna', 'kitni', 'kaun', 'kis',
        # Verbs
        'hai', 'hain', 'ho', 'karein', 'karen', 'karna', 'hota', 'hoti',
        'batayein', 'bataiye', 'batao', 'samjhayein', 'dekhna', 'dena', 'dein',
        # Pronouns
        'mujhe', 'mujhy', 'mere', 'mera', 'meri', 'aap', 'aapka', 'humara',
        # Plant related
        'paudhay', 'paudhe', 'paudha', 'patti', 'patte', 'phool', 'phal',
        # Disease related
        'bimari', 'beemari', 'bimar', 'ilaaj', 'ilaj', 'dawa', 'daag', 'alamaat',
        'bachao', 'bachna', 'rokna', 'theek', 'kharaab',
        # Crops
        'tamatar', 'aalu', 'alu', 'mirch', 'makai', 'angoor', 'seb', 'strawberry',
        # Care
        'paani', 'pani', 'khad', 'dhoop', 'mitti', 'dekhbhal', 'ugana', 'ugayein',
        # Common words
        'khaas', 'tasveer', 'madad', 'seekhna', 'chahta', 'chahte', 'chahti',
        'chahiye', 'zaroori', 'behtar', 'acha', 'buraa', 'zyada', 'kam',
        'shukriya', 'meherbani', 'maloomat', 'tafseel', 'tareeqa', 'upay'
    ]
    
    message_lower = message.lower()
    
    # Check if message contains Roman Urdu words
    urdu_word_count = sum(1 for word in urdu_words if word in message_lower)
    
    # If 1 or more strong Urdu words found, consider it an Urdu query
    # Reduced threshold for better detection
    return urdu_word_count >= 1
