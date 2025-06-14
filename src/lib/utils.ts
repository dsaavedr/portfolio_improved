import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scale(
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export function random(params: { min?: number; max: number } | undefined) {
  if (!params) return Math.random();

  const { min, max } = params;

  if (min === undefined) return Math.random() * max;

  return Math.random() * (max - min) + min;
}

export function handleError(error: unknown) {
  if (error instanceof Error) {
    return { errorMessage: error.message };
  }
  return { errorMessage: "An error occurred" };
}

export function capitalize(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
}

export function capitalizeWords(val: string) {
  return val
    .split(/\s|_/g)
    .map((word) => capitalize(word))
    .join(" ");
}
