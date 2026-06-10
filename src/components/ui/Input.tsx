import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";

export type InputProps = ComponentProps<"input">;

export function Input({ className, type = "text", ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full  border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 transition-colors",
        "placeholder:text-gray-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}