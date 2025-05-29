import { z } from "zod";

export const LoginFormSchema = z.object({
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

export type LoginForm = z.infer<typeof LoginFormSchema>;
