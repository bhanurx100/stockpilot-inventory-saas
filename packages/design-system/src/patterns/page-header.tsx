import * as React from "react";
import { cn } from "@stockpilot/utils";

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  level?: 1 | 2;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  icon,
  actions,
  level = 1,
  className,
  ...props
}: PageHeaderProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header
      className={cn(
        "flex flex-col gap-4 pb-6 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-start gap-3">
        {icon ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-card border border-info/20 bg-info-soft text-info-foreground">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <Heading className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {title}
          </Heading>
          {description ? (
            <div className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </div>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
