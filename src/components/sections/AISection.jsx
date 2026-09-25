'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Network, Sparkles, Brain, Bot, Terminal, GitBranch, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AISection() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 md:p-12 z-10 pointer-events-none">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-10 pointer-events-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTELLIGENCE & AUTOMATION</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            AI + Software + Automation
          </h2>

          <p className="text-xs md:text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
            Bridging state-of-the-art Generative AI with production software engineering to build autonomous, reliable, high-throughput intelligent workflows.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-3xl glass-panel border-white/10 flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 w-fit">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Retrieval-Augmented Generation (RAG)
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Vector indexing, semantic chunking, and verifiable knowledge retrieval to eliminate hallucinations in enterprise document systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 rounded-3xl glass-panel border-white/10 flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className="p-3 rounded-2xl bg-accent/10 text-accent border border-accent/20 w-fit">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Autonomous Agent Workflows
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Multi-step cognitive pipelines with deterministic guardrails, structured function calling, and self-correcting logic loops.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-3xl glass-panel border-white/10 flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className="p-3 rounded-2xl bg-white/5 text-slate-200 border border-white/10 w-fit">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Full-Stack AI Integration
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              End-to-end integration of neural endpoints into Next.js/Node backends with streaming WebSockets, queueing, and low-latency rendering.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
