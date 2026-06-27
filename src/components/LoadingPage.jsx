"use client";

import React, { useEffect, useState } from "react";

export default function LoadingPage({ message, fullHeight = true }) {
  const [tipIndex, setTipIndex] = useState(0);
  
  const loadingTips = [
    "Synthesizing AI templates...",
    "Optimizing system prompts...",
    "Analyzing prompt variables...",
    "Curating top creative inputs...",
    "Connecting to model endpoints..."
  ];

  // If a specific message is passed, use it, otherwise rotate through custom tips
  const activeMessage = message || loadingTips[tipIndex];

  useEffect(() => {
    if (message) return; // Don't rotate tips if custom static message is provided
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % loadingTips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div
      className={`flex flex-col items-center justify-center bg-slate-50/20 dark:bg-slate-950/10 backdrop-blur-[2px] transition-all duration-350 ${
        fullHeight ? "min-h-[70vh] w-full" : "h-full min-h-[250px] w-full py-8"
      }`}
    >
      <div className="relative flex flex-col items-center p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 bg-white/60 dark:bg-slate-900/60 shadow-xl max-w-sm w-full text-center">
        {/* Decorative backdrop glow */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-violet-600/15 dark:bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Double-Ring Nucleus Loader */}
        <div className="relative w-16 h-16 mb-5">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 dark:border-slate-800/80" />
          <div className="absolute inset-0 rounded-full border-[3px] border-t-violet-600 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin" />

          {/* Inner ring (reverse direction) */}
          <div className="absolute inset-1.5 rounded-full border-[3px] border-slate-200 dark:border-slate-800/80" />
          <div className="absolute inset-1.5 rounded-full border-[3px] border-t-transparent border-r-transparent border-b-fuchsia-500 border-l-pink-500 animate-[spin_1.2s_linear_infinite_reverse]" />
          
          {/* Center core */}
          <div className="absolute inset-4.5 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-md shadow-violet-500/50 animate-pulse" />
        </div>

        {/* Brand label */}
        <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          AIverse Engine
        </span>
        
        {/* Dynamic status message */}
        <div className="mt-3 min-h-[20px] overflow-hidden flex items-center justify-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 animate-pulse">
            {activeMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
