import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE = 'http://localhost:5000/api';

export function useCombinedData(month) {
  return useQuery({
    queryKey: ['combined', month],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/combined`, {
        params: { month }
      });
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!month
  });
}

export function useTransactions(params) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/transactions`, {
        params
      });
      return data.data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}

export function useStatistics(month) {
  return useQuery({
    queryKey: ['statistics', month],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/statistics`, {
        params: { month }
      });
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!month
  });
}