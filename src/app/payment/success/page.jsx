import { createPremium } from "@/lib/actions/premium";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const premiumInfo = {
        email:customerEmail ,
    }

    const result = await createPremium(premiumInfo)
    console.log(result);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-3xl border border-green-500/20 bg-white/5 backdrop-blur-xl p-10 text-center shadow-[0_0_60px_rgba(34,197,94,0.15)]">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
            <span className="text-4xl">✅</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-400 mb-8">
            Welcome to <span className="text-violet-400 font-semibold">AIverse Pro</span>.
            Your payment has been completed successfully.
          </p>

          {/* Email Info */}
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 mb-8">
            <p className="text-green-200">
              A confirmation email has been sent to:
            </p>

            <p className="font-semibold text-white mt-2 break-all">
              {customerEmail}
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-3 text-left mb-8">
            {[
              "Unlimited prompt submissions",
              "Access to premium prompts",
              "Priority support",
              "Lifetime updates included",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
              >
                <span className="text-green-400">✓</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-semibold text-white hover:opacity-90 transition"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/"
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a
              href="mailto:orders@example.com"
              className="text-violet-400 hover:underline"
            >
              orders@example.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}