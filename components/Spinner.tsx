"use client";

import {
  LucideLoader,
  LucideLoaderCircle,
  LucideLoaderPinwheel,
} from "lucide-react";

import type { ReactFC } from "@/lib/types";
import { cn } from "@/lib/utils";

const variants = {
  circle: LucideLoaderCircle,
  default: LucideLoader,
  pinwheel: LucideLoaderPinwheel,
} as const;

const sizes = {
  lg: "w-6 h-6",
  md: "w-5 h-5",
  sm: "w-4 h-4",
  xl: "w-8 h-8",
  xs: "w-3 h-3",
} as const;

export interface SpinnerProps {
  /**
   * The variant of the spinner
   * @default "default"
   */
  variant?: keyof typeof variants;

  /**
   * The size of the spinner
   * @default "md"
   */
  size?: keyof typeof sizes;

  /**
   * Optional className for the spinner
   */
  className?: string;
}

export const Spinner: ReactFC<SpinnerProps> = ({
  variant = "default",
  size = "md",
  className = "",
}) => {
  const SpinnerIcon = variants[variant] || variants.default;
  const foundSize = sizes[size] || sizes.md;

  return (
    <SpinnerIcon
      className={cn("text-foreground/50 animate-spin", foundSize, className)}
    />
  );
};
