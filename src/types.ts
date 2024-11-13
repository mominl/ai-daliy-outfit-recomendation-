export interface ClothingItem {
  id: string;
  type: 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory';
  image: string;
  color: string;
  season: ('spring' | 'summer' | 'fall' | 'winter')[];
  occasions: string[];
  lastWorn?: Date;
}

export interface Weather {  // Changed from WeatherData to match Outfit interface
  temperature: number;
  condition: string;
  humidity: number;
}

export interface Outfit {
  id: string;
  items: ClothingItem[];
  date: Date;
  weather: Weather;
  rating?: number;
}