'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DagNode, DagEdge } from '@/lib/mock-data';
import { Terminal, GitBranch, Zap, ShieldCheck, Database, Clock, ChevronRight } from 'lucide-react';

interface WorkflowDagGraphProps {
  nodes: DagNode[];
  edges: DagEdge[];
  workflowName: string;
}

const iconMap = {
  terminal: Terminal,
  router: GitBranch,
  task: Zap,
  shield: ShieldCheck,
  database: Database,
  zap: Zap,
};

export function WorkflowDagGraph({ nodes, edges, workflowName }: WorkflowDagGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(nodes[0]?.id || null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl text-white">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              VISUAL GRAPH EXECUTION DAG
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              Topology View
            </span>
          </div>
          <h4 className="text-sm font-extrabold text-white mt-1">
            {workflowName} execution path
          </h4>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Running
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Healed
          </span>
        </div>
      </div>

      {/* DAG Flow Visualizer Canvas */}
      <div className="relative overflow-x-auto py-8 px-4 bg-slate-950 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between min-w-[700px] relative z-10 gap-3">
          {nodes.map((node, index) => {
            const Icon = iconMap[node.iconType] || Zap;
            const isSelected = selectedNodeId === node.id;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`flex-1 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        node.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : node.status === 'running'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse'
                          : node.status === 'healed'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {node.latency}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-white truncate">{node.label}</h5>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{node.sublabel}</p>
                </motion.div>

                {/* Pixel-perfect Animated Connector Arrow */}
                {index < nodes.length - 1 && (
                  <div className="flex items-center justify-center px-1 text-slate-600 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-[2px] bg-slate-700 rounded-full" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <ChevronRight className="w-4 h-4 text-cyan-400 -ml-1" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Detail */}
      {selectedNode && (
        <div className="mt-4 p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Selected Node:</span>
            <strong className="text-cyan-300 font-bold">{selectedNode.label}</strong>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">{selectedNode.sublabel}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Node Latency:</span>
            <span className="font-mono font-bold text-emerald-400">{selectedNode.latency}</span>
          </div>
        </div>
      )}
    </div>
  );
}
