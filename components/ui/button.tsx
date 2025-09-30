import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[2px]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-sky-400 via-indigo-400 to-cyan-300 text-white border border-white/40 shadow-[0_18px_42px_rgba(63,135,255,0.35)] hover:from-sky-300 hover:via-indigo-300 hover:to-cyan-200",
  outline:
    "border border-sky-300/70 text-slate-900 hover:bg-white/60",
  ghost: "text-slate-700 hover:bg-white/70",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as any}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...(!asChild ? { type } : {})}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
