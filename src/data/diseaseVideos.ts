/**
 * Disease-specific video treatments and detailed information
 */

export interface DiseaseVideo {
  diseaseName: string
  videoUrl: string
  videoTitle: string
  duration: string
  thumbnail: string
  detailedDescription: string
  symptoms: string[]
  causes: string[]
  treatment: string[]
  prevention: string[]
  severity: 'Low' | 'Medium' | 'High'
}

export const diseaseVideos: Record<string, DiseaseVideo> = {
  'Powdery Mildew': {
    diseaseName: 'Powdery Mildew',
    videoUrl: 'https://www.youtube.com/embed/kbFMkXTMucA',
    videoTitle: 'Complete Guide to Treating Powdery Mildew',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop',
    detailedDescription: 'Powdery mildew is a fungal disease that appears as white or gray powdery spots on leaves and stems. It thrives in warm, dry conditions and can spread quickly if not treated. The fungus feeds on plant nutrients, weakening the plant over time and potentially causing leaf drop and stunted growth.',
    symptoms: [
      'White or gray powdery coating on leaves, stems, and flowers',
      'Yellowing and curling of affected leaves',
      'Distorted or stunted new growth',
      'Premature leaf drop in severe cases',
      'Reduced plant vigor and flowering'
    ],
    causes: [
      'High humidity combined with dry conditions',
      'Poor air circulation around plants',
      'Overcrowding of plants',
      'Overhead watering that wets foliage',
      'Stress from drought or poor nutrition'
    ],
    treatment: [
      'Remove severely infected leaves and destroy them',
      'Apply sulfur-based fungicide or neem oil spray',
      'Use baking soda solution (1 tbsp per gallon of water)',
      'Improve air circulation by pruning and spacing',
      'Water at the base of plants, avoid wetting leaves',
      'Apply treatment weekly until symptoms disappear'
    ],
    prevention: [
      'Plant resistant varieties when possible',
      'Ensure proper spacing between plants',
      'Water in the morning at soil level',
      'Maintain good air circulation',
      'Remove plant debris regularly',
      'Avoid excessive nitrogen fertilization'
    ],
    severity: 'Medium'
  },
  
  'Leaf Spot': {
    diseaseName: 'Leaf Spot Disease',
    videoUrl: 'https://www.youtube.com/embed/8w3wmQAMoxQ',
    videoTitle: 'Treating Leaf Spot Diseases - Complete Guide',
    duration: '6:30',
    thumbnail: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&h=450&fit=crop',
    detailedDescription: 'Leaf spot diseases are caused by various fungi and bacteria that create circular or irregular spots on plant leaves. These spots can be brown, black, tan, or yellow and may have distinct borders. Left untreated, leaf spots can merge, causing entire leaves to die and drop prematurely.',
    symptoms: [
      'Circular or irregular spots on leaves (brown, black, or yellow)',
      'Spots may have yellow halos around them',
      'Spots may enlarge and merge together',
      'Premature leaf yellowing and drop',
      'Reduced photosynthesis and plant vigor'
    ],
    causes: [
      'Fungal or bacterial pathogens',
      'Overhead watering that splashes spores',
      'High humidity and poor air circulation',
      'Contaminated tools or infected plant debris',
      'Stress from environmental conditions'
    ],
    treatment: [
      'Remove and destroy all infected leaves',
      'Apply copper-based fungicide for bacterial spots',
      'Use systemic fungicide for fungal infections',
      'Improve drainage and air circulation',
      'Space plants properly to reduce humidity',
      'Avoid overhead watering'
    ],
    prevention: [
      'Water at soil level in the morning',
      'Maintain proper plant spacing',
      'Remove fallen leaves and debris',
      'Sterilize pruning tools between cuts',
      'Choose resistant plant varieties',
      'Avoid working with plants when wet'
    ],
    severity: 'Low'
  },

  'Root Rot': {
    diseaseName: 'Root Rot',
    videoUrl: 'https://www.youtube.com/embed/go8kLRsRCjk',
    videoTitle: 'Root Rot Treatment and Prevention',
    duration: '10:15',
    thumbnail: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&h=450&fit=crop',
    detailedDescription: 'Root rot is a serious fungal disease caused by overwatering and poor drainage. The roots become waterlogged and oxygen-starved, allowing fungi like Pythium and Phytophthora to attack. Infected roots turn brown or black, become mushy, and lose their ability to absorb water and nutrients.',
    symptoms: [
      'Wilting leaves despite moist soil',
      'Yellowing and dropping of lower leaves',
      'Stunted growth and lack of new growth',
      'Soft, mushy, dark-colored roots',
      'Foul smell from soil or roots',
      'Plant easily pulls out of soil'
    ],
    causes: [
      'Overwatering and waterlogged soil',
      'Poor drainage in pots or garden beds',
      'Heavy, compacted soil lacking oxygen',
      'Contaminated potting mix or soil',
      'Damaged roots from transplanting'
    ],
    treatment: [
      'Remove plant from soil and inspect roots',
      'Cut away all brown, mushy roots with sterile scissors',
      'Wash remaining healthy roots with water',
      'Treat with fungicide or hydrogen peroxide solution',
      'Repot in fresh, well-draining soil mix',
      'Reduce watering frequency significantly',
      'Ensure pots have adequate drainage holes'
    ],
    prevention: [
      'Use well-draining potting mix',
      'Water only when top inch of soil is dry',
      'Ensure proper drainage holes in containers',
      'Avoid letting plants sit in water',
      'Use pots appropriate for plant size',
      'Monitor soil moisture regularly'
    ],
    severity: 'High'
  },

  'Rust Disease': {
    diseaseName: 'Rust Disease',
    videoUrl: 'https://www.youtube.com/embed/Lp0KdMf7YdQ',
    videoTitle: 'How to Control Plant Rust Diseases',
    duration: '7:20',
    thumbnail: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=800&h=450&fit=crop',
    detailedDescription: 'Rust diseases are caused by various fungi that create orange, yellow, or brown pustules on plant leaves, resembling rust on metal. These pustules contain thousands of spores that spread easily through wind and water. Rust weakens plants by reducing photosynthesis and can spread rapidly in humid conditions.',
    symptoms: [
      'Orange, yellow, or brown pustules on leaf undersides',
      'Corresponding yellow spots on upper leaf surfaces',
      'Leaves become brittle and may drop prematurely',
      'Reduced plant vigor and growth',
      'Stems and petioles may also be affected'
    ],
    causes: [
      'Fungal spores spread by wind and water',
      'High humidity and moisture on leaves',
      'Moderate temperatures (60-75°F)',
      'Poor air circulation',
      'Overhead watering'
    ],
    treatment: [
      'Remove and destroy infected leaves immediately',
      'Apply sulfur or copper-based fungicides',
      'Use neem oil for organic treatment',
      'Improve air circulation around plants',
      'Avoid overhead watering',
      'Apply fungicide preventively in humid weather'
    ],
    prevention: [
      'Plant rust-resistant varieties',
      'Space plants for good air flow',
      'Water at soil level early in day',
      'Remove plant debris regularly',
      'Avoid working with wet plants',
      'Rotate plant locations annually'
    ],
    severity: 'Medium'
  },

  'Bacterial Wilt': {
    diseaseName: 'Bacterial Wilt',
    videoUrl: 'https://www.youtube.com/embed/PZvTmRl8WnU',
    videoTitle: 'Understanding and Managing Bacterial Wilt',
    duration: '9:10',
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=450&fit=crop',
    detailedDescription: 'Bacterial wilt is a devastating disease caused by bacteria that invade and block the plant\'s vascular system. The bacteria multiply rapidly, clogging water-conducting vessels and causing rapid wilting and plant death. It spreads through contaminated soil, water, tools, and insects.',
    symptoms: [
      'Sudden, rapid wilting of entire plant or branches',
      'Wilting worsens during hot days, may recover at night initially',
      'Lower leaves turn yellow then brown',
      'Vascular tissue shows brown discoloration when cut',
      'Milky bacterial ooze may be visible in stem cuts',
      'Plant death occurs within days to weeks'
    ],
    causes: [
      'Bacteria entering through wounds or natural openings',
      'Contaminated soil or water',
      'Spread by insects (beetles, aphids)',
      'Contaminated tools and equipment',
      'Root damage from cultivation'
    ],
    treatment: [
      'Remove and destroy infected plants immediately',
      'Do not compost infected material',
      'Disinfect all tools with bleach solution',
      'Treat soil with beneficial bacteria or solarization',
      'Remove alternate host plants nearby',
      'Control insect vectors'
    ],
    prevention: [
      'Use certified disease-free plants and seeds',
      'Practice crop rotation (3-4 years)',
      'Plant resistant varieties when available',
      'Control insect pests that spread disease',
      'Avoid wounding plants during cultivation',
      'Sanitize tools between plants',
      'Improve soil drainage'
    ],
    severity: 'High'
  },

  'Pear Scab': {
    diseaseName: 'Pear Scab',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Complete Pear Scab Treatment Guide',
    duration: '10:30',
    thumbnail: 'https://images.unsplash.com/photo-1568897165-4cfdb4e2a5f0?w=800&h=450&fit=crop',
    detailedDescription: 'Pear scab is a fungal disease causing dark, scabby spots on leaves and fruit. The fungus (Venturia pirina) overwinters on fallen leaves and releases spores in spring. It thrives in cool, wet conditions and can severely reduce fruit quality and tree vigor.',
    symptoms: [
      'Dark, olive-green to black spots on leaves',
      'Velvety or scabby appearance on infected areas',
      'Fruit develops raised, corky scabs',
      'Severely infected fruit may crack or deform',
      'Premature leaf and fruit drop',
      'Reduced photosynthesis and tree vigor'
    ],
    causes: [
      'Fungal spores from overwintering leaves',
      'Cool, wet spring weather (55-75°F)',
      'Extended leaf wetness periods',
      'Poor air circulation',
      'High humidity and frequent rain',
      'Susceptible pear varieties'
    ],
    treatment: [
      'Apply copper-based fungicide at bud break',
      'Spray sulfur during wet periods',
      'Use systemic fungicides like myclobutanil',
      'Remove and destroy infected leaves',
      'Prune trees for better air flow',
      'Fungicide every 7-14 days in wet weather',
      'Use neem oil for organic control',
      'Rake fallen leaves in autumn'
    ],
    prevention: [
      'Plant scab-resistant pear varieties',
      'Remove all fallen leaves and fruit',
      'Prune for good air circulation',
      'Avoid overhead irrigation',
      'Apply dormant spray before bud break',
      'Maintain proper tree spacing',
      'Keep area clean of debris',
      'Monitor and spray before rain'
    ],
    severity: 'Medium'
  },

  'Blight': {
    diseaseName: 'Blight',
    videoUrl: 'https://www.youtube.com/embed/eKbAf7cOcwE',
    videoTitle: 'Treating Early and Late Blight',
    duration: '11:30',
    thumbnail: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&h=450&fit=crop',
    detailedDescription: 'Blight diseases are severe fungal infections that cause rapid browning, withering, and death of plant tissues. Early blight and late blight are most common, affecting leaves, stems, and fruits. These diseases can destroy entire crops within days under favorable conditions.',
    symptoms: [
      'Brown or black lesions on leaves with target-like pattern (early blight)',
      'Water-soaked lesions that turn brown (late blight)',
      'White fungal growth on leaf undersides in humid conditions',
      'Stem cankers and girdling',
      'Fruit rot with dark lesions',
      'Rapid spread during warm, humid weather'
    ],
    causes: [
      'Fungal spores spread by wind, rain, and insects',
      'Warm temperatures (70-80°F) with high humidity',
      'Dense planting and poor air circulation',
      'Overhead irrigation',
      'Previously infected plant debris'
    ],
    treatment: [
      'Remove infected plant parts immediately',
      'Apply copper or chlorothalonil fungicides',
      'Use fungicides preventively before symptoms appear',
      'Improve air circulation by pruning',
      'Mulch to prevent soil splash onto leaves',
      'Remove and destroy severely infected plants'
    ],
    prevention: [
      'Choose blight-resistant varieties',
      'Space plants for good air circulation',
      'Water at soil level, avoid wetting foliage',
      'Rotate crops annually (minimum 3 years)',
      'Remove volunteer plants and weeds',
      'Clean up all plant debris at season end',
      'Start with disease-free transplants'
    ],
    severity: 'High'
  }
}

// Function to find closest matching disease
export function findDiseaseVideo(detectedDisease: string): DiseaseVideo | null {
  // Exact match
  if (diseaseVideos[detectedDisease]) {
    return diseaseVideos[detectedDisease]
  }

  // Partial match
  const diseaseLower = detectedDisease.toLowerCase()
  for (const [key, value] of Object.entries(diseaseVideos)) {
    if (diseaseLower.includes(key.toLowerCase()) || key.toLowerCase().includes(diseaseLower)) {
      return value
    }
  }

  // Check for common keywords
  const keywords = {
    'scab': 'Pear Scab',
    'mildew': 'Powdery Mildew',
    'spot': 'Leaf Spot',
    'rot': 'Root Rot',
    'rust': 'Rust Disease',
    'wilt': 'Bacterial Wilt',
    'blight': 'Blight'
  }

  for (const [keyword, diseaseName] of Object.entries(keywords)) {
    if (diseaseLower.includes(keyword)) {
      console.log('✅ Keyword match found:', keyword, '→', diseaseName)
      return diseaseVideos[diseaseName] || diseaseVideos['Powdery Mildew']
    }
  }

  console.log('⚠️ No match, returning default')
  return diseaseVideos['Powdery Mildew']
}
