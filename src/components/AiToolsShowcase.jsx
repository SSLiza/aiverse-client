"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Image as ImageIcon, Code, ShieldCheck, HelpCircle } from "lucide-react";

export default function AiToolsShowcase() {
  const tools = [
    {
      name: "ChatGPT",
      description: "Optimized prompts for GPT-4o, GPT-4, and custom GPTs to get precise answers.",
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-400",
      icon: <MessageSquare className="h-6 w-6 text-emerald-400" />,
    },
    {
      name: "Claude",
      description: "Prompts tuned for Claude 3.5 Sonnet, ideal for long-form writing and coding.",
      color: "from-orange-500/20 to-amber-500/20",
      textColor: "text-orange-400",
      icon: <Code className="h-6 w-6 text-orange-400" />,
    },
    {
      name: "Gemini",
      description: "Leverage Google Gemini's multimodal power for research and coding.",
      color: "from-blue-500/20 to-indigo-500/20",
      textColor: "text-blue-400",
      icon: <Sparkles className="h-6 w-6 text-blue-400" />,
    },
    {
      name: "Midjourney",
      description: "Artistic prompts specifying lighting, styles, and parameters for stunning images.",
      color: "from-pink-500/20 to-rose-500/20",
      textColor: "text-pink-400",
      icon: <ImageIcon className="h-6 w-6 text-pink-400" />,
    },
    {
      name: "Copilot",
      description: "Coding prompts for GitHub Copilot to generate scripts, debug, and refactor code.",
      color: "from-cyan-500/20 to-blue-500/20",
      textColor: "text-cyan-400",
      icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
    },
    {
      name: "Perplexity",
      description: "Search and research prompts for Perplexity AI to synthesize data efficiently.",
      color: "from-purple-500/20 to-violet-500/20",
      textColor: "text-purple-400",
      icon: <HelpCircle className="h-6 w-6 text-purple-400" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-20 px-6 bg-default-50/20 dark:bg-zinc-950/10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-650 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-3">
            Supported Engines
          </span>
          <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Tailored For Every AI Model
          </h2>
          <p className="text-default-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Different AI engines require different instruction logic. Our marketplace categorizes prompts designed specifically for each tool's strengths.
          </p>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
            >
              <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${tool.color} flex-shrink-0`}>
                {tool.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1.5 text-foreground flex items-center gap-2">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-default-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
