import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center  font-medium cursor-pointer transition-all duration-200 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",

        {
          "bg-primary text-white hover:bg-primary/90 hover:shadow-sm": variant === "default",
          "bg-secondary text-white hover:bg-secondary/90 hover:shadow-sm": variant === "secondary",
          "bg-danger text-white hover:bg-danger/90 hover:shadow-sm": variant === "danger",
          "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900": variant === "outline",
          "bg-transparent hover:bg-gray-100 text-gray-900": variant === "ghost",
        },

        {
          "h-9 px-3 text-sm": size === "sm",
          "h-10 px-4 py-2 text-base": size === "md",
          "h-11 px-8 text-lg": size === "lg",
        },

        className
      )}
      {...props}
    />
  );
}