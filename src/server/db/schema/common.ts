import { z } from "zod";

export const serverActionResponseSchema = z.object({
  message: z.string()
}).nullable()