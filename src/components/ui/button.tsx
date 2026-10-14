import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "press inline-flex items-center justify-center gap-2 rounded-sm px-4 font-sans text-sm font-semibold whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent hover:bg-accent-deep",
        call: "bg-call text-on-call hover:bg-call-deep",
        navy: "bg-accent text-on-accent hover:bg-accent-deep",
        ghost: "bg-card text-accent ring-1 ring-accent ring-inset hover:bg-accent-soft",
        outline: "bg-card text-ink ring-1 ring-line ring-inset hover:bg-paper",
        quiet: "bg-transparent text-ink hover:bg-paper",
      },
      size: {
        md: "h-12 px-5",
        lg: "h-14 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, type = "button", ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} type={asChild ? undefined : type} {...props} />;
}

export function buttonClass(options?: VariantProps<typeof buttonVariants>, className?: string) {
  return cn(buttonVariants(options), className);
}
