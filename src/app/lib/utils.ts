import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalizeText(text: string) {
  return text.charAt(0).toUpperCase().concat(text.slice(1)).trim();
}
export function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function highlightText(text: string, query: string): boolean | null {
  if (query.trim().length < 1) return null;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  const parts = text.split(regex);

  return parts
    .filter((part) => part.trim() !== "")
    .some((part) => part.toLowerCase().trim() === query.toLowerCase().trim());
}
export function getCookiesFromReq(request: Request) {
  const cookies = request.headers.get("cookie");
  return cookies;
}
