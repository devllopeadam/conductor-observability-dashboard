'use client';

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { track } from '@vercel/analytics';
import { ProposalHero } from '@/components/proposal/ProposalHero';
import { AgentHarnessGrid } from '@/components/harness/AgentHarnessGrid';
import { TelemetryCharts } from '@/components/dashboard/TelemetryCharts';
import { WorkflowDagGraph } from '@/components/dashboard/WorkflowDagGraph';
import { WorkflowList } from '@/components/dashboard/WorkflowList';
import { ExecutionTrace } from '@/components/dashboard/ExecutionTrace';
import { STRESS_AGENTS, MOCK_RUNS, AgentThreat, WorkflowRun } from '@/lib/mock-data';
import { ShieldCheck, ArrowRight, Sparkles, Zap } from 'lucide-react';

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

export default function Page() {
  const linkedInUrl = 'https://www.linkedin.com/in/adam-jeniah/';

  const [agents, setAgents] = useState<AgentThreat[]>(STRESS_AGENTS);
  const [runs, setRuns] = useState<WorkflowRun[]>(MOCK_RUNS);
  const [selectedRunId, setSelectedRunId] = useState<string>('run-8agent-01');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>('agent-04');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Selected Workflow Run Object
  const selectedRun = useMemo(() => {
    return (
      runs.find((r) => r.id === selectedRunId || r.workflowId === selectedRunId) ||
      runs[0]
    );
  }, [runs, selectedRunId]);

  // Filtered Workflow Runs List
  const filteredRuns = useMemo(() => {
    return runs.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.trigger.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [runs, searchQuery, statusFilter]);

  // Trigger 8-Agent Attack Wave Simulation
  const handleTriggerChaos = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Vercel Custom Event Tracking
    try {
      track('Simulation_Triggered', { type: '8_Agent_Chaos_Wave' });
    } catch {
      // Safe fallback if offline
    }

    // Set agents to attacking status
    setAgents((prev) =>
      prev.map((a) => ({
        ...a,
        status: 'Attacking',
        reqPerSec: Math.floor(a.reqPerSec * 1.5 + Math.random() * 5000),
      }))
    );

    // Update active harness run
    setRuns((prev) =>
      prev.map((r) => {
        if (r.id === 'run-8agent-01' || r.workflowId === 'wf_harness_stress_8agent_001') {
          return {
            ...r,
            started: 'Just now (Peak Attack Wave)',
            duration: '0.14s (Healing)',
            terminalLogs: [
              ...r.terminalLogs,
              `[WARN ${new Date().toLocaleTimeString()}] ⚠️ 8-AGENT HARNESS WAVE TRIGGERED. 142,890 requests injected.`,
              `[SUCCESS ${new Date().toLocaleTimeString()}] ✅ [CONDUCTOR] Circuit breaker isolated failing workers. Zero tasks dropped!`,
            ],
          };
        }
        return r;
      })
    );

    // Complete simulation & trigger confetti
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          status: Math.random() > 0.3 ? 'Mitigated' : 'Blocked',
        }))
      );
      setIsSimulating(false);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0EA5E9', '#14B8A6', '#10B981', '#38BDF8'],
      });
    }, 2400);
  };

  // Trigger single agent fault injection
  const handleTriggerSingleAttack = (agentId: string) => {
    setSelectedAgentId(agentId);
    try {
      track('Single_Agent_Attack', { agentId });
    } catch {
      // Safe fallback
    }

    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? { ...a, status: 'Attacking', reqPerSec: a.reqPerSec + 8000 }
          : a
      )
    );

    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, status: 'Mitigated' } : a
        )
      );
    }, 1800);
  };

  const handleLinkedInClick = (location: string) => {
    try {
      track('LinkedIn_CTA_Clicked', { location });
    } catch {
      // Safe fallback
    }
  };

  return (
    <main className="min-h-screen bg-[#07172B] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Hero Header */}
      <ProposalHero
        onTriggerChaos={handleTriggerChaos}
        isSimulating={isSimulating}
      />

      {/* 2. 8-Agent Adversarial Stress Test Matrix */}
      <AgentHarnessGrid
        agents={agents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={(id) => {
          setSelectedAgentId(id);
          const matchedRun = runs.find((r) => r.agentId === id);
          if (matchedRun) setSelectedRunId(matchedRun.id || matchedRun.workflowId);
        }}
        isSimulating={isSimulating}
        onTriggerSingleAttack={handleTriggerSingleAttack}
      />

      {/* 3. Interactive Observability Dashboard Showcase */}
      <section id="harness-demo" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>LIVE CONDUCTOR WORKFLOW OBSERVABILITY SUITE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Interactive Execution &amp; Telemetry Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inspect workflow topology DAGs, micro-latencies, self-healing circuit breakers, and raw payload traces.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800 text-xs text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Mode: <strong>Live Harness Telemetry</strong></span>
          </div>
        </div>

        {/* Realtime Observability Telemetry Charts */}
        <TelemetryCharts isSimulating={isSimulating} />

        {/* Visual Execution Topology DAG Graph */}
        <WorkflowDagGraph
          nodes={selectedRun.dagNodes}
          edges={selectedRun.dagEdges}
          workflowName={selectedRun.name}
        />

        {/* Dual Panel Workspace: Workflow Runs Queue vs Execution Trace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <WorkflowList
              runs={filteredRuns}
              selectedId={selectedRunId}
              onSelectRun={setSelectedRunId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </div>

          <div className="lg:col-span-7">
            <ExecutionTrace run={selectedRun} />
          </div>
        </div>
      </section>

      {/* 4. Enterprise Product Showcase Section */}
      <section className="bg-gradient-to-b from-[#0B1E3D] to-[#07172B] border-t border-slate-800 py-16 px-4 sm:px-8 text-white">
        <div className="max-w-5xl mx-auto rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ENTERPRISE PRODUCT SHOWCASE
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s turn this proof into a{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              permanent conversion engine.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transform cold technical traffic into high-intent enterprise demo requests. Connect with Adam Jeniah to deploy this interactive harness showcase on <strong className="text-cyan-400">Orkes.io</strong>.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLinkedInClick('Bottom_CTA')}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <LinkedInIcon className="w-4 h-4 text-slate-950" />
              <span>Connect on LinkedIn</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleTriggerChaos}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-500/50 text-sm font-bold transition-all"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              Re-run Chaos Stress Test
            </button>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="border-t border-slate-800/80 bg-[#051121] py-8 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <strong className="text-slate-300 font-bold">orkes.io interactive harness showcase</strong>
          </div>

          <p className="text-center sm:text-right">
            Designed &amp; Built by <a href={linkedInUrl} target="_blank" rel="noreferrer" onClick={() => handleLinkedInClick('Footer')} className="text-cyan-400 underline hover:text-cyan-300 font-semibold">Adam Jeniah</a> for Viren Baraiya • Netflix Conductor &amp; Orkes.io Showcase
          </p>
        </div>
      </footer>
    </main>
  );
}
