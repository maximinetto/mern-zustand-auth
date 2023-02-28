import { z } from "zod";

export default z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4),
  }),
});
