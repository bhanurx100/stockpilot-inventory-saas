import * as React from "react";
import { cn } from "@stockpilot/utils";
import type { SemanticTone } from "../tokens";

export interface ActivityTimelineItem {
  id: React.Key;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: SemanticTone;
}

export interface ActivityTimelineProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, "children"> {
  items: readonly ActivityTimelineItem[];
  label?: string;
}

const dotClasses = {
  neutral: "border-border-strong bg-muted text-muted-foreground",
  brand: "border-brand/30 bg-brand-soft text-brand-foreground",
  info: "border-info/30 bg-info-soft text-info-foreground",
  success: "border-success/30 bg-success-soft text-success-foreground",
  warning: "border-warning/30 bg-warning-soft text-warning-foreground",
  danger: "border-danger/30 bg-danger-soft text-danger-foreground",
} as const;

export function ActivityTimeline({
  items,
  label = "Activity timeline",
  className,
  ...props
}: ActivityTimelineProps) {
  return (
    <ol
      aria-label={label}
      className={cn("relative space-y-1", className)}
      {...props}
    >
      {items.map((item, index) => (
        <li key={item.id} className="relative grid grid-cols-[2.75rem_1fr] gap-3 py-2">
          {index < items.length - 1 ? (
            <span className="absolute left-[1.34375rem] top-12 h-[calc(100%-1rem)] w-px bg-border" />
          ) : null}
          <span
            className={cn(
              "relative z-10 flex size-11 items-center justify-center rounded-pill border",
              dotClasses[item.tone ?? "neutral"],
            )}
          >
            {item.icon}
          </span>
          <div className="min-w-0 pt-0.5">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0 font-medium text-foreground">{item.title}</div>
              {item.timestamp ? (
                <time className="shrink-0 text-xs text-muted-foreground">
                  {item.timestamp}
                </time>
              ) : null}
            </div>
            {item.description ? (
              <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
