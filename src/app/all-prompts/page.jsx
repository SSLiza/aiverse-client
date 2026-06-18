import PromtCard from '@/components/PromtCard';
import React from 'react';

const AllPromtPage = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold">
                    Explore AI Prompts
                </h1>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                    Discover prompts for ChatGPT, Gemini, Claude and more.
                </p>
            </div>

            {/* Search & Filters */}
            <div className="mb-8 rounded-2xl border p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        className="input input-bordered w-full"
                    />

                    <select className="select select-bordered">
                        <option>All Categories</option>
                        <option>Marketing</option>
                        <option>Coding</option>
                        <option>Business</option>
                    </select>

                    <select className="select select-bordered">
                        <option>All AI Tools</option>
                        <option>ChatGPT</option>
                        <option>Gemini</option>
                        <option>Claude</option>
                    </select>

                    <select className="select select-bordered">
                        <option>Difficulty</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Pro</option>
                    </select>

                    <select className="select select-bordered">
                        <option>Latest</option>
                        <option>Most Copied</option>
                        <option>Most Popular</option>
                    </select>
                </div>
            </div>

            {/* Prompt Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <PromtCard />
            </div>
        </section>
    );
};

export default AllPromtPage;