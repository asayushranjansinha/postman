import { HttpMethod } from "@prisma/client";

/**
 * Returns the formatted size string for the given number of bytes.
 *
 * @param bytes The number of bytes
 * @returns The formatted size string
 */
export const formatBytes = (bytes?: number): string => {
  if (!bytes || bytes === 0) return "0 B";
  if (bytes < 0) return "Invalid";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1
  );
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Parses the JSON string into an array of key-value pairs.
 *
 * @param jsonString The JSON string to parse
 * @returns An array of key-value pairs
 */
export const parseKeyValueData = (jsonString?: string) => {
  if (!jsonString) return [];
  try {
    return JSON.parse(jsonString);
  } catch {
    return [];
  }
};

export const requestColorMap: Record<HttpMethod, string> = {
  // Light: 500 (Default), Dark: 400 (Brighter)
  [HttpMethod.GET]: "text-emerald-500! dark:text-emerald-400!",

  [HttpMethod.POST]: "text-blue-500! dark:text-blue-400!",

  [HttpMethod.PUT]: "text-amber-500! dark:text-amber-400!",

  [HttpMethod.DELETE]: "text-rose-500! dark:text-rose-400!",

  [HttpMethod.PATCH]: "text-purple-500! dark:text-purple-400!",

  [HttpMethod.HEAD]: "text-gray-500! dark:text-gray-400!",

  [HttpMethod.OPTIONS]: "text-slate-500! dark:text-slate-400!",
};
export const requestBgMap: Record<HttpMethod, string> = {
  // Light: 500 (Default), Dark: 400 (Brighter)
  [HttpMethod.GET]: "bg-emerald-500/10! dark:bg-emerald-400/10!",

  [HttpMethod.POST]: "bg-blue-500/10! dark:bg-blue-400/10!",

  [HttpMethod.PUT]: "bg-amber-500/10! dark:bg-amber-400/10!",

  [HttpMethod.DELETE]: "bg-rose-500/10! dark:bg-rose-400/10!",

  [HttpMethod.PATCH]: "bg-purple-500/10! dark:bg-purple-400/10!",

  [HttpMethod.HEAD]: "bg-gray-500/10! dark:bg-gray-400/10!",

  [HttpMethod.OPTIONS]: "bg-slate-500/10! dark:bg-slate-400/10!",
};

/**
 * Determines the Tailwind CSS classes for coloring a response status banner.
 * The classes define the text color, background color (with 10% opacity),
 * and left border color (with 30% opacity) for visual feedback.
 *
 * @param status The HTTP status code (e.g., 200, 404, 500) or null if no response was received.
 * @param error A string containing a network/system error message, or null.
 * @returns A string containing concatenated Tailwind CSS classes.
 */
export const getStatusColor = (
  status: number | null,
  error: string | null
): string => {
  // Network/System Error (highest priority)
  if (error) return "text-red-500 bg-red-500/10 border-red-500/30";

  // No Status/Pending
  if (!status) return "text-gray-500 bg-gray-500/10 border-gray-500/30";

  // Success Codes (2xx)
  if (status >= 200 && status < 300)
    return "text-green-500 bg-green-500/10 border-green-500/30";

  // Client Error Codes (4xx)
  if (status >= 400 && status < 500)
    return "text-yellow-600 bg-yellow-600/10 border-yellow-600/30";

  // Server Error Codes (5xx)
  if (status >= 500) return "text-red-500 bg-red-500/10 border-red-500/30";

  // Default/Informational/Redirect
  return "text-gray-500 bg-gray-500/10 border-gray-500/30";
};

/**
 * Gets a display-friendly text string for the status code or error.
 *
 * @param status The HTTP status code (e.g., 200, 404, 500) or null if no response was received.
 * @param error A string containing a network/system error message, or null.
 * @returns A string describing the status (e.g., "200 OK", "Network Error").
 */
export const getStatusText = (
  status: number | null,
  error: string | null
): string => {
  // Network Error (highest priority)
  if (error) return "Network Error";

  // No Status/No Response
  if (!status) return "No Response";

  // Mapped common codes
  if (status >= 200 && status < 300) return `${status} OK`;
  if (status === 404) return "404 Not Found";
  if (status === 500) return "500 Internal Server Error";

  // Default status description
  return `${status} Status`;
};
