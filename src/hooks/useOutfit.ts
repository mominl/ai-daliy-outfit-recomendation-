import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Outfit } from '../types';
import { API_URL } from '../config';

const defaultOutfit: Outfit = {
  id: '',
  items: [],
  date: new Date(),
  weather: {
    temperature: 0,
    condition: 'loading',
    humidity: 0
  },
  rating: undefined
};

export function useOutfit() {
  return useQuery<Outfit, Error>({
    queryKey: ['outfit'],
    queryFn: async (): Promise<Outfit> => {
      try {
        const { data } = await axios.get(`${API_URL}/recommendation`);
        return {
          ...data,
          date: new Date(data.date) // Convert date string to Date object
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || 
            'Failed to fetch outfit recommendation'
          );
        }
        throw error;
      }
    },
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
    retry: 2,
    staleTime: 1000 * 60 * 5, // Consider data stale after 5 minutes
    initialData: defaultOutfit,
    onError: (error) => {
      console.error('Error fetching outfit recommendation:', error);
    }
  });
}