"use client";

import { Button } from "@heroui/react";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

export default function CopyPromptButton({ content }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content || "");
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <Button
      isIconOnly
      variant="flat"
      size="sm"
      onPress={handleCopy}
      className="rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      title="Copy Prompt Content"
    >
      <Copy size={15} />
    </Button>
  );
}
