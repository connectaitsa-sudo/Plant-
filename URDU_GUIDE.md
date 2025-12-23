# 🌱 Plant Health Detective - Roman Urdu Mein Rahnumai

## Yeh Kya Hai? 🤔

Yeh ek **website/application** hai jo aapke **paudhon ki bimariyan pehchanti** hai aur unka **ilaaj batati** hai.

Ismein **2 cheezein** hain:
1. **Tasveer Upload karein** → System bimari pehchanta hai
2. **Chatbot se baat karein** → Sawalaat poochein (Urdu ya English mein)

---

## 🚀 Kaise Chalayein (Step by Step)

### Step 1: Terminal/Command Prompt Kholein

**Windows:**
- Start Menu → Type "cmd" → Enter dabayein

**Mac/Linux:**
- Terminal app kholein

### Step 2: Is Folder Mein Jayein

```bash
cd /workspace
```

### Step 3: Application Chalayein

```bash
python3 run.py
```

Ya phir:
```bash
cd backend
python3 app.py
```

### Step 4: Browser Kholein

Apne browser mein yeh address likhen:
```
http://localhost:5000
```

**Bus! Aapki website chal gayi hai! 🎉**

---

## 🎯 Kaise Istemal Karein

### 1️⃣ Tasveer Se Bimari Pehchanein

**Kya karein:**
1. Apne paudhay ki tasveer leejiye (phone camera se)
2. Website par "Choose Image" button par click karein
3. Ya tasveer ko seedha drag karke upload area par chhor dein
4. 2-3 second wait karein
5. System aapko batayega:
   - ✅ Kis bimari hai
   - ✅ Kitna pakka hai (confidence)
   - ✅ Alamaat kya hain
   - ✅ Ilaaj kya hai
   - ✅ Bachao kaise karein

**Misal:**
- Aapne tamatar ke paudhay ki tasveer upload ki
- System bolega: "Tamatar Ki Jaldi Wali Bimari (85% confidence)"
- Phir ilaaj aur bachao ke tareeqe dikhayega

---

### 2️⃣ Chatbot Se Baat Karein (Roman Urdu Mein!)

**Ab aap Roman Urdu mein sawalaat pooch sakte hain!**

#### Urdu Mein Sawalaat Ki Misal:

**Greeting:**
- "Assalam o alaikum"
- "Hello kya hal hai"

**Bimari Ke Baare Mein:**
- "Tamatar ki jaldi wali bimari kya hai?"
- "Late blight ke baare mein batayein"
- "Aalu ki bimari kya hoti hai?"

**Ilaaj Ke Baare Mein:**
- "Tamatar ki bimari ka ilaaj kya hai?"
- "Early blight kaise theek karein?"
- "Mere paudhay par brown spots hain kya karein?"

**Bachao Ke Baare Mein:**
- "Bimariyon se kaise bachein?"
- "Tamatar ki bimari se bachao kaise karein?"
- "Prevention ke tareeqe batayein"

**Paudhay Ki Dekhbhal:**
- "Paani kitna dena chahiye?"
- "Kitni dhoop chahiye?"
- "Khad kab deni chahiye?"
- "Mitti kaisi honi chahiye?"

---

## 📱 Poora Process (Shuruaat Se End Tak)

### Scenario 1: Bimari Wala Paudha

```
1. Terminal mein: python3 run.py
2. Browser: http://localhost:5000
3. Paudhay ki tasveer upload karein
4. Result dekhen: "Tomato Early Blight - 85%"
5. Ilaaj padhen aur apply karein
6. Chatbot se poochein: "yeh kitna khatarnak hai?"
7. Bot jawab dega Urdu mein!
```

### Scenario 2: Sirf Sawalaat

```
1. Website kholein
2. Chatbot mein likhen: "Assalam o alaikum"
3. Bot Urdu mein jawab dega!
4. Poochein: "tamatar ki bimari kya hai?"
5. Ilaaj aur maloomat milegi
```

---

## 💬 Chatbot Urdu Mein Sawalaat Ke Mazeed Examples

### Aam Sawalaat:
```
✓ "Mere paudhay ki dekhbhal kaise karein?"
✓ "Paani roz dena chahiye ya nahi?"
✓ "Dhoop kitne ghante chahiye?"
✓ "Khad kis tarah se deni hai?"
✓ "Patte yellow kyun ho rahe hain?"
```

### Khaas Bimariyon Ke Baare Mein:
```
✓ "Tamatar ki jaldi wali bimari kya hai?"
✓ "Tamatar ki deri wali bimari ka ilaaj batayein"
✓ "Aalu par brown spots hain kya karein?"
✓ "Shimla mirch ki bimari se kaise bachein?"
```

### Ilaaj Ke Baare Mein:
```
✓ "Early blight ka ilaaj kaise karein?"
✓ "Kaunsi dawa lagani chahiye?"
✓ "Ghar par ilaaj kaise karein?"
✓ "Organic tareeqa batayein"
```

---

## 🌟 System Ki Khaasiyat

### 1. **Automatic Language Detection**
- Agar aap Urdu words use karenge (jaise: kya, hai, karein, paudhay)
- System khud samajh jayega aur Urdu mein jawab dega!
- English mein likhenge to English mein jawab milega

### 2. **12+ Bimariyan**
System in bimariyon ko pehchanta hai:
- ✅ Tamatar ki 4 tarah ki bimariyan
- ✅ Aalu ki 2 bimariyan
- ✅ Shimla mirch ki bimari
- ✅ Makai, Angoor, Seb, Strawberry ki bimariyan
- ✅ Sehatmand paudhay ki pehchan

### 3. **Har Bimari Ke Liye**
- 📋 Tafseel (Description)
- ⚠️ Alamaat (Symptoms)
- 💊 Ilaaj (Treatment)
- 🛡️ Bachao (Prevention)
- 📊 Shiddat (Severity - Kitna khatarnak)

---

## 🐛 Agar Masla Ho To

### Problem: "python3 command not found"
**Hall:**
```bash
python run.py
```
(python3 ki jagah sirf python likhen)

### Problem: "Port already in use"
**Hall:**
- Pehle wali window band karein
- Ya run.py file mein port badal dein (5000 → 5001)

### Problem: "Module not found"
**Hall:**
```bash
pip3 install -r requirements.txt
```

### Problem: "Tasveer upload nahi ho rahi"
**Hall:**
- File size 16MB se kam honi chahiye
- Sirf PNG, JPG, JPEG files
- Internet connection check karein

---

## 📚 Kis Cheez Ke Liye Kya File

```
backend/          → Python code (dimagh)
  - app.py        → Main server
  - chatbot.py    → Chatbot ka code (Urdu support!)
  - language_data.py → Urdu translations
  - disease_data.py  → Bimariyon ki maloomat

frontend/         → Website (jo aap dekhte hain)
  - index.html    → Main page
  - style.css     → Design/rang
  - script.js     → Interactive features

run.py           → Application chalane ke liye
```

---

## 🎓 Kuch Ahem Baatein

### Tasveer Upload Ke Liye Tips:
1. **Saaf tasveer** → Dhundhli nahi
2. **Roshni achchhi** → Andhera nahi
3. **Bimari wala hissa** → Patte/stem jo kharaab hain
4. **Qareeb se** → Door se nahi

### Chatbot Tips:
1. **Poora naam** → "Tamatar ki jaldi wali bimari" (sirf "blight" nahi)
2. **Urdu words** → Zyada Urdu words = Urdu jawab
3. **Saaf sawal** → "Kya hai?" ki jagah "Tamatar ki bimari kya hai?"

---

## ✅ Quick Reference - Fauran Madad

### Chalane Ka Tareeqa:
```bash
cd /workspace
python3 run.py
# Browser: http://localhost:5000
```

### Band Karna:
```
Terminal mein: CTRL + C dabayein
```

### Test Karna:
```bash
python3 test_setup.py
```

---

## 🌿 Ab Aap Kya Kar Sakte Hain

### ✅ Tasveer Upload Karein
- Apne garden ke paudhon ki
- Ya Google se disease wali tasveeren download karein
- System test karein!

### ✅ Urdu Mein Sawalaat Poochein
- "Assalam o alaikum"
- "Tamatar ki bimari kya hai?"
- "Paani kitna dena chahiye?"

### ✅ Ilaaj Hasil Karein
- Detected bimari ka ilaaj
- Prevention tips
- Dekhbhal ki maloomat

---

## 🎉 Khulasa

**Aapke paas ab ek complete system hai jo:**
1. ✅ Paudhon ki bimariyan pehchanta hai
2. ✅ Roman Urdu samajhta hai aur jawab deta hai
3. ✅ English bhi samajhta hai
4. ✅ Ilaaj aur bachao batata hai
5. ✅ Beautiful website hai
6. ✅ Mobile par bhi chalta hai

---

## 📞 Madad Chahiye?

1. **URDU_GUIDE.md** (yeh file) → Urdu mein rahnumai
2. **START_HERE.md** → English mein quick start
3. **README.md** → Complete English documentation
4. **USAGE_EXAMPLES.md** → Examples

---

## 🚀 Ab Shuru Karein!

```bash
# Terminal mein yeh 2 commands:
cd /workspace
python3 run.py

# Browser mein:
http://localhost:5000

# Phir tasveer upload karein ya chatbot se baat karein!
```

---

**Har cheez tayar hai! Bus chalayein aur istemal karein! 🌱**

**Khush Baghbani! 🌻**

---

*Agar koi sawal ho to chatbot se Urdu mein pooch sakte hain!*
