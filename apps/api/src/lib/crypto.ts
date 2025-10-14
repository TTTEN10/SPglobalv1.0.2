import crypto from "crypto";

// Salt used for IP hashing to prevent rainbow table attacks
// Retrieved from environment variables for security
const SALT = process.env.IP_SALT ?? "";

/**
 * Hashes an IP address using SHA-256 with salt for privacy protection
 * @param ip - The IP address string to hash
 * @returns The hashed IP address as a hex string, or undefined if no salt is configured
 */
export const ipHash = (ip: string) =>
  SALT ? crypto.createHash("sha256").update(ip + SALT).digest("hex") : undefined;
