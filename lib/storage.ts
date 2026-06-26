import { randomUUID } from "crypto";

export function generateFileName(ext: string) {
  return `${randomUUID()}.${ext}`;
}
