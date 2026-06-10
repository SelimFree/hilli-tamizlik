import { type ComponentProps, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Text } from "./Text";

export type ListProps = ComponentProps<"ul">;

export function List({ className, children, ...props }: ListProps) {
  return (
    <ul className={cn("space-y-4", className)} {...props}>
      {children}
    </ul>
  );
}

export type ListItemProps = ComponentProps<"li"> & {
  icon?: ReactNode | null;
};

export function ListItem({ className, icon, children, ...props }: ListItemProps) {
  return (
    <li className={cn("flex items-start gap-3", className)} {...props}>
      {icon !== null && (
        <span className="shrink-0 text-primary mt-0.5">
          {icon || <CheckCircle2 className="h-5 w-5" />}
        </span>
      )}
      <Text className="text-gray-700">{children}</Text>
    </li>
  );
}