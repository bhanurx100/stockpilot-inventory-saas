import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@stockpilot/utils";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center gap-1 rounded-pill border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border-strong bg-surface text-foreground",
        success: "border-success/20 bg-success-soft text-success-foreground",
        warning: "border-warning/20 bg-warning-soft text-warning-foreground",
        info: "border-info/20 bg-info-soft text-info-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
