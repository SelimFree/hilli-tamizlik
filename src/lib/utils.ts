import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines standard class names and safely merges Tailwind CSS classes,
 * resolving any conflicts (e.g., if you pass a different background color).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}