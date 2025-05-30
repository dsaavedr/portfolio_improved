"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LogInForm as LogInFormType,
  LogInFormSchema,
} from "./LogInForm.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogInForm = () => {
  const router = useRouter();
  const form = useForm<LogInFormType>({
    resolver: zodResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { watch } = form;

  const [email, password] = watch(["email", "password"]);

  const onSubmit: SubmitHandler<LogInFormType> = async (data) => {
    const { email, password } = data;

    const errorMessage = (await loginAction(email, password)).errorMessage;

    if (!errorMessage) {
      toast.success("Logged in", {
        description: "You have been successfully logged in",
      });
      router.push("/admin");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }
  };

  const isDisabled = !email || !password;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log In</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isDisabled} type="submit" className="w-full">
            Log In
          </Button>
          <Button variant="outline" className="w-full">
            Log in with Google
          </Button>
          <Link
            href="#"
            className="inline-block w-full text-center text-sm underline"
            prefetch={false}
          >
            Forgot your password?
          </Link>
          <span className="flex w-full items-center justify-center gap-1 text-sm">
            Don&lsquo;t have an account?{" "}
            <Link href="#" className="underline" prefetch={false}>
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default LogInForm;
