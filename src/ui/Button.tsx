import { tv, VariantProps } from "tailwind-variants";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-lg font-semibold cursor-pointer transition-all duration-200 border-none outline-none focus:outline-2 focus:outline-primary focus:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    variant: {
      primary:
        "bg-primary text-dark hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
      filled: "bg-primary text-white hover:bg-light hover:text-dark",
      outline:
        "bg-transparent text-primary border-2 border-primary hover:bg-lighter",
      destructive:
        "bg-transparent text-destructive focus:outline-destructive hover:bg-destructive/10",
      ghost: "bg-transparent text-primary border-none hover:bg-lighter",
    },
    size: {
      icon: "p-1 w-fit h-fit [&>svg]:w-6 [&>svg]:h-6",
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    },
  },
  defaultVariants: {
    variant: "filled",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
