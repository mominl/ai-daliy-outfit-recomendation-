import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import OutfitCard from './components/OutfitCard';
import UploadSection from './components/UploadSection';
import WeatherWidget from './components/WeatherWidget';
import { useOutfit } from './hooks/useOutfit';
const queryClient = new QueryClient();

function AppContent() {
  const { data: outfitData, isLoading, error } = useOutfit();

  if (isLoading) {
    return <div className="text-center py-8">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Failed to load recommendations</div>;
  }

  // Add this check
  if (!outfitData) {
    return <div className="text-center py-8">No outfit data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <OutfitCard outfit={outfitData} />
            <UploadSection />
          </div>
          
          <div className="space-y-8">
            {/* Add conditional rendering for WeatherWidget */}
            {outfitData.weather && <WeatherWidget weather={outfitData.weather} />}
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Learning Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Style Preferences</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Color Matching</span>
                    <span>70%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;