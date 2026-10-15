import * as React from "react";
import { cn } from "@stockpilot/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 min-h-11 w-full rounded-control border border-input bg-surface px-3 py-2.5 text-base text-foreground shadow-subtle transition-[color,border-color,box-shadow] duration-fast placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
