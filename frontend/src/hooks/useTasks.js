import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, getTasks, updateTask } from '../services/apiClient';

export function useTasks(queryParams) {
  return useQuery({
    queryKey: ['tasks', queryParams],
    queryFn: () => getTasks(queryParams)
  });
}

export function useCreateTask(baseQueryParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', baseQueryParams] });
      queryClient.invalidateQueries({ queryKey: ['efficiency'] });
    }
  });
}

export function useUpdateTask(baseQueryParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, body }) => updateTask(taskId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', baseQueryParams] });
      queryClient.invalidateQueries({ queryKey: ['efficiency'] });
    }
  });
}
