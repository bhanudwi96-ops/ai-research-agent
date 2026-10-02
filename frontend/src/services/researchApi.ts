import apiClient from './api';
import { ResearchTask, ResearchTaskCreate, ResearchTaskListResponse } from '@/types';

export const researchApi = {
  /**
   * Create a new research task
   */
  create: async (data: ResearchTaskCreate): Promise<ResearchTask> => {
    const response = await apiClient.post<ResearchTask>('/research/', data);
    return response.data;
  },

  /**
   * Get a research task by ID
   */
  getById: async (taskId: number): Promise<ResearchTask> => {
    const response = await apiClient.get<ResearchTask>(`/research/${taskId}`);
    return response.data;
  },

  /**
   * List all research tasks
   */
  list: async (skip: number = 0, limit: number = 50): Promise<ResearchTaskListResponse> => {
    const response = await apiClient.get<ResearchTaskListResponse>('/research/', {
      params: { skip, limit },
    });
    return response.data;
  },

  /**
   * Delete a research task
   */
  delete: async (taskId: number): Promise<void> => {
    await apiClient.delete(`/research/${taskId}`);
  },
};
