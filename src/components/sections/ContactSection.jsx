'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Send, CheckCircle2, Copy, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playSound } from '../../audio/soundEffects';

export default function ContactSection() {
  const { soundEnabled, theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    playSound('click', soundEnabled);
    navigator.clipboard.writeText('saddamlakho09@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setErrorMessage('');
    playSound('click', soundEnabled);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        playSound('success', soundEnabled);
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.7 },
            colors: [theme.primary, theme.accent, '#FFFFFF']
          });
        } catch (err) {
          // ignore canvas-confetti error on older engines
        }
      } else {
        setErrorMessage(data.error || 'Unable to transmit message. Please try copying email directly.');
      }
    } catch (err) {
      setErrorMessage('Network transmission error. Please copy email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 md:p-12 z-10 pointer-events-none">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center gap-8 pointer-events-auto">
        
        {/* Monolithic Finale Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INITIATE COLLABORATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight leading-[1.05]">
            LET&apos;S BUILD SOMETHING.
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md">
            Available for full-stack engineering contracts, AI architecture consulting, and high-impact enterprise applications.
          </p>
        </motion.div>

        {/* Interactive Contact Box */}
        <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl glass-panel border-white/15 shadow-2xl text-left flex flex-col gap-6 backdrop-blur-2xl bg-[#080B11]/90">
          
          {/* Quick Copy Action */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-mono text-slate-200">
                saddamlakho09@gmail.com
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor="COPY"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-primary transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Form */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-1 shadow-[0_0_20px_var(--color-primary)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-white text-lg">Message Transmitted!</h4>
              <p className="text-xs text-slate-300 font-sans max-w-sm leading-relaxed">
                Your inquiry has been successfully dispatched to Saddam Lakho. You will receive a response at your email address shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', message: '' });
                }}
                className="mt-2 text-xs font-mono text-primary hover:underline"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-primary outline-none transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-primary outline-none transition-colors"
                />
              </div>

              <textarea
                rows={3}
                required
                placeholder="Project Scope / Inquiries"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-primary outline-none transition-colors resize-none"
              />

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2 font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="TRANSMIT"
                className="w-full py-3 rounded-xl bg-primary text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
