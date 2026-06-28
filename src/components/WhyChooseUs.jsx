"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Users, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "High-Quality Prompts",
      description:
        "Explore expertly crafted AI prompts designed to boost productivity and creativity.",
      icon: <Sparkles className="h-6 w-6 text-violet-500" />,
    },
    {
      title: "Wide Variety",
      description:
        "Discover prompts across multiple categories including writing, coding, design, and business.",
      icon: <BookOpen className="h-6 w-6 text-violet-500" />,
    },
    {
      title: "Trusted Community",
      description:
        "Read reviews, ratings, and feedback from a growing community of creators and users.",
      icon: <Users className="h-6 w-6 text-violet-500" />,
    },
    {
      title: "Save Time & Effort",
      description:
        "Skip repetitive tasks and get better AI outputs instantly with ready-to-use prompts.",
      icon: <Zap className="h-6 w-6 text-violet-500" />,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-20 px-6 bg-default-50/30 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-650 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-3">
            Key Features
          </span>
          <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Why Choose AIVerse?
          </h2>
          <p className="text-default-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            AIVerse empowers creators, developers, and professionals with
            premium AI prompts to unlock creativity and achieve more in less time.
          </p>
        </div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="border border-default-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-3 rounded-xl bg-violet-500/10 w-max mb-5 flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold mb-2.5 text-foreground">
                {feature.title}
              </h3>

              <p className="text-sm text-default-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}