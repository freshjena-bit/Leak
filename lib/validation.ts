import { z } from "zod";

export const uploadSchema = z.object({
  name: z.string().min(2).max(100),
  title: z.string().min(3).max(150),
  description: z.string().max(1000).optional()
});
