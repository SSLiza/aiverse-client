"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";
import ThemeToggle from "./Themetogglebutton";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Prompts", href: "/all-prompts" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        await authClient.signOut();
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold">
                        AV
                    </div>

                    <h1 className="text-xl font-bold text-white">
                        Ai<span className="text-violet-500">VERSE</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`pb-1 border-b-2 transition ${
                                isActive(link.href)
                                    ? "border-violet-500 text-violet-500"
                                    : "border-transparent text-slate-300 hover:text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Auth */}
                <div className="hidden items-center gap-3 md:flex">
                    {!isPending && (
                        <>
                            {session ? (
                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 transition hover:bg-slate-800"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/auth/signup"
                                        className="rounded-lg bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </>
                    )}

                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="text-white md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <Xmark width={24} height={24} />
                    ) : (
                        <Bars width={24} height={24} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-slate-800 bg-slate-950 md:hidden">
                    <div className="flex flex-col gap-4 p-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-300 hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {!isPending && (
                            <>
                                {session ? (
                                    <button
                                        onClick={handleLogout}
                                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth/signin"
                                            className="rounded-lg border border-slate-700 px-4 py-2 text-center text-slate-300"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/auth/signup"
                                            className="rounded-lg bg-violet-600 px-4 py-2 text-center text-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </>
                        )}

                        <ThemeToggle />
                    </div>
                </div>
            )}
        </header>
    );
}