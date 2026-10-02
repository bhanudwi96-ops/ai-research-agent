'use client';

import { useEffect, useState } from 'react';
import ResearchForm from '@/components/forms/ResearchForm';
import ResearchCard from '@/components/research/ResearchCard';
import ResultsPanel from '@/components/research/ResultsPanel';
import { useResearch } from '@/hooks/useResearch';
import { ResearchTask, ResearchTaskCreate } from '@/types';

export default function DashboardPage() {
  const { loading, tasks, currentTask, createTask, listTasks, getTask, deleteTask } = useResearch();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    listTasks();
  }, [listTasks]);

  const handleSubmit = async (data: ResearchTaskCreate) => {
    const task = await createTask(data);
    setSelectedTaskId(task.id);
  };

  const handleTaskClick = async (taskId: number) => {
    setSelectedTaskId(taskId);
    await getTask(taskId);
  };

  const handleDeleteTask = async (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
      if (selectedTaskId === taskId) {
        setSelectedTaskId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Research Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Submit Form */}
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">New Research</h2>
            <ResearchForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Task List */}
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-white">Recent Tasks</h2>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center text-slate-400">
                  No research tasks yet. Start by submitting a topic.
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <ResearchCard
                        task={task}
                        onClick={() => handleTaskClick(task.id)}
                      />
                    </div>
                    <button
                      onClick={(e) => handleDeleteTask(task.id, e)}
                      className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300 hover:bg-red-500/30 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        {currentTask && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-white">Task Details</h2>
            <ResultsPanel task={currentTask} />
          </div>
        )}
      </div>
    </div>
  );
}
