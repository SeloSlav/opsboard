import { cn } from "@/lib/cn";
import type { PropsWithChildren } from "react";

export function GlassCard({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("glass-panel glow-edge rounded-3xl p-8", className)}>{children}</div>;
}
