"use client";

import { resetPasswordAction } from "@/actions/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const schema = z.object({
  email: z.string().min(2, "Required").email({
    message: "Email format invalid",
  }),
});

type schemaType = z.infer<typeof schema>;

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<schemaType> = (data) => {
    startTransition(async () => {
      const errorMessage = (await resetPasswordAction(data.email)).errorMessage;

      if (!errorMessage) {
        toast.success("Success", {
          description: "Check your email for a password reset link",
        });
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-5 px-2 py-5 sm:px-5"
      >
        <div className="mb-6 space-y-2 text-center">
          <div className="bg-accent mx-auto inline-block aspect-square overflow-hidden rounded-full p-3">
            <Lock className="text-muted-foreground h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
