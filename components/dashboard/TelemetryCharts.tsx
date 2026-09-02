'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import { TIME_SERIES_TELEMETRY } from '@/lib/mock-data';
import { Activity, Cpu, ShieldCheck, Zap, TrendingUp, Clock } from 'lucide-react';

interface TelemetryChartsProps {
  isSimulating: boolean;
}

export function TelemetryCharts({ isSimulating }: TelemetryChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Metric Cards Banner */}
      <div className="lg:col-span-4 grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">System Resilience</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">99.98%</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3 h-3" /> +0.02% under 51K TPS
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Queue Latency P99</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">1.84s</div>
          <div className="text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
            <Zap className="w-3 h-3" /> 12ms failover avg
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Simulated TPS</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">51.2K</div>
          <div className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
            <Activity className="w-3 h-3" /> 8 Agents Active
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Worker Pool</span>
            <Cpu className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">64 / 64</div>
          <div className="text-[10px] text-teal-400 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3 h-3" /> 100% Healthy
          </div>
        </div>
      </div>

      {/* Main Area & Bar Telemetry Chart */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl text-white">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
              LIVE OBSERVABILITY TELEMETRY
            </span>
            <h4 className="text-sm font-extrabold text-white">
              Agent Load Surge (TPS) vs Conductor Execution Latency
            </h4>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400" /> Agent Load (TPS)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded bg-emerald-400" /> Conductor Latency (s)
            </span>
          </div>
        </div>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TIME_SERIES_TELEMETRY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="agentLoadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="latencyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: '#FFF',
                }}
              />

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="agentLoadTps"
                name="Agent Load (TPS)"
                stroke="#0EA5E9"
                strokeWidth={2}
                fill="url(#agentLoadFill)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="conductorLatency"
                name="Queue Latency (s)"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#latencyFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
