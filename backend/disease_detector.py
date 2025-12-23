"""
Plant Disease Detection using CNN
For demo purposes, this uses a rule-based approach.
In production, you would use a trained deep learning model.
"""

import cv2
import numpy as np
from PIL import Image
from disease_data import DISEASE_DATABASE
import random

class PlantDiseaseDetector:
    def __init__(self):
        self.model = None
        self.classes = list(DISEASE_DATABASE.keys())
        print("Disease detector initialized with", len(self.classes), "disease classes")
    
    def detect(self, image_path):
        """
        Detect disease from image
        For demo: Uses image analysis to provide realistic detection
        In production: Replace with trained CNN model
        """
        try:
            # Load and analyze image
            img = cv2.imread(image_path)
            if img is None:
                return {'error': 'Could not read image'}
            
            # Analyze image characteristics
            disease_result = self._analyze_image(img)
            
            disease_name = disease_result['disease']
            confidence = disease_result['confidence']
            
            # Get disease information
            disease_info = DISEASE_DATABASE.get(disease_name, {})
            
            result = {
                'disease': disease_name,
                'confidence': confidence,
                'disease_info': {
                    'name': disease_info.get('name', 'Unknown'),
                    'description': disease_info.get('description', ''),
                    'severity': disease_info.get('severity', 'Unknown'),
                    'symptoms': disease_info.get('symptoms', []),
                    'treatment': disease_info.get('treatment', []),
                    'prevention': disease_info.get('prevention', [])
                }
            }
            
            return result
            
        except Exception as e:
            return {'error': f'Detection failed: {str(e)}'}
    
    def _analyze_image(self, img):
        """
        Analyze image characteristics to simulate disease detection
        In production, replace with actual CNN model prediction
        """
        # Convert to different color spaces for analysis
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        
        # Calculate color statistics
        avg_color = np.mean(img, axis=(0, 1))
        std_color = np.std(img, axis=(0, 1))
        
        # Analyze hue (for detecting brown/yellow spots)
        hue = hsv[:, :, 0]
        sat = hsv[:, :, 1]
        val = hsv[:, :, 2]
        
        # Calculate metrics
        green_ratio = self._calculate_green_ratio(img)
        brown_ratio = self._calculate_brown_ratio(hsv)
        spot_density = self._calculate_spot_density(img)
        
        # Decision logic based on image characteristics
        if green_ratio > 0.4 and brown_ratio < 0.1 and spot_density < 0.05:
            # Likely healthy plant
            return {'disease': 'Healthy', 'confidence': 0.85 + random.uniform(0, 0.10)}
        
        elif brown_ratio > 0.2 and spot_density > 0.15:
            # Brown spots with high density - likely blight
            if random.random() > 0.5:
                return {'disease': 'Tomato_Early_Blight', 'confidence': 0.75 + random.uniform(0, 0.15)}
            else:
                return {'disease': 'Tomato_Late_Blight', 'confidence': 0.72 + random.uniform(0, 0.15)}
        
        elif spot_density > 0.1:
            # Moderate spotting
            diseases = ['Tomato_Septoria_Leaf_Spot', 'Tomato_Leaf_Mold', 'Pepper_Bell_Bacterial_Spot']
            disease = random.choice(diseases)
            return {'disease': disease, 'confidence': 0.70 + random.uniform(0, 0.15)}
        
        else:
            # Default to random disease for demo
            disease = random.choice(self.classes)
            return {'disease': disease, 'confidence': 0.65 + random.uniform(0, 0.20)}
    
    def _calculate_green_ratio(self, img):
        """Calculate ratio of green pixels in image"""
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        # Green hue range: 35-85 in HSV
        lower_green = np.array([35, 40, 40])
        upper_green = np.array([85, 255, 255])
        mask = cv2.inRange(hsv, lower_green, upper_green)
        green_ratio = np.sum(mask > 0) / (img.shape[0] * img.shape[1])
        return green_ratio
    
    def _calculate_brown_ratio(self, hsv):
        """Calculate ratio of brown/diseased pixels"""
        # Brown hue range: 10-25 in HSV
        lower_brown = np.array([10, 40, 20])
        upper_brown = np.array([25, 255, 200])
        mask = cv2.inRange(hsv, lower_brown, upper_brown)
        brown_ratio = np.sum(mask > 0) / (hsv.shape[0] * hsv.shape[1])
        return brown_ratio
    
    def _calculate_spot_density(self, img):
        """Calculate density of spots/lesions in image"""
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # Apply threshold to find dark spots
        _, thresh = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY_INV)
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Calculate spot density
        total_area = img.shape[0] * img.shape[1]
        spot_area = sum([cv2.contourArea(c) for c in contours if cv2.contourArea(c) > 50])
        spot_density = spot_area / total_area
        
        return min(spot_density, 1.0)  # Cap at 1.0
