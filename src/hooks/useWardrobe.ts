import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { ClothingItem } from '../types';
import { API_URL } from '../config';

export function useWardrobe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: ClothingItem[]) => {
      const { data } = await axios.post(`${API_URL}/wardrobe`, { items });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outfit'] });
    },
  });
}