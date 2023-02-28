import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const loginBodySchema = z.object({
  body: loginSchema,
});

export const a = "5";
