import * as React from "react";
import { cn } from "@stockpilot/utils";

export interface DetailHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  status?: React.ReactNode;
  actions?: React.ReactNode;
  backAction?: React.ReactNode;
}

export function DetailHeader({
  title,
  description,
  breadcrumbs,
  status,
  actions,
  backAction,
  className,
  ...props
}: DetailHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {backAction ? <div className="shrink-0">{backAction}</div> : null}
        <div className="min-w-0">
          {breadcrumbs ? (
            <nav aria-label="Breadcrumb" className="mb-2 text-sm text-muted-foreground">
              {breadcrumbs}
            </nav>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {status}
          </div>
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
