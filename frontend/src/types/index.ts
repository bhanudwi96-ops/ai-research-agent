import { ReactNode } from 'react';

export interface ResearchTask {
  id: number;
  topic: string;
  depth: 'quick' | 'medium' | 'deep';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  result: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResearchTaskCreate {
  topic: string;
  depth: 'quick' | 'medium' | 'deep';
}

export interface ResearchTaskListResponse {
  items: ResearchTask[];
  total: number;
  page: number;
  page_size: number;
}

export interface ApiError {
  detail: string;
}

export interface ChildrenProps {
  children: ReactNode;
}
