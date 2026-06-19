import PromtCard from '@/components/PromtCard';
import React from 'react';

const mockPrompts = [
    {
        _id: "1",
        title: "SEO Blog Generator",
        description: "Write high-ranking SEO-optimized blog posts easily with this prompt.",
        category: "Writing",
        aiTool: "ChatGPT",
        creatorName: "John Doe",
        copyCount: 150,
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60"
    },
    {
        _id: "2",
        title: "React Specialist",
        description: "Debug, optimize, and generate React components following clean code practices.",
        category: "Coding",
        aiTool: "Claude",
        creatorName: "Jane Smith",
        copyCount: 95,
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
    },
    {
        _id: "3",
        title: "Midjourney Photorealistic Prompt",
        description: "Generate breathtaking, realistic photos of landscapes and nature.",
        category: "Design",
        aiTool: "Midjourney",
        creatorName: "Alice Webb",
        copyCount: 312,
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60"
    }
];

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
                {mockPrompts.map((prompt) => (
                    <PromtCard key={prompt._id} prompt={prompt} />
                ))}
            </div>
        </section>
    );
};

export default AllPromtPage;