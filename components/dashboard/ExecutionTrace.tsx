'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkflowRun } from '@/lib/mock-data';
import {
  Terminal,
  GitBranch,
  Zap,
  ShieldCheck,
  Database,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  Check,
  Clock,
  CheckCircle2,
  XCircle,
  PlayCircle,
} from 'lucide-react';

interface ExecutionTraceProps {
  run: WorkflowRun;
}

const stepIconMap = {
  input: Terminal,
  router: GitBranch,
  task: Zap,
  shield: ShieldCheck,
  connector: Database,
};

export function ExecutionTrace({ run }: ExecutionTraceProps) {
  const [showJson, setShowJson] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(run.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-white flex flex-col space-y-5">
      {/* Selected Workflow Header */}
      <div className="pb-4 border-b border-slate-800 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
              EXECUTION TRACE & TELEMETRY
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              {run.workflowId || run.id}
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white mt-1">{run.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Trigger: <strong className="text-slate-200">{run.trigger}</strong> • Resilience Rate:{' '}
            <strong className="text-emerald-400">{run.resilienceRate}</strong>
          </p>
        </div>

        <span
          className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
            run.status === 'COMPLETED'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              : run.status === 'RUNNING'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
              : 'bg-rose-950 text-rose-300 border border-rose-800'
          }`}
        >
          {run.status}
        </span>
      </div>

      {/* Step-by-Step Execution Timeline */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Execution Steps ({run.tasks.length})</span>
          <span className="text-[10px] text-slate-500 font-mono">Micro-latencies (ms)</span>
        </h4>

        <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {run.tasks.map((step) => {
            const Icon = stepIconMap[step.nodeType] || Zap;
            const isDone = step.status === 'COMPLETED';
            const isInProgress = step.status === 'IN_PROGRESS';

            return (
              <div key={step.id} className="relative group">
                {/* Step Icon Marker */}
                <div
                  className={`absolute -left-6 top-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs z-10 transition-transform group-hover:scale-110 ${
                    isDone
                      ? 'bg-slate-900 border-emerald-500 text-emerald-400'
                      : isInProgress
                      ? 'bg-slate-900 border-cyan-400 text-cyan-300 animate-pulse'
                      : 'bg-slate-900 border-rose-500 text-rose-400'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-bold text-white">
                      {step.label || step.taskRefName}
                    </strong>
                    <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {step.executionTimeMs}ms
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    <span className="text-cyan-300 font-mono text-[10px]">[{step.taskType}]:</span>{' '}
                    {step.detail || 'Task executed successfully'}
                  </p>

                  {step.payloadSnippet && (
                    <div className="mt-2 text-[10px] font-mono bg-slate-900 text-cyan-300 p-1.5 rounded border border-slate-800 truncate">
                      {step.payloadSnippet}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Execution Stream */}
      {run.terminalLogs && run.terminalLogs.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Terminal Execution Stream</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300 max-h-36 overflow-y-auto">
            {run.terminalLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible JSON Viewer */}
      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setShowJson(!showJson)}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Raw Workflow Payload JSON</span>
            {showJson ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {showJson && (
            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          )}
        </div>

        <AnimatePresence>
          {showJson && (
            <motion.pre
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-cyan-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-56"
            >
              {JSON.stringify(run.payload, null, 2)}
            </motion.pre>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
