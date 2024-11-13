import React from 'react';
import { Heart, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Outfit } from '../types';
import axios from 'axios';

interface OutfitCardProps {
  outfit: Outfit;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
  const handleFeedback = async (rating: number) => {
    try {
      await axios.post('http://localhost:3000/api/feedback', {
        outfitId: outfit.id,
        rating
      });
    } catch (error) {
      console.error('Failed to send feedback:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Recommendation</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleFeedback(1)}
              className="p-2 hover:bg-green-100 rounded-full"
            >
              <ThumbsUp className="h-5 w-5 text-green-500" />
            </button>
            <button 
              onClick={() => handleFeedback(-1)}
              className="p-2 hover:bg-red-100 rounded-full"
            >
              <ThumbsDown className="h-5 w-5 text-red-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {outfit.items.map((item) => (
            <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={`${item.type} item`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Perfect for {outfit.weather.condition.toLowerCase()} weather</span>
            <span>{outfit.weather.temperature}°F</span>
          </div>
        </div>
      </div>
    </div>
  );
}