import React from 'react';
import PromptForm from './PromptForm';
import { getMyPrompts } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import { userAc } from 'better-auth/plugins/admin/access';

const CreatePrompt = async () => {
  const session = await getUserSession();

  const addedPrompts = await getMyPrompts(session.id);
  const plan =
  session.plan === "free"
    ? {
        plan: "free",
        maxPrompts: 3,
      }
    : {
        plan: "premium",
        maxPrompts: Infinity, // or any limit you want
      };

  console.log("AddedPrompts", addedPrompts);
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Usage Card */}
      {
        session.plan === 'free' &&
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Prompt Usage
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track how many prompts you have created.
            </p>
          </div>

          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium">
            {addedPrompts.length} / {plan.maxPrompts}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(addedPrompts.length / plan.maxPrompts) * 100}%`,
              backgroundColor:
                addedPrompts.length >= plan.maxPrompts
                  ? "#ef4444"
                  : "#3b82f6",
            }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          You have used{" "}
          <span className="font-semibold">
            {addedPrompts.length}
          </span>{" "}
          out of{" "}
          <span className="font-semibold">
            {plan.maxPrompts}
          </span>{" "}
          prompts.
        </p>
      </div>
      }

      {/* Content */}
      {addedPrompts.length < plan.maxPrompts ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
          <PromptForm />
        </div>
      ) : (
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-8 text-center">
          <div className="text-5xl mb-4">🚫</div>

          <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
            Prompt Limit Reached
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You have reached the maximum number of prompts allowed on your current
            plan. Upgrade your subscription to continue creating prompts.
          </p>

          <Link
            href="/payment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            🚀 Upgrade Plan
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreatePrompt;