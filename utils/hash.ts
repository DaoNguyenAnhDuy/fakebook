// utils/hash.ts
// Dùng Node.js crypto built-in (scrypt + randomBytes + timingSafeEqual)
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Generate a random salt and hash the password using Node.js scrypt.
 * Returns a string in the form `${saltHex}:${hashHex}`.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16); // 128-bit salt
  const hashBuf = await scryptAsync(password, salt, 64) as Buffer;
  return `${salt.toString('hex')}:${hashBuf.toString('hex')}`;
}

/**
 * Verify a password against a stored `${saltHex}:${hashHex}` value.
 */
export async function verifyPassword(stored: string, password: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':');
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, 'hex');
  const expectedHash = Buffer.from(hashHex, 'hex');
  const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
  return timingSafeEqual(expectedHash, derivedKey);
}
