"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
    a: "We support ChatGPT, Claude, Gemini, Mistral, and more — with tags to filter by model.",
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

  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full border border-violet-500/30 px-4 py-1.5 text-sm font-medium">
            FAQ
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-12 rounded-full" />

          <p className="mt-4 text-[#8B8BAD]">
            Everything you need to know about our AI prompt marketplace.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? "border-violet-500/50"
                    : "border-[#1E1E30]"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium">
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
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-6 pb-5 pt-4 text-sm leading-relaxed text-[#8B8BAD] border-t ${
                        isOpen
                          ? "border-violet-500/20"
                          : "border-[#1E1E30]"
                      }`}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}