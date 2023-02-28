import { loginSchema } from "@mern-zustand-auth/common";
import { z } from "zod";

const WithConfirm = z.object({
  confirm: z.string(),
});

export const RegisterSchema = z
  .intersection(loginSchema, WithConfirm)
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export type FormValues = z.infer<typeof RegisterSchema>;
