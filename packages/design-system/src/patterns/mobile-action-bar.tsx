import * as React from "react";
import { cn } from "@stockpilot/utils";

export interface MobileActionBarProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
}

export function MobileActionBar({
  label = "Page actions",
  className,
  children,
  ...props
}: MobileActionBarProps) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 hidden max-[640px]:grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2 border-t bg-popover/95 px-3 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] shadow-overlay backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  );
}
