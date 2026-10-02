'use client';

import { ResearchTask } from '@/types';

interface ResultsPanelProps {
  task: ResearchTask;
}

export default function ResultsPanel({ task }: ResultsPanelProps) {
  if (!task.result) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center">
        <p className="text-slate-400">
          {task.status === 'pending' && 'Waiting to process...'}
          {task.status === 'processing' && 'Research in progress...'}
          {task.status === 'completed' && 'No results yet'}
          {task.status === 'failed' && 'Research failed'}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Research Results</h3>
      <div className="prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap text-slate-300">{task.result}</p>
      </div>
    </div>
  );
}
