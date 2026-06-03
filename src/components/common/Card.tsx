import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "feature-yellow-bold" | "feature-peach" | "feature-lavender"; // Bisa ditambah sesuai kebutuhan
  elevation?: "none" | "level-1" | "level-2";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "base", elevation = "none", ...props }, ref) => {
    
    const baseStyles = "rounded-lg overflow-hidden"; // rounded-lg (12px) wajib untuk Card
    
    const variants = {
      base: "bg-canvas border border-hairline p-xl", // Standard content card
      "feature-yellow-bold": "bg-[#FDE68A] text-charcoal p-xxl border-none", // Bold yellow feature
      "feature-peach": "bg-[#FFDAB9] text-charcoal p-xxl border-none", // Pale peach
      "feature-lavender": "bg-[#E6E6FA] text-charcoal p-xxl border-none", // Pale lavender
    };

    const elevations = {
      none: "",
      "level-1": "shadow-level-1",
      "level-2": "shadow-level-2",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          elevations[elevation],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";