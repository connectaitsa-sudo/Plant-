/**
 * AI Service Wrapper
 * Automatically selects between OpenAI and Gemini based on configuration
 */

import * as openai from './openai';
import * as gemini from './gemini';

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'openai';

export type { PlantAnalysisResult } from './openai';

/**
 * Analyze plant image using configured AI provider
 */
export async function analyzePlantImage(imageBase64: string) {
  if (AI_PROVIDER === 'gemini') {
    return gemini.analyzePlantImage(imageBase64);
  }
  return openai.analyzePlantImage(imageBase64);
}

/**
 * Get treatment recommendations using configured AI provider
 */
export async function getTreatmentRecommendations(disease: string) {
  if (AI_PROVIDER === 'gemini') {
    return gemini.getTreatmentRecommendations(disease);
  }
  return openai.getTreatmentRecommendations(disease);
}

/**
 * Get current AI provider
 */
export function getAIProvider() {
  return AI_PROVIDER;
}
