import { customAlphabet } from "nanoid";

/**
 * Generate a random invite token
 * @returns A random invite token
 */
export const generateInviteToken = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  32
);
