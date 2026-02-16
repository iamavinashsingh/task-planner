import { useQuery } from '@tanstack/react-query';
import { getEfficiency } from '../services/apiClient';

export function useEfficiency(queryParams) {
  return useQuery({
    queryKey: ['efficiency', queryParams],
    queryFn: () => getEfficiency(queryParams)
  });
}
