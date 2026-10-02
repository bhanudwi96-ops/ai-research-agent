export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm text-sky-300">
          Phase 1 - Foundation
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          AI Research Agent
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          A production-grade AI-powered research assistant for autonomous topic analysis,
          structured reporting, and multi-agent orchestration.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-2 text-2xl font-semibold">Ready</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Backend</p>
            <p className="mt-2 text-2xl font-semibold">FastAPI</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Database</p>
            <p className="mt-2 text-2xl font-semibold">PostgreSQL</p>
          </div>
        </div>
      </div>
    </main>
  );
}
