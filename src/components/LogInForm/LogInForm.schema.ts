import { z } from "zod";

export const LogInFormSchema = z.object({
  email: z.string().min(2, "Required").email({
    message: "Email format invalid",
  }),
  password: z.string().min(2, "Required"),
});

export type LogInForm = z.infer<typeof LogInFormSchema>;
