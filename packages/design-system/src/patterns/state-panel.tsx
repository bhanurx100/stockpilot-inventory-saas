import * as React from "react";
import { cn } from "@stockpilot/utils";
import { Skeleton } from "../components/skeleton";
import type { SemanticTone } from "../tokens";

export interface StatePanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  tone?: SemanticTone;
  loading?: boolean;
  loadingRows?: number;
}

const toneClasses = {
  neutral: "border-border bg-surface text-foreground",
  brand: "border-brand/25 bg-brand-soft text-brand-foreground",
  info: "border-info/25 bg-info-soft text-info-foreground",
  success: "border-success/25 bg-success-soft text-success-foreground",
  warning: "border-warning/25 bg-warning-soft text-warning-foreground",
  danger: "border-danger/25 bg-danger-soft text-danger-foreground",
} as const;

export function StatePanel({
  title,
  description,
  icon,
  action,
  tone = "neutral",
  loading = false,
  loadingRows = 3,
  className,
  ...props
}: StatePanelProps) {
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={cn("space-y-3 rounded-panel border p-5", toneClasses[tone], className)}
        {...props}
      >
        <span className="sr-only">Loading</span>
        {Array.from({ length: loadingRows }, (_, index) => (
          <Skeleton key={index} className="h-11 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex min-h-56 flex-col items-center justify-center gap-4 rounded-panel border p-8 text-center",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex size-12 items-center justify-center rounded-card bg-background/60">
          {icon}
        </span>
      ) : null}
      <div>
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex flex-wrap justify-center gap-2">{action}</div> : null}
    </div>
  );
}
