'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Workflow, 
  QrCode, 
  Share2, 
  CheckSquare, 
  Bot, 
  Utensils, 
  ArrowUpRight, 
  ChevronRight, 
  Layers, 
  ShieldCheck,
  Zap,
  Cpu,
  Database,
  ExternalLink,
  Code
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playSound } from '../../audio/soundEffects';

const PROJECTS_DATA = [
  {
    id: '01',
    title: 'E-Leaflet Management System',
    category: 'Digital Health & Doc Control',
    icon: FileText,
    summary: 'A centralized digital e-leaflet management platform with dynamic QR-based distribution, structured document indexing, and regulatory compliance workflows.',
    architecture: 'Microservices architecture with Next.js frontend, Node/PostgreSQL document versioning cluster, and dynamic vector QR generation pipeline.',
    highlights: [
      'QR-based instant mobile access for consumers & medical practitioners',
      'Version-controlled pharmaceutical and product leaflet repository',
      'Multi-lingual digital leaflet rendering and search architecture',
      'Regulatory compliance audit trail and tamper-proof version stamps'
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'QR Engine'],
    metrics: { uptime: '99.9%', latency: '<45ms', throughput: '10k+ QRs/day' }
  },
  {
    id: '02',
    title: 'SOP Management System',
    category: 'Enterprise Governance',
    icon: Workflow,
    summary: 'End-to-end digital Standard Operating Procedure (SOP) control system featuring automated governance lifecycles and strict role-based audit trails.',
    architecture: 'Event-driven governance state machine handling sequential approvals, real-time revision notifications, and cryptographically verified digital signatures.',
    highlights: [
      'Full lifecycle: Draft → Review → Approval → Effective → Obsolete',
      'Automated expiration notifications and periodic revision triggers',
      'Cryptographic audit trails and regulatory electronic signatures',
      'Granular role-based permissions (Viewer, Reviewer, Approver, Admin)'
    ],
    techStack: ['React', 'TypeScript', 'MongoDB', 'Node.js', 'Tailwind CSS', 'Security Protocols'],
    metrics: { lifecycleSteps: '5 Stages', security: 'Role-Based ACL', compliance: 'FDA 21 CFR' }
  },
  {
    id: '03',
    title: 'QR Code Management System',
    category: 'Smart Hardware & Tracking',
    icon: QrCode,
    summary: 'An advanced technological QR engine supporting dynamic target redirection, batch generation, high-density analytics, and custom brand vector rendering.',
    architecture: 'High-speed redirection router paired with Canvas API SVG vector generator and sub-millisecond edge telemetry logger.',
    highlights: [
      'High-throughput dynamic vector QR code generator & decoder',
      'Real-time scan geolocation telemetry and device fingerprinting',
      'Enterprise batch export and tokenized access permissions',
      'Dynamic URL routing without reprinting physical QR assets'
    ],
    techStack: ['Next.js', 'TypeScript', 'MySQL', 'Tailwind CSS', 'Canvas API', 'REST API'],
    metrics: { resolution: 'Lossless SVG', redirectSpeed: '<15ms', batchCap: '5,000 / batch' }
  },
  {
    id: '04',
    title: 'SMM Campaign Ecosystem',
    category: 'Media & Analytics',
    icon: Share2,
    summary: 'A visual social media management and digital campaign hub orchestrating cross-platform scheduling, real-time engagement telemetry, and content feeds.',
    architecture: 'Multi-tenant campaign scheduling daemon integrated with real-time WebSocket telemetry visualizer and rich asset pipeline.',
    highlights: [
      'Unified multi-channel social campaign planner & scheduler',
      'Real-time engagement telemetry & interactive analytics visualizer',
      'Dynamic digital content asset pipeline and automated publishing',
      'Granular performance metrics and campaign ROI analytics'
    ],
    techStack: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'WebSockets'],
    metrics: { syncDelay: '<200ms', platforms: 'Multi-Network', feedRate: 'Real-Time' }
  },
  {
    id: '05',
    title: 'Document Review System',
    category: 'Enterprise Collaboration',
    icon: CheckSquare,
    summary: 'Structured multi-tier enterprise document review and sign-off engine featuring inline collaborative annotations, diff comparisons, and final release certification.',
    architecture: 'Collaborative document tree with side-by-side text diffing engine, multi-reviewer approval matrix, and immutable audit logs.',
    highlights: [
      'Collaborative workflow: Document → Review → Comments → Approval → Final',
      'Side-by-side visual revision diffs with line-by-line commenting',
      'Sequential & parallel approval matrix with manager overrides',
      'PDF export with embedded digital validation certificate'
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'PDF Engine'],
    metrics: { reviewTiers: 'Multi-Stage', diffEngine: 'Line-by-Line', audit: 'Immutable' }
  },
  {
    id: '06',
    title: 'AI SOP Chatbot',
    category: 'Artificial Intelligence & RAG',
    icon: Bot,
    summary: 'An intelligent AI-powered enterprise SOP assistant utilizing Retrieval-Augmented Generation (RAG) to deliver instant, verifiable answers grounded in organizational documentation.',
    architecture: 'Vector embedding pipeline coupled with cosine similarity retrieval, semantic chunking, and grounded prompt synthesis.',
    highlights: [
      'Vector similarity search & context-grounded response generation',
      'Instant policy lookup with direct citations to original clauses',
      'Interactive conversational interface with suggested follow-up prompts',
      'Hallucination guardrails and zero unverifiable assumption policy'
    ],
    techStack: ['Generative AI', 'AI Engineering', 'Next.js', 'TypeScript', 'Vector DB', 'Python'],
    metrics: { accuracy: '98.4%', citationRate: '100%', latency: '<1.2s' }
  },
  {
    id: '07',
    title: 'Digital Restaurant System',
    category: 'Hospitality & Realtime Operations',
    icon: Utensils,
    summary: 'A futuristic digital restaurant management platform powering QR table ordering, dynamic interactive menus, live kitchen ticket dispatch, and payment flow.',
    architecture: 'Sub-second WebSocket dispatch engine linking customer mobile UI with live kitchen display screens and real-time inventory ledger.',
    highlights: [
      'Contactless QR menu browsing with instant table-side checkout',
      'Live Kitchen Display System (KDS) with sub-second ticket state sync',
      'Real-time inventory decrementing and order queue telemetry',
      'Dynamic menu availability switching based on ingredient levels'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebSockets', 'Tailwind CSS'],
    metrics: { ticketSync: '<100ms', tableCapacity: 'Unlimited', orderFlow: 'Touchless' }
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(PROJECTS_DATA[0]);
  const { soundEnabled } = useTheme();

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 z-10 pointer-events-none flex flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-10 pointer-events-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>PRODUCTION SHOWCASE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Featured Systems & Engineered Projects
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl font-sans">
            Explore 7 production platforms spanning document governance, dynamic QR infrastructure, real-time operations, and intelligent AI chatbots.
          </p>
        </div>

        {/* SIDE-BY-SIDE INTERACTIVE PROJECT WORK BENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Project Selection Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between px-1">
              <span>SELECT SYSTEM (7 TOTAL)</span>
              <span className="text-primary font-bold">CLICK TO INSPECT</span>
            </div>

            {PROJECTS_DATA.map((proj) => {
              const Icon = proj.icon;
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setSelectedProject(proj);
                  }}
                  onMouseEnter={() => playSound('hover', soundEnabled)}
                  data-cursor="INSPECT"
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-[0_0_25px_-5px_var(--color-primary-glow)] scale-[1.01]'
                      : 'bg-[#0D1017]/80 border-white/10 hover:border-white/20 hover:bg-[#0D1017]/95'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>
                      {proj.id}
                    </span>
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white group-hover:text-primary transition-colors">
                        {proj.title}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-400">
                        {proj.category}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-primary translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: Deep-Dive Interactive Console */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="p-6 md:p-8 rounded-3xl glass-panel border-white/15 shadow-2xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-2xl bg-[#080B11]/90"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold">
                        SYSTEM {selectedProject.id}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {selectedProject.category}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary shrink-0 shadow-lg">
                    <selectedProject.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {selectedProject.summary}
                </p>

                {/* System Architecture */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> Architecture Overview
                  </span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Architectural Highlights */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" /> Key System Capabilities
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_6px_var(--color-primary)]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips & Telemetry Metrics */}
                <div className="pt-3 flex flex-col gap-3 border-t border-white/10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Core Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map(t => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {Object.entries(selectedProject.metrics).map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-xl bg-primary/5 border border-primary/15 flex flex-col">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{key}</span>
                        <span className="text-xs font-mono font-bold text-primary">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
