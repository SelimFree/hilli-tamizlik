import { type ComponentProps } from "react";
import { cn } from "../../lib/utils";

export type HeadingProps = ComponentProps<"h1"> & {
    level?: 1 | 2 | 3 | 4;
};

export function Heading({ className, level = 2, ...props }: HeadingProps) {

    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";

    return (
        <Tag
            className={cn(
                "font-bold tracking-tight text-gray-900",
                {
                    "text-3xl sm:text-4xl lg:text-5xl font-extrabold": level === 1,
                    "text-2xl sm:text-3xl lg:text-4xl": level === 2,
                    "text-xl sm:text-2xl lg:text-3xl": level === 3,
                    "text-lg sm:text-xl lg:text-2xl": level === 4,
                },
                className
            )}
            {...props}
        />
    );
}