import { createPremium } from "@/lib/actions/premium";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const params = await searchParams;
  const session_id = params?.session_id;
  const redirectPath = params?.redirect || "/dashboard/user";

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const amount = (session.amount_total / 100).toFixed(2); // e.g. "5.00"
    const transactionId = typeof session.payment_intent === "object" ? session.payment_intent?.id : session.payment_intent || session.id;
    const paymentDate = new Date(session.created * 1000).toISOString();

    const premiumInfo = {
        email: customerEmail,
        transactionId: transactionId,
        amount: amount,
        date: paymentDate
    }

    const result = await createPremium(premiumInfo);
    console.log("Premium creation result:", result);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-3xl border border-green-500/20 bg-white/5 backdrop-blur-xl p-10 text-center shadow-[0_0_60px_rgba(34,197,94,0.15)]">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 animate-bounce">
            <span className="text-4xl">✅</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-400 mb-8 text-sm">
            Welcome to <span className="text-violet-400 font-semibold">AIverse Pro</span>.
            Your payment has been completed successfully and your account has been upgraded.
          </p>

          {/* Transaction details card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-8 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Account:</span>
              <span className="font-semibold text-white">{customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction ID:</span>
              <span className="font-mono text-white select-all">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="font-semibold text-white">${amount} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="text-white">{new Date(paymentDate).toLocaleString()}</span>
            </div>
          </div>

          {/* Redirect indicator */}
          <p className="text-xs text-violet-300 mb-6 animate-pulse font-medium">
            Redirecting you back to your previous page in 5 seconds...
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={redirectPath}
              className="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-semibold text-white hover:opacity-90 transition text-center text-sm cursor-pointer"
            >
              Continue Now
            </Link>

            <Link
              href="/"
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-semibold text-white hover:bg-white/10 transition text-center text-sm cursor-pointer"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-8 text-xs text-gray-500">
            Need help? Contact us at{" "}
            <a
              href="mailto:orders@example.com"
              className="text-violet-400 hover:underline"
            >
              orders@example.com
            </a>
          </p>

          {/* Auto Redirect Script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                setTimeout(function() {
                  window.location.href = ${JSON.stringify(redirectPath)};
                }, 5000);
              `
            }}
          />
        </div>
      </div>
    );
  }
}