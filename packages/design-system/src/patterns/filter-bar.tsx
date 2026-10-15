import * as React from "react";
import { cn } from "@stockpilot/utils";

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  summary?: React.ReactNode;
}

export function FilterBar({
  label = "Filters",
  summary,
  className,
  children,
  ...props
}: FilterBarProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "flex flex-col gap-3 rounded-panel border bg-surface/80 p-3 shadow-subtle backdrop-blur-sm sm:p-4",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {children}
        </div>
        {summary ? <div className="shrink-0">{summary}</div> : null}
      </div>
    </section>
  );
}
