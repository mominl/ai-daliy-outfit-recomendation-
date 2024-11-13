import React from 'react';
import { Sun, Cloud, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sun className="h-8 w-8 text-yellow-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">StyleAI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-blue-50 rounded-lg px-3 py-1">
              <Cloud className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-blue-700">72°F</span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}