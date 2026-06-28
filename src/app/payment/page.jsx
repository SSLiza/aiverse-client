import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

const PaymentPage = async ({ searchParams }) => {
    // Private route protection
    const user = await getUserSession();
    const params = await searchParams;
    const redirectPath = params?.redirect || "/dashboard/user";

    if (!user) {
        return redirect(`/auth/signin?redirect=${encodeURIComponent(`/payment?redirect=${encodeURIComponent(redirectPath)}`)}`);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6 flex items-center">

            <div className="max-w-5xl mx-auto w-full py-12">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4 text-2xl">
                        💎
                    </div>

                    <h1 className="text-4xl font-bold mb-2">
                        Upgrade to{" "}
                        <span className="text-violet-400">
                            AIverse Pro
                        </span>
                    </h1>

                    <p className="text-gray-400">
                        Unlock premium prompts and advanced AI tools.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Left Card */}
                    <div className="rounded-3xl border border-violet-500/20 bg-white/5 backdrop-blur-xl p-6">

                        <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm mb-5">
                            Lifetime Membership
                        </span>

                        <h2 className="text-2xl font-bold mb-3">
                            AIverse Pro Access
                        </h2>

                        <div className="mb-6">
                            <span className="text-5xl font-bold">$5</span>
                            <span className="text-gray-400 ml-2">
                                one-time payment
                            </span>
                        </div>

                        <form
                            action={`/api/checkout_sessions?redirect=${encodeURIComponent(redirectPath)}`}
                            method="POST"
                        >
                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-semibold hover:opacity-90 transition cursor-pointer"
                            >
                                Upgrade Now 🚀
                            </button>
                        </form>

                        <div className="mt-5 rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
                            <p className="text-sm text-violet-200 text-center">
                                🔒 Secure payment powered by Stripe.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                        <h3 className="text-xl font-bold mb-5">
                            What is Included
                        </h3>

                        <div className="space-y-3">
                            {[
                                "Unlimited prompt submissions",
                                "Access to private prompts",
                                "Priority support",
                                "Unlimited clipboard copies",
                                "Future premium updates",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                                >
                                    <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        ✓
                                    </div>

                                    <p className="text-gray-300 text-sm">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;