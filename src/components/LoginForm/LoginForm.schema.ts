import { z } from "zod";

export const LogInFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Email format invalid.",
    }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

export type LogInForm = z.infer<typeof LogInFormSchema>;
