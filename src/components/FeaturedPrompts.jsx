"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Link } from "@heroui/react";
export default function FeaturedPrompts() {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/featured-prompts`)
            .then((res) => res.json())
            .then((data) => setPrompts(data));
    }, []);

    return (
        <section className="py-12 px-20">
            <h2 className="text-3xl font-bold text-center mb-8">
                Featured Prompts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt) => (
                    <PromptCard
                        key={prompt._id}
                        prompt={prompt}
                    />
                ))}
            </div>

            <Link
                href="/all-prompts"
                className="rounded-xl bg-violet-600 px-4 py-2 text-white flex items-center justify-center mt-8 mx-auto w-max"
            >
                View All →
            </Link>

        </section>
    );
}