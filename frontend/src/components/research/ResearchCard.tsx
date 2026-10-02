'use client';

import { ResearchTask } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ResearchCardProps {
  task: ResearchTask;
  onClick?: () => void;
}

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-300 border-green-500/30',
  failed: 'bg-red-500/20 text-red-300 border-red-500/30',
  cancelled: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

export default function ResearchCard({ task, onClick }: ResearchCardProps) {
  const createdTime = formatDistanceToNow(new Date(task.created_at), { addSuffix: true });

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-all hover:border-slate-600 hover:bg-slate-800"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-white">{task.topic}</h3>
        <span
          className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-400">
        <p>Depth: <span className="text-slate-300 capitalize">{task.depth}</span></p>
        <p>Created: <span className="text-slate-300">{createdTime}</span></p>
      </div>

      {task.error_message && (
        <div className="mt-3 rounded-lg bg-red-500/10 p-2 text-sm text-red-300">
          Error: {task.error_message}
        </div>
      )}
    </div>
  );
}
