import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-30 w-full  border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 transition-colors",
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