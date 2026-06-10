import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";

export type TextProps = ComponentProps<"p"> & {
  variant?: "default" | "lead" | "muted";
};

export function Text({ className, variant = "default", ...props }: TextProps) {
  return (
    <p
      className={cn(
        {
          "text-sm sm:text-base text-gray-700": variant === "default",
          "text-base sm:text-lg lg:text-xl text-gray-500": variant === "lead",
          "text-xs sm:text-sm text-gray-500": variant === "muted",
        },
        className
      )}
      {...props}
    />
  );
}