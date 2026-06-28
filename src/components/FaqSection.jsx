"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Are prompts free to use?",
    a: "Many prompts are free while premium prompts require a subscription. You can filter by free or paid from the marketplace.",
  },
  {
    q: "Can I submit my own prompts?",
    a: "Yes! Creators can publish prompts and share them with the community. Head to your dashboard to get started.",
  },
  {
    q: "Which AI tools are supported?",
    a: "We support ChatGPT, Claude, Gemini, Copilot, Midjourney, and Perplexity — with tags to filter by model.",
  },
  {
    q: "How do I copy a prompt?",
    a: "Click the copy button on any prompt card to instantly copy it to your clipboard — ready to paste anywhere.",
  },
  {
    q: "Do I need an account to use prompts?",
    a: "You can browse prompts without an account, but saving, creating, and submitting prompts requires signing in.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-24 px-4 bg-default-50/10 dark:bg-zinc-950/5">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-650 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-3">
            FAQ
          </span>

          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-default-500 text-sm sm:text-base max-w-lg mx-auto">
            Everything you need to know about our AI prompt marketplace.
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-violet-500 bg-violet-500/[0.02]"
                    : "border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-default-300 dark:hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {faq.q}
                  </span>

                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 transition-all duration-300 ${
                      isOpen
                        ? "rotate-45"
                        : ""
                    }`}
                  >
                    <Plus
                      className="h-3.5 w-3.5 text-violet-655 dark:text-violet-400"
                      strokeWidth={2.5}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-2 border-t border-default-100 dark:border-zinc-900/80">
                        <p className="text-xs sm:text-sm leading-relaxed text-default-500">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}