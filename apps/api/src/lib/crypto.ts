import crypto from "crypto";

// Salt used for IP hashing to prevent rainbow table attacks
// Retrieved from environment variables for security
const SALT = process.env.IP_SALT ?? "";

/**
 * Hashes an IP address using SHA-256 with salt for privacy protection
 * @param ip - The IP address string to hash
 * @returns The hashed IP address as a hex string, or undefined if no salt is configured
 */
export const ipHash = (ip: string) => {
  // Privacy by default - only hash if explicitly enabled
  if (process.env.IP_HASHING_ENABLED !== 'true') {
    return undefined;
  }
  
  // Validate salt exists and is secure
  if (!SALT || SALT.length < 32) {
    console.warn('WARNING: IP_SALT is not secure. IP hashing disabled.');
    return undefined;
  }
  
  // Validate IP is not empty
  if (!ip || ip.trim() === '') {
    return undefined;
  }
  
  return crypto
    .createHash("sha256")
    .update(ip + SALT)
    .digest("hex");
};
