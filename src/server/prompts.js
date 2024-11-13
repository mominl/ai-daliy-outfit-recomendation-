export function generateOutfitPrompt(wardrobe, weather) {
  return `
    Given the following wardrobe items and weather conditions, suggest an appropriate outfit:
    
    Weather:
    - Temperature: ${weather.temperature}°F
    - Condition: ${weather.condition}
    - Humidity: ${weather.humidity}%
    
    Available Items:
    ${JSON.stringify(wardrobe, null, 2)}
    
    Please provide a JSON response with:
    1. Selected items that work well together
    2. Reasoning for the choices
    3. Style tips for the outfit
    
    Format the response as:
    {
      "items": [...selected items],
      "reasoning": "explanation",
      "styleTips": ["tip1", "tip2"]
    }
  `;
}