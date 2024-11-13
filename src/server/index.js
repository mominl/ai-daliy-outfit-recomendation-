import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { getWeatherData } from './weather.js';
import { generateOutfitPrompt } from './prompts.js';
import { validateWardrobe } from './validation.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Store wardrobe items in memory (replace with proper database in production)
let wardrobe = [];

app.post('/api/wardrobe', (req, res) => {
  const items = req.body.items;
  
  if (!validateWardrobe(items)) {
    return res.status(400).json({ error: 'Invalid wardrobe data' });
  }
  
  wardrobe = items;
  res.json({ message: 'Wardrobe updated successfully' });
});

app.get('/api/recommendation', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    const prompt = generateOutfitPrompt(wardrobe, weatherData);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
      max_tokens: 500
    });

    const recommendation = JSON.parse(completion.choices[0].message.content);
    res.json({ outfit: recommendation, weather: weatherData });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
});

app.post('/api/feedback', (req, res) => {
  const { outfitId, rating } = req.body;
  // Store feedback for future AI training
  res.json({ message: 'Feedback received' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});