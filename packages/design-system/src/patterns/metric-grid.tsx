import * as React from "react";
import { cn } from "@stockpilot/utils";

export interface MetricGridProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function MetricGrid({
  label = "Key metrics",
  columns = 4,
  className,
  children,
  ...props
}: MetricGridProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn("grid grid-cols-1 gap-4", columnClasses[columns], className)}
      {...props}
    >
      {children}
    </div>
  );
}
