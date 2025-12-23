"""
Plant Disease Database with treatments and information
"""

DISEASE_DATABASE = {
    "Healthy": {
        "name": "Healthy Plant",
        "description": "Your plant appears to be healthy with no visible signs of disease.",
        "symptoms": [
            "Vibrant green leaves",
            "No spots or discoloration",
            "Strong stem structure",
            "Normal growth pattern"
        ],
        "treatment": [
            "Continue regular watering schedule",
            "Maintain proper sunlight exposure",
            "Use balanced fertilizer monthly",
            "Monitor for any changes regularly"
        ],
        "prevention": [
            "Ensure good air circulation",
            "Avoid overwatering",
            "Keep leaves dry when watering",
            "Inspect plants regularly"
        ],
        "severity": "None"
    },
    
    "Tomato_Early_Blight": {
        "name": "Tomato Early Blight",
        "description": "A fungal disease caused by Alternaria solani that affects tomato plants, causing dark spots with concentric rings on older leaves.",
        "symptoms": [
            "Brown spots with concentric rings on lower leaves",
            "Yellow halo around spots",
            "Leaves turn yellow and drop",
            "Spots on stems and fruit"
        ],
        "treatment": [
            "Remove and destroy infected leaves immediately",
            "Apply copper-based fungicide or chlorothalonil",
            "Use organic neem oil spray weekly",
            "Improve air circulation around plants",
            "Water at soil level, not on leaves"
        ],
        "prevention": [
            "Rotate crops every 2-3 years",
            "Use disease-resistant varieties",
            "Mulch around plants to prevent soil splash",
            "Space plants properly for air flow",
            "Remove plant debris at season end"
        ],
        "severity": "Moderate"
    },
    
    "Tomato_Late_Blight": {
        "name": "Tomato Late Blight",
        "description": "A devastating disease caused by Phytophthora infestans that can destroy entire crops rapidly in cool, wet conditions.",
        "symptoms": [
            "Large brown/gray water-soaked spots on leaves",
            "White fuzzy growth on leaf undersides",
            "Brown firm spots on fruit",
            "Rapid plant collapse in humid weather"
        ],
        "treatment": [
            "Remove infected plants immediately to prevent spread",
            "Apply copper fungicide or Mancozeb preventatively",
            "Improve drainage and reduce humidity",
            "Avoid overhead watering",
            "Consider destroying severely infected plants"
        ],
        "prevention": [
            "Plant certified disease-free seeds/transplants",
            "Avoid planting near potatoes (same pathogen)",
            "Ensure excellent air circulation",
            "Water in morning so leaves dry quickly",
            "Use resistant varieties when available"
        ],
        "severity": "Severe"
    },
    
    "Tomato_Leaf_Mold": {
        "name": "Tomato Leaf Mold",
        "description": "Fungal disease (Fulvia fulva) common in greenhouse tomatoes, causing yellowing and fuzzy mold on leaves.",
        "symptoms": [
            "Yellow spots on upper leaf surfaces",
            "Olive-green to brown fuzzy mold on leaf undersides",
            "Leaves curl and eventually die",
            "Reduced fruit production"
        ],
        "treatment": [
            "Remove affected leaves promptly",
            "Increase ventilation to reduce humidity",
            "Apply sulfur-based or copper fungicide",
            "Space plants for better air flow",
            "Reduce leaf wetness"
        ],
        "prevention": [
            "Keep humidity below 85%",
            "Provide excellent ventilation in greenhouses",
            "Avoid wetting foliage when watering",
            "Use resistant varieties",
            "Sanitize greenhouse between crops"
        ],
        "severity": "Moderate"
    },
    
    "Tomato_Septoria_Leaf_Spot": {
        "name": "Tomato Septoria Leaf Spot",
        "description": "Fungal disease (Septoria lycopersici) causing small circular spots with gray centers on leaves.",
        "symptoms": [
            "Small circular spots with gray centers",
            "Dark brown margins around spots",
            "Tiny black dots (fruiting bodies) in spot centers",
            "Lower leaves affected first, moving upward"
        ],
        "treatment": [
            "Remove infected lower leaves",
            "Apply copper or sulfur-based fungicide",
            "Use organic fungicides like neem oil",
            "Mulch to prevent soil splash",
            "Water at base of plants"
        ],
        "prevention": [
            "Practice crop rotation",
            "Remove plant debris at end of season",
            "Space plants for air circulation",
            "Use drip irrigation or soaker hoses",
            "Apply preventative fungicide in wet weather"
        ],
        "severity": "Moderate"
    },
    
    "Potato_Early_Blight": {
        "name": "Potato Early Blight",
        "description": "Fungal disease affecting potatoes, similar to tomato early blight, causing yield reduction.",
        "symptoms": [
            "Brown spots with concentric rings on leaves",
            "Lower leaves affected first",
            "Yellowing around spots",
            "Lesions on tubers"
        ],
        "treatment": [
            "Apply copper-based fungicide",
            "Remove infected foliage",
            "Ensure adequate plant nutrition",
            "Improve drainage",
            "Harvest tubers carefully to avoid wounds"
        ],
        "prevention": [
            "Plant certified disease-free seed potatoes",
            "Rotate crops (avoid planting in same spot for 3 years)",
            "Hill soil properly around plants",
            "Maintain plant vigor with proper fertilization",
            "Remove volunteer potatoes"
        ],
        "severity": "Moderate"
    },
    
    "Potato_Late_Blight": {
        "name": "Potato Late Blight",
        "description": "The same pathogen that caused the Irish Potato Famine. Extremely destructive in cool, wet conditions.",
        "symptoms": [
            "Water-soaked brown spots on leaves",
            "White growth on undersides in humid conditions",
            "Brown rot on tubers",
            "Rapid plant death"
        ],
        "treatment": [
            "Apply protective fungicides immediately",
            "Remove and destroy infected plants",
            "Harvest unaffected tubers quickly",
            "Do not compost infected material",
            "Improve air circulation"
        ],
        "prevention": [
            "Use certified disease-free seed potatoes",
            "Choose resistant varieties",
            "Hill soil to protect developing tubers",
            "Monitor weather for blight-favorable conditions",
            "Apply preventative fungicides in wet weather"
        ],
        "severity": "Severe"
    },
    
    "Pepper_Bell_Bacterial_Spot": {
        "name": "Pepper Bacterial Spot",
        "description": "Bacterial disease (Xanthomonas campestris) affecting peppers, causing leaf spots and fruit lesions.",
        "symptoms": [
            "Small brown spots with yellow halos on leaves",
            "Raised brown spots on fruit",
            "Leaf drop in severe cases",
            "Reduced yield and fruit quality"
        ],
        "treatment": [
            "Remove infected plant parts",
            "Apply copper-based bactericide",
            "Avoid working with wet plants",
            "Disinfect tools between plants",
            "Consider removing severely infected plants"
        ],
        "prevention": [
            "Use disease-free seeds or transplants",
            "Practice 3-year crop rotation",
            "Avoid overhead irrigation",
            "Space plants for good air flow",
            "Don't handle plants when wet"
        ],
        "severity": "Moderate"
    },
    
    "Corn_Common_Rust": {
        "name": "Corn Common Rust",
        "description": "Fungal disease (Puccinia sorghi) causing rust-colored pustules on corn leaves.",
        "symptoms": [
            "Small reddish-brown pustules on leaves",
            "Pustules on both sides of leaves",
            "Elongated rust-colored lesions",
            "Premature leaf death in severe cases"
        ],
        "treatment": [
            "Apply fungicides if disease is severe",
            "Plant resistant varieties",
            "Remove infected plant debris",
            "Monitor for early detection",
            "Usually doesn't require treatment in home gardens"
        ],
        "prevention": [
            "Choose rust-resistant corn varieties",
            "Plant early to avoid peak rust season",
            "Ensure proper plant nutrition",
            "Remove volunteer corn plants",
            "Practice good garden sanitation"
        ],
        "severity": "Low to Moderate"
    },
    
    "Grape_Black_Rot": {
        "name": "Grape Black Rot",
        "description": "Fungal disease (Guignardia bidwellii) that can destroy entire grape crops if left untreated.",
        "symptoms": [
            "Reddish-brown spots on leaves",
            "Black rotted berries (mummies)",
            "Lesions on shoots and tendrils",
            "Fruit infection starts as pale spots"
        ],
        "treatment": [
            "Remove and destroy infected fruit and leaves",
            "Apply fungicides (Captan, Mancozeb)",
            "Prune for better air circulation",
            "Remove mummified berries",
            "Apply dormant spray before bud break"
        ],
        "prevention": [
            "Prune vines for good air circulation",
            "Remove all mummified berries in fall",
            "Clean up fallen leaves and debris",
            "Apply preventative fungicide sprays",
            "Start fungicide program at bud break"
        ],
        "severity": "Severe"
    },
    
    "Apple_Scab": {
        "name": "Apple Scab",
        "description": "Fungal disease (Venturia inaequalis) causing olive-green to black spots on leaves and fruit.",
        "symptoms": [
            "Olive-green to black spots on leaves",
            "Velvety appearance on spots",
            "Corky brown spots on fruit",
            "Premature leaf drop",
            "Cracked and deformed fruit"
        ],
        "treatment": [
            "Apply fungicides (Captan, Myclobutanil)",
            "Rake and remove fallen leaves",
            "Prune infected branches",
            "Improve air circulation",
            "Continue fungicide program through growing season"
        ],
        "prevention": [
            "Plant scab-resistant varieties",
            "Remove leaf litter in fall",
            "Prune trees for good air flow",
            "Apply preventative fungicides from green tip to petal fall",
            "Space trees properly"
        ],
        "severity": "Moderate to Severe"
    },
    
    "Strawberry_Leaf_Scorch": {
        "name": "Strawberry Leaf Scorch",
        "description": "Fungal disease (Diplocarpon earlianum) causing purple spots that expand into brown blotches on strawberry leaves.",
        "symptoms": [
            "Small purple spots on leaves",
            "Spots expand to irregular brown blotches",
            "Scorched appearance",
            "Reduced plant vigor",
            "Lower fruit production"
        ],
        "treatment": [
            "Remove and destroy infected leaves",
            "Apply fungicides at first sign of disease",
            "Improve air circulation",
            "Avoid overhead watering",
            "Thin plants if crowded"
        ],
        "prevention": [
            "Plant resistant varieties",
            "Provide adequate spacing (12-18 inches)",
            "Use drip irrigation",
            "Remove old leaves in spring",
            "Practice crop rotation",
            "Ensure good drainage"
        ],
        "severity": "Moderate"
    }
}

# Common plant care tips
GENERAL_CARE_TIPS = {
    "watering": "Water plants deeply but infrequently. Most plants need 1-2 inches per week. Water early morning to allow foliage to dry.",
    "fertilizing": "Use balanced fertilizer (10-10-10) for most vegetables. Apply according to package directions. Organic compost is excellent.",
    "sunlight": "Most vegetables need 6-8 hours of direct sunlight daily. Leafy greens can tolerate partial shade.",
    "soil": "Use well-draining soil rich in organic matter. pH should be 6.0-7.0 for most vegetables.",
    "spacing": "Proper spacing prevents disease by improving air circulation. Follow seed packet recommendations.",
    "mulching": "Apply 2-3 inches of mulch around plants to retain moisture, suppress weeds, and prevent soil splash."
}
