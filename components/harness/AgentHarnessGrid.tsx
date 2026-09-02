'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentThreat } from '@/lib/mock-data';
import {
  ShieldAlert,
  Zap,
  GitBranch,
  Activity,
  Database,
  Clock,
  Layers,
  Globe,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface AgentHarnessGridProps {
  agents: AgentThreat[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
  isSimulating: boolean;
  onTriggerSingleAttack: (agentId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  GitBranch,
  ShieldAlert,
  Activity,
  Database,
  Clock,
  Layers,
  Globe,
};

export function AgentHarnessGrid({
  agents,
  selectedAgentId,
  onSelectAgent,
  isSimulating,
  onTriggerSingleAttack,
}: AgentHarnessGridProps) {
  return (
    <section className="bg-[#091526] border-b border-slate-800/90 py-10 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-extrabold uppercase tracking-widest mb-1">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>THE 8-AGENT HARNESS MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Adversarial Stress Test Matrix
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Conductor Engine: <strong>100% Fault Resilient</strong></span>
          </div>
        </div>

        {/* 8 Clean Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, index) => {
            const IconComponent = iconMap[agent.icon] || Activity;
            const isSelected = selectedAgentId === agent.id;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                onClick={() => onSelectAgent(agent.id)}
                className={`relative rounded-xl p-4 cursor-pointer transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400'
                    : 'bg-slate-950/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Attack Pulse Effect */}
                <AnimatePresence>
                  {isSimulating && agent.status === 'Attacking' && (
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1.04, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl border-2 border-amber-400 pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <div>
                  {/* Top Bar: Icon + Status Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        agent.status === 'Attacking'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                          : agent.status === 'Mitigated'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-blue-950 text-blue-400 border border-blue-800'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>

                  {/* Title & Short Vector */}
                  <h3 className="text-xs font-bold text-white tracking-wide truncate mb-1">
                    {agent.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-3">
                    {agent.attackVector}
                  </p>
                </div>

                <div>
                  {/* Conductor Outcome Pill */}
                  <div className="bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[10px] text-emerald-400 flex items-center gap-1.5 truncate mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">{agent.conductorResponse}</span>
                  </div>

                  {/* Card Bottom Footer */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-cyan-400 font-bold">
                      {agent.reqPerSec.toLocaleString()} req/s
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerSingleAttack(agent.id);
                      }}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-amber-950 hover:text-amber-400 text-slate-300 transition-colors"
                    >
                      <Flame className="w-3 h-3" />
                      <span>Simulate</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
