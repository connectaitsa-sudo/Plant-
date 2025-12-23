"""
Treatment Videos Database
YouTube videos for plant disease treatments
"""

TREATMENT_VIDEOS = {
    "Tomato_Early_Blight": [
        {
            "title": "How to Treat Tomato Early Blight",
            "url": "https://www.youtube.com/watch?v=sGjF8pYpVzY",
            "thumbnail": "https://img.youtube.com/vi/sGjF8pYpVzY/mqdefault.jpg",
            "duration": "5:23",
            "channel": "GrowVeg"
        },
        {
            "title": "Early Blight Treatment - Organic Methods",
            "url": "https://www.youtube.com/watch?v=0jP8hfgc5_g",
            "thumbnail": "https://img.youtube.com/vi/0jP8hfgc5_g/mqdefault.jpg",
            "duration": "8:15",
            "channel": "MIgardener"
        }
    ],
    
    "Tomato_Late_Blight": [
        {
            "title": "Stopping Tomato Late Blight",
            "url": "https://www.youtube.com/watch?v=f8qVCn8lN8g",
            "thumbnail": "https://img.youtube.com/vi/f8qVCn8lN8g/mqdefault.jpg",
            "duration": "6:45",
            "channel": "GrowVeg"
        },
        {
            "title": "Late Blight Prevention and Treatment",
            "url": "https://www.youtube.com/watch?v=kLlPyZqCJMo",
            "thumbnail": "https://img.youtube.com/vi/kLlPyZqCJMo/mqdefault.jpg",
            "duration": "10:30",
            "channel": "The Ripe Tomato Farms"
        }
    ],
    
    "Tomato_Leaf_Mold": [
        {
            "title": "Treating Tomato Leaf Mold",
            "url": "https://www.youtube.com/watch?v=4fO8LGP_J8E",
            "thumbnail": "https://img.youtube.com/vi/4fO8LGP_J8E/mqdefault.jpg",
            "duration": "4:50",
            "channel": "Garden Tips"
        }
    ],
    
    "Potato_Early_Blight": [
        {
            "title": "Potato Early Blight Treatment",
            "url": "https://www.youtube.com/watch?v=oKHJdXQqUXs",
            "thumbnail": "https://img.youtube.com/vi/oKHJdXQqUXs/mqdefault.jpg",
            "duration": "7:20",
            "channel": "Gardening Channel"
        }
    ],
    
    "Potato_Late_Blight": [
        {
            "title": "Managing Potato Late Blight",
            "url": "https://www.youtube.com/watch?v=vnSpbYkPCk4",
            "thumbnail": "https://img.youtube.com/vi/vnSpbYkPCk4/mqdefault.jpg",
            "duration": "9:15",
            "channel": "Agricultural Extension"
        }
    ],
    
    "Pepper_Bell_Bacterial_Spot": [
        {
            "title": "Bacterial Spot on Peppers - Treatment",
            "url": "https://www.youtube.com/watch?v=xFsOCQ4u8w8",
            "thumbnail": "https://img.youtube.com/vi/xFsOCQ4u8w8/mqdefault.jpg",
            "duration": "6:00",
            "channel": "Pepper Joe's"
        }
    ],
    
    "Apple_Scab": [
        {
            "title": "Apple Scab Prevention and Treatment",
            "url": "https://www.youtube.com/watch?v=Y5n8GcZXm7k",
            "thumbnail": "https://img.youtube.com/vi/Y5n8GcZXm7k/mqdefault.jpg",
            "duration": "8:30",
            "channel": "Orchard Management"
        }
    ],
    
    "Grape_Black_Rot": [
        {
            "title": "Black Rot on Grapes - How to Treat",
            "url": "https://www.youtube.com/watch?v=kxLvM3YwPKg",
            "thumbnail": "https://img.youtube.com/vi/kxLvM3YwPKg/mqdefault.jpg",
            "duration": "5:45",
            "channel": "Vineyard Care"
        }
    ],
    
    # General plant care videos
    "general_fungicide": [
        {
            "title": "How to Use Fungicide Properly",
            "url": "https://www.youtube.com/watch?v=wJQ5vQ6qZJ8",
            "thumbnail": "https://img.youtube.com/vi/wJQ5vQ6qZJ8/mqdefault.jpg",
            "duration": "7:00",
            "channel": "Garden Guides"
        }
    ],
    
    "general_prevention": [
        {
            "title": "Preventing Plant Diseases - 10 Tips",
            "url": "https://www.youtube.com/watch?v=rDPBG7P0jYc",
            "thumbnail": "https://img.youtube.com/vi/rDPBG7P0jYc/mqdefault.jpg",
            "duration": "12:30",
            "channel": "Garden Answer"
        }
    ]
}

def get_treatment_videos(disease_key):
    """
    Get treatment videos for a specific disease
    
    Args:
        disease_key: Disease identifier
        
    Returns:
        list: List of video dictionaries
    """
    videos = TREATMENT_VIDEOS.get(disease_key, [])
    
    # If no specific videos, add general ones
    if not videos:
        videos = TREATMENT_VIDEOS.get("general_fungicide", [])
    
    return videos

def get_all_videos():
    """Get all available videos"""
    all_videos = []
    for disease_key, videos in TREATMENT_VIDEOS.items():
        if not disease_key.startswith('general_'):
            for video in videos:
                video_copy = video.copy()
                video_copy['disease'] = disease_key
                all_videos.append(video_copy)
    return all_videos
