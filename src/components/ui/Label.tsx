import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";

export type LabelProps = ComponentProps<"label">;

export function Label({ className, ref, ...props }: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-gray-700",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}