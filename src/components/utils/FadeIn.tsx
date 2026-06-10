import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up",
  className 
}: { 
  children?: React.ReactNode; 
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const startTransform = {
    up: "translate-y-12",
    left: "-translate-x-12",
    right: "translate-x-12",
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${startTransform}`,
        className
      )}
    >
      {children}
    </div>
  );
}