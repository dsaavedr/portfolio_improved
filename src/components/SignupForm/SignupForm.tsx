"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  SignUpFormSchema,
  SignUpForm as SignUpFormType,
} from "./SignUpForm.schema";

const SignupForm = () => {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { watch } = form;

  const [name, email, password, confirmPassword] = watch([
    "name",
    "email",
    "password",
    "confirmPassword",
  ]);

  const onSubmit: SubmitHandler<SignUpFormType> = async (data) => {
    console.log(data);
  };

  const isDisabled =
    !name || !email || !password || password !== confirmPassword;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Enter your information below to create a new account
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled} className="w-full">
            Register
          </Button>
          <Button variant="outline" className="w-full">
            Register with Google
          </Button>
          <span className="flex w-full items-center justify-center gap-1 text-sm">
            Already have an account?{" "}
            <Link href="#" className="underline" prefetch={false}>
              Log in
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
