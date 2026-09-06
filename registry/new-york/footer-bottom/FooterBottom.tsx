"use client";

import { cn } from "@/lib/utils";

export interface FooterBottomProps {
  /** Variant of the "built by" text */
  variant?: "full" | "minimal";
  /** Additional className */
  className?: string;
}
export const FooterBottom = ({
  variant = "full",
  className,
}: FooterBottomProps) => (
  <div
    className={cn(
      "mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row",
      className
    )}
  >
    <div className="text-xs text-zinc-600">
      © {new Date().getFullYear()} Kitze. All rights reserved.
    </div>
    <div className="flex items-center gap-2 text-xs text-zinc-600">
      {variant === "full" ? (
        <>
          <span>&quot;Built&quot; by</span>
          <a
            href="https://x.com/thekitze"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-zinc-400 transition-colors hover:text-white"
          >
            @thekitze
          </a>
          <span>with</span>
          <span className="inline-flex gap-1">
            <span>😡</span>
            <span>&</span>
            <span>swearing at LLMs</span>
          </span>
        </>
      ) : (
        <>
          <span>Made by</span>
          <a
            href="https://x.com/thekitze"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-zinc-400 transition-colors hover:text-white"
          >
            @thekitze
          </a>
        </>
      )}
    </div>
  </div>
);
