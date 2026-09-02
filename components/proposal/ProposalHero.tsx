'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, ShieldCheck, Flame, Cpu, Terminal, Zap, TrendingUp } from 'lucide-react';

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

interface ProposalHeroProps {
  onTriggerChaos: () => void;
  isSimulating: boolean;
}

export function ProposalHero({ onTriggerChaos, isSimulating }: ProposalHeroProps) {
  const linkedInUrl = 'https://www.linkedin.com/in/adam-jeniah/';

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">orkes</span>
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Conductor Engine
                </span>
              </div>
              <p className="text-xs text-slate-300">Interactive Harness &amp; Observability Showcase for Viren Baraiya</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://orkes.io"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Orkes.io <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] hover:from-[#0284C7] hover:to-[#0D9488] text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>Let&apos;s talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Hero Copy & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-800/80 text-cyan-300 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Built for <strong>Viren Baraiya</strong> (Founder/CTO, Orkes &amp; Creator of Netflix Conductor)</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              Turn your 8-Agent LinkedIn post into an{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                embedded conversion machine.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed"
            >
              Your post showing <strong className="text-white">8 AI agents attempting to break Conductor</strong> proves Orkes resilience better than any static whitepaper. An interactive harness directly on <strong className="text-cyan-300 font-bold">orkes.io</strong> turns cold technical visitors into enterprise demo requests 24/7.
            </motion.p>

            {/* Interactive Actions */}
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
                    <span>Trigger 8-Agent Attack Simulation</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 border border-slate-600/80 text-slate-100 hover:text-white hover:border-cyan-400 text-sm font-bold transition-all hover:bg-slate-700"
              >
                <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                Message Adam Jeniah
              </a>
            </motion.div>

            {/* Bullet points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-300"
            >
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Interactive Product Showcase
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300">
                <ShieldCheck className="w-4 h-4" /> Enterprise Ready Embed
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Cpu className="w-4 h-4 text-teal-400" /> Native Orkes Identity
              </span>
            </motion.div>
          </div>

          {/* Right Stat / ROI Card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/90 px-2.5 py-1 rounded border border-cyan-800">
                  ESTIMATED ROI LIFT
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-white tracking-tight">+24%</span>
                    <p className="text-[11px] text-slate-400">Demo Request Conversion Lift</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="h-px bg-slate-800" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-lg font-extrabold text-cyan-400">-40%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Sales Cycle Length</div>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <div className="text-lg font-extrabold text-emerald-400">6 Mo+</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Durable Asset Value</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic border-l-2 border-cyan-400 pl-3">
                &ldquo;Make the invisible resilience of Conductor visible, interactive, and unshakeable for enterprise buyer CTOs.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
