"use client";

import { motion } from "framer-motion";

export default function PlatformStats() {
  const stats = [
    { value: "500+", label: "AI Prompts" },
    { value: "100+", label: "Creators" },
    { value: "2K+", label: "Downloads" },
    { value: "4.8★", label: "Average Rating" },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-20 px-6 bg-default-50/10 dark:bg-zinc-950/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-4xl font-extrabold text-violet-600 dark:text-violet-400">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm text-default-500 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}