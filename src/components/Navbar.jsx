"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";
import ThemeToggle from "./Themetogglebutton";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const syncJWT = async () => {
            if (user?.email) {
                let token = localStorage.getItem("token");
                if (!token) {
                    try {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jwt`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: user.email }),
                        });
                        if (res.ok) {
                            const data = await res.json();
                            if (data.token) {
                                token = data.token;
                                localStorage.setItem("token", token);
                            }
                        }
                    } catch (error) {
                        console.error("Failed to sync JWT:", error);
                    }
                }
                if (token) {
                    document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
                }
            } else {
                localStorage.removeItem("token");
                document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
            }
        };

        syncJWT();
    }, [user]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Prompts", href: "/all-prompts" },
    ];

    const dashboardLinks = {
        creator: "/dashboard/creator",
        user: "/dashboard/user",
        admin: "/dashboard/admin",
    };
    if (user?.email) {
        navLinks.push({
            name: "Dashboard",
            href: dashboardLinks[user.role] || "/dashboard/user",
        });
    }

    const isActive = (href) => {
        if (href === "/" || href === "/all-prompts") return pathname === href;
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        await authClient.signOut();
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/90">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold">
                        AV
                    </div>

                    <h1 className="text-xl font-bold">
                        AI<span className="text-violet-500">VERSE</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`pb-1 border-b-2 transition-colors duration-200 ${isActive(link.href)
                                    ? "border-violet-500 text-violet-500"
                                    : "border-transparent text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
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
                                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
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
                    className="md:hidden"
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
                <div className="border-t border-slate-200 bg-slate-50/95 md:hidden transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="flex flex-col gap-4 p-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-base font-semibold transition-colors ${isActive(link.href)
                                        ? "text-violet-500"
                                        : "text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                                    }`}
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
                                            className="rounded-lg border border-slate-700 px-4 py-2 text-center"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/auth/signup"
                                            className="rounded-lg bg-violet-600 px-4 py-2 text-center"
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