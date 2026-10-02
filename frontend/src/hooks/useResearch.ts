'use client';

import { useState, useCallback } from 'react';
import { ResearchTask, ResearchTaskCreate } from '@/types';
import { researchApi } from '@/services/researchApi';

export const useResearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<ResearchTask[]>([]);
  const [currentTask, setCurrentTask] = useState<ResearchTask | null>(null);

  const createTask = useCallback(async (data: ResearchTaskCreate) => {
    setLoading(true);
    setError(null);
    try {
      const task = await researchApi.create(data);
      setCurrentTask(task);
      setTasks((prev) => [task, ...prev]);
      return task;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to create research task';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTask = useCallback(async (taskId: number) => {
    setLoading(true);
    setError(null);
    try {
      const task = await researchApi.getById(taskId);
      setCurrentTask(task);
      return task;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch research task';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listTasks = useCallback(async (skip: number = 0, limit: number = 50) => {
    setLoading(true);
    setError(null);
    try {
      const response = await researchApi.list(skip, limit);
      setTasks(response.items);
      return response;
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to fetch research tasks';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: number) => {
    setLoading(true);
    setError(null);
    try {
      await researchApi.delete(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to delete research task';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    tasks,
    currentTask,
    createTask,
    getTask,
    listTasks,
    deleteTask,
  };
};
