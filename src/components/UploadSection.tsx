import React, { useCallback } from 'react';
import { Upload, Camera } from 'lucide-react';
import { useWardrobe } from '../hooks/useWardrobe';
import type { ClothingItem } from '../types';

export default function UploadSection() {
  const { mutate: updateWardrobe } = useWardrobe();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // In a real app, you'd upload these to a cloud storage service
    // For now, we'll create mock clothing items
    const items: ClothingItem[] = Array.from(files).map((file, index) => ({
      id: `item-${index}`,
      type: 'top',
      image: URL.createObjectURL(file),
      color: 'unknown',
      season: ['spring', 'summer', 'fall', 'winter'],
      occasions: ['casual'],
    }));

    updateWardrobe(items);
  }, [updateWardrobe]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
          <Camera className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Add to Your Wardrobe</h2>
        <p className="text-gray-600 mb-4">Upload photos of your clothes to get personalized recommendations</p>
        
        <label className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer">
          <Upload className="h-5 w-5 mr-2" />
          Upload Photos
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
}