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
import { Sparkles, Zap, GitBranch } from 'lucide-react';

export default function Page() {
  const githubUrl = 'https://github.com/devllopeadam/conductor-observability-dashboard';

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

    try {
      track('Simulation_Triggered', { type: '8_Agent_Chaos_Wave' });
    } catch {
      // Safe fallback if offline
    }

    setAgents((prev) =>
      prev.map((a) => ({
        ...a,
        status: 'Attacking',
        reqPerSec: Math.floor(a.reqPerSec * 1.5 + Math.random() * 5000),
      }))
    );

    setRuns((prev) =>
      prev.map((r) => {
        if (r.id === 'run-8agent-01' || r.workflowId === 'wf_harness_stress_8agent_001') {
          return {
            ...r,
            started: 'Just now (Peak Attack Wave)',
            duration: '0.14s (Healing)',
            terminalLogs: [
              ...r.terminalLogs,
              `[WARN ${new Date().toLocaleTimeString()}] [HARNESS] 8-agent wave triggered. Injecting fault vectors across all agents.`,
              `[INFO ${new Date().toLocaleTimeString()}] [CONDUCTOR] Circuit breaker isolated failing workers. Zero tasks dropped.`,
            ],
          };
        }
        return r;
      })
    );

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

      {/* 3. Observability Dashboard */}
      <section id="harness-demo" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>WORKFLOW EXECUTION OBSERVABILITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Execution Trace &amp; Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inspect workflow topology DAGs, per-step micro-latencies, circuit breaker events, and raw payload traces.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800 text-xs text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Simulated harness data</span>
          </div>
        </div>

        {/* Telemetry Charts */}
        <TelemetryCharts isSimulating={isSimulating} />

        {/* DAG Topology */}
        <WorkflowDagGraph
          nodes={selectedRun.dagNodes}
          edges={selectedRun.dagEdges}
          workflowName={selectedRun.name}
        />

        {/* Workflow Runs + Execution Trace */}
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

      {/* 4. Footer */}
      <footer className="border-t border-slate-800/80 bg-[#051121] py-8 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <strong className="text-slate-300 font-bold">Conductor Workflow Observability Dashboard</strong>
          </div>

          <p className="text-center sm:text-right">
            A UI concept piece by{' '}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
            >
              <GitBranch className="w-3 h-3" />
              Adam Jeniah
            </a>
            {' '}— all data is illustrative.
          </p>
        </div>
      </footer>
    </main>
  );
}
