'use client';

import React from 'react';
import { WorkflowRun } from '@/lib/mock-data';
import { Search, CheckCircle2, PlayCircle, XCircle, Clock, Zap } from 'lucide-react';

interface WorkflowListProps {
  runs: WorkflowRun[];
  selectedId: string;
  onSelectRun: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onFilterChange: (status: string) => void;
}

export function WorkflowList({
  runs,
  selectedId,
  onSelectRun,
  searchQuery,
  onSearchChange,
  statusFilter,
  onFilterChange,
}: WorkflowListProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-white flex flex-col h-full">
      {/* Header & Filter Controls */}
      <div className="pb-3 mb-3 border-b border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
              WORKFLOW EXECUTION QUEUE
            </span>
            <h3 className="text-sm font-extrabold text-white">Recent Execution Runs</h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {runs.length} Runs
          </span>
        </div>

        {/* Search & Filter Inputs */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search workflow runs or triggers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="RUNNING">RUNNING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED_WITH_TERMINAL_ERROR">FAILED</option>
          </select>
        </div>
      </div>

      {/* Workflow Run Cards List */}
      <div className="space-y-2 overflow-y-auto max-h-[520px] pr-1">
        {runs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No workflows found matching query &apos;{searchQuery}&apos;.
          </div>
        ) : (
          runs.map((run) => {
            const runId = run.id || run.workflowId;
            const isSelected = runId === selectedId;

            return (
              <div
                key={runId}
                onClick={() => onSelectRun(runId)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500/80 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`p-1 rounded ${
                        run.status === 'COMPLETED'
                          ? 'bg-emerald-950 text-emerald-400'
                          : run.status === 'RUNNING'
                          ? 'bg-cyan-950 text-cyan-400 animate-pulse'
                          : 'bg-rose-950 text-rose-400'
                      }`}
                    >
                      {run.status === 'COMPLETED' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : run.status === 'RUNNING' ? (
                        <PlayCircle className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                    </span>
                    <strong className="text-xs font-bold text-white truncate">{run.name}</strong>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      run.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : run.status === 'RUNNING'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {run.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {run.started}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-cyan-400">
                    <Zap className="w-3 h-3" />
                    {run.duration}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                    {run.trigger}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
