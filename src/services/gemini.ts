/**
 * Google Gemini AI Service
 * Handles plant disease detection using Google's Gemini Pro Vision
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface PlantAnalysisResult {
  plant: string;
  disease: string;
  confidence: number;
  symptoms: string[];
  treatment: string[];
  severity: 'Low' | 'Medium' | 'High';
  description: string;
}

/**
 * Analyze plant image using Google Gemini AI
 */
export async function analyzePlantImage(imageBase64: string): Promise<PlantAnalysisResult> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file.');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Analyze this plant image and identify the plant species and any diseases. You are an expert plant pathologist. 
                Respond ONLY with valid JSON in this exact format:
                {
                  "plant": "Plant Species Name (e.g., Tomato, Rose, Oak Tree)",
                  "disease": "Disease Name",
                  "confidence": 0-100,
                  "symptoms": ["symptom1", "symptom2", "symptom3"],
                  "treatment": ["treatment1", "treatment2", "treatment3"],
                  "severity": "Low|Medium|High",
                  "description": "Brief description of the disease"
                }`
              },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: imageBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Gemini API request failed');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      plant: result.plant || 'Unknown Plant',
      disease: result.disease || 'Unknown Disease',
      confidence: result.confidence || 0,
      symptoms: result.symptoms || [],
      treatment: result.treatment || [],
      severity: result.severity || 'Medium',
      description: result.description || 'No description available'
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

/**
 * Get treatment recommendations for a specific disease
 */
export async function getTreatmentRecommendations(disease: string): Promise<string[]> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Provide 5 detailed treatment steps for ${disease}. Return only a JSON array of strings. Example: ["Step 1", "Step 2", ...]`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 500,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get treatment recommendations');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return ['Consult with a professional plant pathologist for treatment advice.'];
  } catch (error) {
    console.error('Error getting treatment recommendations:', error);
    return ['Consult with a professional plant pathologist for treatment advice.'];
  }
}
