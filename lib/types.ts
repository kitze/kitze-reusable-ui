import type { LucideIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

export type ReactFC<T> = React.FC<PropsWithChildren & T>;
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export interface SelectOption {
  value: string;
  label?: string | undefined;
  emoji?: string | undefined;
  icon?: LucideIcon | undefined;
  closeOnClick?: boolean | undefined;
  disabled?: boolean | undefined;
}
