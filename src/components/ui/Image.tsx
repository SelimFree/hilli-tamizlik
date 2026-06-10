import { type ComponentProps, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export type ImageProps = ComponentProps<"img"> & {
  aspectRatio?: "square" | "video" | "auto";
  containerClassName?: string;
};

export function Image({
  className,
  containerClassName,
  aspectRatio = "auto",
  alt,
  src,
  ref,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100 ",
        {
          "aspect-square": aspectRatio === "square",
          "aspect-video": aspectRatio === "video",
          "w-full h-full": aspectRatio === "auto",
        },
        containerClassName
      )}
    >
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center bg-gray-50 border border-gray-100">
          <ImageIcon className="h-10 w-10 mb-2 text-gray-300" />
          <span className="text-sm font-medium">Image unavailable</span>
        </div>
      ) : null}

      {isLoading && !hasError ? (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      ) : null}

      {!hasError && src ? (
        <img
          ref={ref}
          src={src}
          alt={alt || "Image"}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300 ease-in-out",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          {...props}
        />
      ) : null}
    </div>
  );
}