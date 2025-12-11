import { HttpMethod } from "@prisma/client";

/**
 * Returns the color class for the given HTTP status code.
 *
 * @param status The HTTP status code
 * @returns The color class for the status code
 */
export const getStatusColor = (status?: number): string => {
  const s = typeof status === "number" ? status : 0;
  if (s >= 200 && s < 300) return "text-green-400";
  if (s >= 300 && s < 400) return "text-yellow-400";
  if (s >= 400 && s < 500) return "text-orange-400";
  if (s >= 500) return "text-red-400";
  return "text-gray-400";
};

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
  [HttpMethod.GET]: "text-emerald-500!",
  [HttpMethod.POST]: "text-blue-500!",
  [HttpMethod.PUT]: "text-amber-500!",
  [HttpMethod.DELETE]: "text-rose-500!",
  [HttpMethod.PATCH]: "text-purple-500!",
  [HttpMethod.HEAD]: "text-gray-500!",
  [HttpMethod.OPTIONS]: "text-slate-500!",
};

export const requestBgMap: Record<HttpMethod, string> = {
  [HttpMethod.GET]: "bg-emerald-500/10!",
  [HttpMethod.POST]: "bg-blue-500/10!",
  [HttpMethod.PUT]: "bg-amber-500/10!",
  [HttpMethod.DELETE]: "bg-rose-500/10!",
  [HttpMethod.PATCH]: "bg-purple-500/10!",
  [HttpMethod.HEAD]: "bg-gray-500/10!",
  [HttpMethod.OPTIONS]: "bg-slate-500/10!",
};
