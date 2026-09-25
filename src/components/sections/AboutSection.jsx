'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Layers, Sparkles, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function AboutSection() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 md:p-12 lg:px-16 z-10 pointer-events-none">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-6 pointer-events-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="p-6 md:p-10 rounded-3xl glass-panel border-white/15 shadow-2xl flex flex-col gap-6 backdrop-blur-2xl bg-[#080B11]/80"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 w-fit text-primary text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE CRAFT & PHILOSOPHY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-[1.15]">
            I Build Digital Experiences, Full-Stack Products and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AI-powered systems.
            </span>
          </h2>

          {/* <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
            Bridging robust full-stack software architecture with state-of-the-art artificial intelligence models. Every system is engineered with extreme precision, clean scalability, and immersive human-computer interaction.
          </p> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Full-Stack Scalability</div>
                <div className="text-xs text-slate-400 mt-0.5 font-sans leading-relaxed">
                  End-to-end architectures with modern Next.js, React, Node, and relational/document databases.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Generative AI & LLM Systems</div>
                <div className="text-xs text-slate-400 mt-0.5 font-sans leading-relaxed">
                  Autonomous agent workflows, RAG knowledge pipelines, vector indexing, and AI chatbots.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
