"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { registryUrl } from "@/lib/catalog";

export const InstallCommand = ({ name }: { name: string }) => {
  const [status, setStatus] = useState("Copy command");
  const command = `npx shadcn@latest add ${registryUrl}/r/${name}.json`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("Copied");
    } catch {
      setStatus("Select the command to copy");
    }
  };
  const handleCopy = () => {
    void copy();
  };
  return (
    <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-black/30 p-3">
      <code className="min-w-0 flex-1 overflow-x-auto text-xs whitespace-nowrap text-lime-200">
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={status}
        title={status}
        className="rounded p-1.5 text-zinc-400 hover:text-white"
      >
        {status === "Copied" ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};
