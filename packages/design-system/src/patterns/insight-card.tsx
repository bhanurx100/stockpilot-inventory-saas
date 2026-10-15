import * as React from "react";
import { cn } from "@stockpilot/utils";
import type { SemanticTone } from "../tokens";

export interface InsightCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  value?: React.ReactNode;
  eyebrow?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: SemanticTone;
  action?: React.ReactNode;
}

const toneClasses = {
  neutral: "border-border bg-card",
  brand: "border-brand/25 bg-brand-soft/60",
  info: "border-info/25 bg-info-soft/60",
  success: "border-success/25 bg-success-soft/60",
  warning: "border-warning/25 bg-warning-soft/60",
  danger: "border-danger/25 bg-danger-soft/60",
} as const;

const iconClasses = {
  neutral: "bg-muted text-muted-foreground",
  brand: "bg-brand/15 text-brand-foreground",
  info: "bg-info/15 text-info-foreground",
  success: "bg-success/15 text-success-foreground",
  warning: "bg-warning/15 text-warning-foreground",
  danger: "bg-danger/15 text-danger-foreground",
} as const;

export function InsightCard({
  title,
  description,
  value,
  eyebrow,
  icon,
  tone = "neutral",
  action,
  className,
  ...props
}: InsightCardProps) {
  return (
    <div
      className={cn(
        "flex h-full min-w-0 flex-col gap-4 rounded-card border p-5 shadow-subtle",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="mt-1 font-semibold leading-tight text-foreground">{title}</h3>
        </div>
        {icon ? (
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-card",
              iconClasses[tone],
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>
      {value ? <div className="text-2xl font-semibold text-foreground">{value}</div> : null}
      {description ? (
        <div className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </div>
      ) : null}
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}
