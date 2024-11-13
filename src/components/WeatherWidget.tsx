import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherWidgetProps {
  weather: WeatherData;
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Current Weather</h3>
          <p className="text-blue-100">{weather.condition}</p>
        </div>
        <Cloud className="h-10 w-10" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <Droplets className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-blue-100">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-blue-100">Temperature</p>
            <p className="font-semibold">{weather.temperature}°F</p>
          </div>
        </div>
      </div>
    </div>
  );
}