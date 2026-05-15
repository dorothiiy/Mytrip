const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  async generateItinerary({ origin, destination, days, budget, travelType, interests, weather, placesData }) {
    if (!this.model) {
      throw new Error("Generative AI model is not configured. Missing API Key.");
    }

    const { attractions, hotels } = placesData;

    const weatherString = weather ? JSON.stringify(weather, null, 2) : "Weather data unavailable.";
    const attractionsString = attractions && attractions.length ? JSON.stringify(attractions, null, 2) : "Attractions unavailable.";
    const hotelsString = hotels && hotels.length ? JSON.stringify(hotels, null, 2) : "Hotels unavailable.";

    const prompt = `
You are an expert AI Travel Planner. Generate a JSON itinerary for a trip.
Details:
Origin: ${origin}
Destination: ${destination}
Days: ${days}
Budget: ${budget}
Interests: ${interests.join(', ')}
Travel Type: ${travelType}

Here is context for the destination:
1. Weather Forecast: ${weatherString}
2. Real-world Tourist Attractions: ${attractionsString}
3. Top Hotels available: ${hotelsString}

Task:
Generate a strictly formatted JSON array representing the daily itinerary. For each item in the array, it must be an object with the properties:
- day (Number)
- title (String)
- type (String) -> exactly "standard", "travel", or "departure"
- activities (Array of Strings)
- locations (Array of Strings) -> ONLY IF type="standard"
- foodPlaces (Array of Strings) -> ONLY IF type="standard"
- travelDestinations (Array of Strings) -> ONLY IF type="travel"
- estimatedTravelTime (String) -> ONLY IF type="travel"
- finalDestinations (Array of Strings) -> ONLY IF type="departure"
- returnJourneyIdeas (Array of Strings) -> ONLY IF type="departure"

Guidelines:
1. Try to use real locations and hotels from the context provided.
2. If it is likely to rain on a specific day according to the weather, suggest indoor activities.
3. Optimize the routes.
4. ONLY return a beautifully formatted valid JSON array. Do not wrap in markdown \`\`\`json blocks. Return the raw JSON array starting with [ and ending with ].
`;

    try {
      const result = await this.model.generateContent(prompt);
      let text = result.response.text();
      // clean output
      text = text.trim();
      if (text.startsWith('\`\`\`json')) text = text.replace('\`\`\`json', '');
      if (text.startsWith('\`\`\`')) text = text.replace('\`\`\`', '');
      if (text.endsWith('\`\`\`')) text = text.replace(/\`\`\`$/, '');
      
      const itinerary = JSON.parse(text);
      return itinerary;
    } catch (err) {
      console.error('Gemini Generation Error:', err.message);
      throw new Error('Failed to generate intelligent AI itinerary. ' + err.message);
    }
  }
}

module.exports = new AIService();
