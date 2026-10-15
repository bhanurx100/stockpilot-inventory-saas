"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@stockpilot/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 before:absolute before:size-5 before:rounded-[4px] before:border before:border-input before:bg-surface before:content-[''] data-[state=checked]:before:border-primary data-[state=checked]:before:bg-primary data-[state=indeterminate]:before:border-primary data-[state=indeterminate]:before:bg-primary",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="relative z-10 flex items-center justify-center text-primary-foreground">
      <Check className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
