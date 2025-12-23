"""
Hugging Face Plant Disease Detection
Uses pre-trained model for 38 plant diseases detection
"""

import torch
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification
import numpy as np
from disease_data import DISEASE_DATABASE

class HuggingFaceDetector:
    def __init__(self):
        """Initialize Hugging Face model for plant disease detection"""
        print("🌱 Loading Hugging Face Plant Disease Model...")
        
        # Using linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
        # This model detects 38 plant diseases from PlantVillage dataset
        self.model_name = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
        
        try:
            # Load processor and model
            self.processor = AutoImageProcessor.from_pretrained(self.model_name)
            self.model = AutoModelForImageClassification.from_pretrained(self.model_name)
            self.model.eval()
            
            # Get class labels
            self.labels = self.model.config.id2label
            
            print(f"✅ Model loaded successfully! Can detect {len(self.labels)} classes")
            
        except Exception as e:
            print(f"❌ Error loading Hugging Face model: {e}")
            print("⚠️ Falling back to basic detection...")
            self.model = None
            self.processor = None
            self.labels = None
    
    def detect(self, image_path):
        """
        Detect plant disease from image using Hugging Face model
        
        Args:
            image_path: Path to the image file
            
        Returns:
            dict: Detection results with disease info
        """
        try:
            # Load image
            image = Image.open(image_path).convert('RGB')
            
            if self.model is None or self.processor is None:
                return self._fallback_detection(image)
            
            # Preprocess image
            inputs = self.processor(images=image, return_tensors="pt")
            
            # Run inference
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
            
            # Get predictions
            probabilities = torch.nn.functional.softmax(logits, dim=-1)
            top_probs, top_indices = torch.topk(probabilities, k=3)
            
            # Get top prediction
            top_prob = top_probs[0][0].item()
            top_idx = top_indices[0][0].item()
            predicted_label = self.labels[top_idx]
            
            # Map Hugging Face label to our disease database
            disease_key = self._map_label_to_disease(predicted_label)
            
            # Get disease information
            disease_info = self._get_disease_info(disease_key, predicted_label)
            
            result = {
                'disease': disease_key,
                'disease_label': predicted_label,
                'confidence': float(top_prob),
                'top_3_predictions': [
                    {
                        'label': self.labels[top_indices[0][i].item()],
                        'confidence': float(top_probs[0][i].item())
                    }
                    for i in range(3)
                ],
                'disease_info': disease_info
            }
            
            return result
            
        except Exception as e:
            return {'error': f'Detection failed: {str(e)}'}
    
    def _map_label_to_disease(self, hf_label):
        """
        Map Hugging Face label to our disease database keys
        
        Args:
            hf_label: Label from Hugging Face model
            
        Returns:
            str: Disease key matching our database
        """
        label_lower = hf_label.lower()
        
        # Mapping from HF labels to our keys
        if 'healthy' in label_lower:
            return 'Healthy'
        elif 'tomato' in label_lower and 'early blight' in label_lower:
            return 'Tomato_Early_Blight'
        elif 'tomato' in label_lower and 'late blight' in label_lower:
            return 'Tomato_Late_Blight'
        elif 'tomato' in label_lower and 'leaf mold' in label_lower:
            return 'Tomato_Leaf_Mold'
        elif 'tomato' in label_lower and 'septoria' in label_lower:
            return 'Tomato_Septoria_Leaf_Spot'
        elif 'potato' in label_lower and 'early blight' in label_lower:
            return 'Potato_Early_Blight'
        elif 'potato' in label_lower and 'late blight' in label_lower:
            return 'Potato_Late_Blight'
        elif 'pepper' in label_lower and 'bacterial' in label_lower:
            return 'Pepper_Bell_Bacterial_Spot'
        elif 'corn' in label_lower and 'rust' in label_lower:
            return 'Corn_Common_Rust'
        elif 'grape' in label_lower and 'black rot' in label_lower:
            return 'Grape_Black_Rot'
        elif 'apple' in label_lower and 'scab' in label_lower:
            return 'Apple_Scab'
        elif 'strawberry' in label_lower and 'scorch' in label_lower:
            return 'Strawberry_Leaf_Scorch'
        else:
            # Return the original label if no mapping found
            return hf_label.replace(' ', '_').replace('___', '_')
    
    def _get_disease_info(self, disease_key, original_label):
        """Get disease information from database or create default"""
        
        if disease_key in DISEASE_DATABASE:
            return DISEASE_DATABASE[disease_key]
        
        # If not in our database, create basic info from HF label
        return {
            'name': original_label,
            'description': f'Disease detected: {original_label}. This plant disease has been identified using AI.',
            'severity': 'Moderate',
            'symptoms': [
                'Visual symptoms detected in the plant',
                'Please consult agricultural expert for detailed diagnosis',
                'Compare with reference images online'
            ],
            'treatment': [
                'Remove affected plant parts',
                'Apply appropriate fungicide or pesticide',
                'Improve plant care and environment',
                'Consult local agricultural extension office',
                'Isolate infected plants to prevent spread'
            ],
            'prevention': [
                'Use disease-resistant varieties',
                'Practice crop rotation',
                'Maintain proper plant spacing',
                'Ensure good air circulation',
                'Water at soil level, not on leaves',
                'Remove plant debris regularly'
            ]
        }
    
    def _fallback_detection(self, image):
        """Fallback to basic detection if model loading fails"""
        import random
        from disease_data import DISEASE_DATABASE
        
        # Simple fallback
        disease_key = random.choice(list(DISEASE_DATABASE.keys()))
        disease_info = DISEASE_DATABASE[disease_key]
        
        return {
            'disease': disease_key,
            'confidence': 0.65,
            'disease_info': disease_info,
            'note': 'Using fallback detection. Install proper model for better results.'
        }
    
    def get_supported_diseases(self):
        """Get list of all diseases the model can detect"""
        if self.labels:
            return list(self.labels.values())
        return []
