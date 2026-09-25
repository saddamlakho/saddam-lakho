'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-10 px-6 border-t border-white/5 bg-[#030508]/80 text-center flex flex-col items-center gap-2">
      <div className="text-xs font-mono text-slate-500">
        © {currentYear} SADDAM LAKHO. ALL RIGHTS RESERVED.
      </div>
      <div className="text-[10px] font-mono text-slate-600">
        FULL-STACK DEVELOPER · AI ENGINEER // THREE.JS · REACT · GSAP · LENIS
      </div>
    </footer>
  );
}
