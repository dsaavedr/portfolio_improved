import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    name: z.string().min(2, "Required"),
    email: z.string().min(2, "Required").email({
      message: "Email format invalid",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password is too long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one number, and one special character",
        },
      ),
    confirmPassword: z.string({
      required_error: "Confirm your password",
    }),
  })
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    {
      message: "The passwords don't match",
      path: ["confirmPassword"],
    },
  );

export type SignUpForm = z.infer<typeof SignUpFormSchema>;
