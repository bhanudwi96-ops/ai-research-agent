'use client';

import { useState } from 'react';
import { ResearchTaskCreate } from '@/types';

interface ResearchFormProps {
  onSubmit: (data: ResearchTaskCreate) => Promise<void>;
  loading?: boolean;
}

export default function ResearchForm({ onSubmit, loading = false }: ResearchFormProps) {
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState<'quick' | 'medium' | 'deep'>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!topic.trim()) {
      setError('Please enter a research topic');
      return;
    }

    try {
      await onSubmit({ topic: topic.trim(), depth });
      setTopic('');
      setDepth('medium');
    } catch (err: any) {
      setError(err.message || 'Failed to submit research task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-300">
          Research Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic to research..."
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none disabled:opacity-50"
          minLength={3}
          maxLength={500}
        />
      </div>

      <div>
        <label htmlFor="depth" className="block text-sm font-medium text-slate-300">
          Research Depth
        </label>
        <select
          id="depth"
          value={depth}
          onChange={(e) => setDepth(e.target.value as 'quick' | 'medium' | 'deep')}
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-sky-500 focus:outline-none disabled:opacity-50"
        >
          <option value="quick">Quick (5 minutes)</option>
          <option value="medium">Medium (15 minutes)</option>
          <option value="deep">Deep (30 minutes)</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Submitting...' : 'Start Research'}
      </button>
    </form>
  );
}
