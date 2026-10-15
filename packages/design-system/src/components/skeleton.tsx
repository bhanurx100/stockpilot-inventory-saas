import * as React from "react";
import { cn } from "@stockpilot/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-control bg-skeleton motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export { Skeleton };
