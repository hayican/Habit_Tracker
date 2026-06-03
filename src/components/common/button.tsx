import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    // Base styles: Font 500, rounded-md (8px), dan transisi halus
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors rounded-md text-sm";
    
    // Variasi tombol sesuai DESIGN.md
    const variants = {
      primary: "bg-primary text-on-dark hover:bg-primary-pressed py-[10px] px-[18px]", // Signature purple
      secondary: "bg-transparent text-ink border border-hairline-strong hover:bg-surface py-[10px] px-[18px]", // Outlined
      dark: "bg-ink-deep text-on-dark hover:bg-ink py-[10px] px-[18px]", // Black button
      ghost: "bg-transparent text-ink hover:bg-surface py-[8px] px-[12px] rounded-sm", // Quieter ghost button
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";