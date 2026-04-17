import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

const getKey = () => {
  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("ENCRYPTION_KEY is missing in environment variables");
  }

  return crypto.createHash("sha256").update(key).digest();
};
// Encrypt the GitHub access token before storing it in the database
export const encrypt = (token) => {
  if (token === undefined || token === null) {
    throw new Error("encrypt() received undefined or null");
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  // Ensure string input
  const bufferText =
    typeof text === "string"
      ? Buffer.from(text, "utf-8")
      : Buffer.from(String(text));

  let encrypted = cipher.update(bufferText);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

// Decrypt the GitHub access token when retrieving it from the database
export const decrypt = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("decrypt() requires a valid encrypted string");
  }

  const parts = text.split(":");

  if (parts.length !== 2) {
    throw new Error("Invalid encrypted format");
  }

  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = Buffer.from(parts[1], "hex");
  const key = getKey();

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString("utf-8");
};
