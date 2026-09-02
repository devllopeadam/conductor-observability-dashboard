'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Flame, Cpu, Zap, GitBranch, LayoutDashboard, ArrowRight } from 'lucide-react';

interface ProposalHeroProps {
  onTriggerChaos: () => void;
  isSimulating: boolean;
}

export function ProposalHero({ onTriggerChaos, isSimulating }: ProposalHeroProps) {
  const githubUrl = 'https://github.com/devllopeadam/conductor-observability-dashboard';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#07172B] via-[#0B1E3D] to-[#0D2244] text-white py-14 px-4 sm:px-8 border-b border-slate-700/60">
      {/* Ambient Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E3A5F_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Navigation Header */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
              <LayoutDashboard className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">Workflow Observability Dashboard</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                  UI Concept
                </span>
              </div>
              <p className="text-xs text-slate-500">Workflow Orchestration &amp; Fault-Injection Visualization</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white transition-all"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>View Source</span>
            </a>
          </div>
        </header>

        {/* Hero Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-800/80 text-cyan-300 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>UI Concept &mdash; Workflow Orchestration &amp; Observability</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              Workflow Orchestration{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Observability Dashboard Concept
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
            >
              A dashboard UI concept demonstrating <strong className="text-white">workflow execution monitoring</strong>, fault-injection visualization via an 8-agent adversarial harness, real-time telemetry charts, and execution trace inspection — built on top of the Orkes Conductor orchestration model.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onTriggerChaos}
                disabled={isSimulating}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-xl transition-all ${
                  isSimulating
                    ? 'bg-amber-500 text-slate-950 animate-pulse cursor-wait'
                    : 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-cyan-500/25 hover:scale-[1.03]'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Flame className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Executing 8-Agent Attack Wave...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-slate-950 fill-current" />
                    <span>Trigger 8-Agent Fault Simulation</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 border border-slate-600/80 text-slate-100 hover:text-white hover:border-cyan-400 text-sm font-bold transition-all hover:bg-slate-700"
              >
                <GitBranch className="w-4 h-4 text-cyan-400" />
                View Source on GitHub
              </a>
            </motion.div>

            {/* Feature tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-400"
            >
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Execution DAG Topology
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <ShieldCheck className="w-4 h-4" /> Fault-Injection Harness
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Cpu className="w-4 h-4 text-teal-400" /> Real-Time Telemetry
              </span>
            </motion.div>
          </div>

          {/* Right Info Card — no fabricated stats */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl space-y-5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/90 px-2.5 py-1 rounded border border-cyan-800">
                  WHAT THIS DEMOS
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>8-agent adversarial fault injection across common failure categories (worker crash, rate storm, memory, region outage, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>DAG topology view of workflow execution steps with per-node status and latency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Real-time TPS and queue latency telemetry charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Execution trace panel with step-level micro-latencies and raw JSON payload viewer</span>
                </li>
              </ul>

              <p className="text-[11px] text-slate-500 italic border-l-2 border-slate-700 pl-3">
                All data is illustrative. This is a portfolio UI concept, not a production integration.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
