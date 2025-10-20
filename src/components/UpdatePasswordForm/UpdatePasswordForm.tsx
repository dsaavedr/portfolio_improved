"use client";

import { updatePasswordAction } from "@/actions/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  UpdatePasswordForm as UpdatePasswordFormType,
  UpdatePasswordFormSchema,
} from "./UpdatePasswordForm.schema";

const UpdatePasswordForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdatePasswordFormType>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<UpdatePasswordFormType> = (data) => {
    startTransition(async () => {
      const errorMessage = (await updatePasswordAction(data.password))
        .errorMessage;

      if (!errorMessage) {
        toast.success("Success", {
          description: "Password successfully updated",
        });

        router.back();
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
            <Shield className="text-muted-foreground h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-muted-foreground">
            Enter your new password to secure your account
          </p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
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
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
