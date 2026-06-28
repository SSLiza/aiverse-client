"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("Subscribed successfully! Welcome to AIverse Newsletter 🎉");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase">
            Join the movement
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Accelerate Your AI Workflows?
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Subscribe to our weekly newsletter to receive curated prompts, model update analysis, and community highlights directly in your inbox.
          </p>

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} className="mx-auto max-w-md px-2 pt-4">
            <div className="flex items-center overflow-hidden rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10 transition-all duration-200">
              <div className="pl-4 flex-shrink-0">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-violet-600 px-6 py-4 text-sm font-semibold text-white hover:bg-violet-500 active:bg-violet-750 transition cursor-pointer flex items-center gap-1"
              >
                {loading ? "Subscribed..." : "Subscribe"}
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* Social / Info Links */}
          <div className="flex items-center justify-center gap-6 pt-10 text-slate-400 text-xs font-semibold">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub Project
            </a>
            <span className="text-slate-800">•</span>
            <Link href="/all-prompts" className="hover:text-white transition">
              Explore Templates
            </Link>
            <span className="text-slate-800">•</span>
            <Link href="/dashboard/user/my-prompts/create-prompt" className="hover:text-white transition">
              Submit Template
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
