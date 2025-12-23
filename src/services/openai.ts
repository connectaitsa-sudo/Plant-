/**
 * OpenAI API Service
 * Handles plant disease detection using OpenAI's GPT-4 Vision
 */

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface PlantAnalysisResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  treatment: string[];
  severity: 'Low' | 'Medium' | 'High';
  description: string;
}

/**
 * Analyze plant image using OpenAI GPT-4 Vision
 */
export async function analyzePlantImage(imageBase64: string): Promise<PlantAnalysisResult> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
    throw new Error('OpenAI API key is not configured. Please add your API key to the .env file.');
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using GPT-4 Turbo with vision
        messages: [
          {
            role: 'system',
            content: `You are an expert plant pathologist. Analyze plant images and identify diseases. 
            Respond ONLY with valid JSON in this exact format:
            {
              "disease": "Disease Name",
              "confidence": 0-100,
              "symptoms": ["symptom1", "symptom2"],
              "treatment": ["treatment1", "treatment2"],
              "severity": "Low|Medium|High",
              "description": "Brief description"
            }`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this plant image and identify any diseases. Provide the response in the specified JSON format.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from OpenAI');
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      disease: result.disease || 'Unknown Disease',
      confidence: result.confidence || 0,
      symptoms: result.symptoms || [],
      treatment: result.treatment || [],
      severity: result.severity || 'Medium',
      description: result.description || 'No description available'
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

/**
 * Get treatment recommendations for a specific disease
 */
export async function getTreatmentRecommendations(disease: string): Promise<string[]> {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a plant disease expert. Provide treatment recommendations in a JSON array format.'
          },
          {
            role: 'user',
            content: `Provide 5 detailed treatment steps for ${disease}. Return only a JSON array of strings.`
          }
        ],
        max_tokens: 500,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get treatment recommendations');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error getting treatment recommendations:', error);
    return ['Consult with a professional plant pathologist for treatment advice.'];
  }
}
