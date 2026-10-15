import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@stockpilot/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control px-4 py-2.5 text-base font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-fast motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-subtle hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground shadow-subtle hover:bg-danger-hover",
        outline:
          "border border-border-strong bg-surface text-foreground shadow-subtle hover:border-primary/50 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-subtle hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "rounded-control px-0 py-2 text-primary underline-offset-4 hover:text-primary-hover hover:underline",
      },
      size: {
        default: "h-11",
        sm: "h-11 px-3 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={asChild ? undefined : isLoading || disabled}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            <span className="sr-only">Loading</span>
          </span>
        ) : (
          children
        )}
      </Component>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
