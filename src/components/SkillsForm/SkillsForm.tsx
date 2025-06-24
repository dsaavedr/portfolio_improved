"use client";

import { SkillsFormData, SkillsFormParams } from "./SkillsForm.types";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillsFormSchema } from "./SkillsForm.schema";
import { SkillType } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { capitalizeWords } from "@/lib/utils";
import { Button } from "../ui/button";
import { createSkillAction, editSkillAction } from "@/actions/skills";
import { useRouter } from "next/navigation";

const SkillsForm = ({ initialValues, id }: SkillsFormParams) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SkillsFormData>({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: initialValues || {
      name: "",
      type: SkillType.MISCELLANEOUS,
    },
    mode: "onChange",
  });
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    formState: { isSubmitSuccessful },
    control,
    handleSubmit,
    reset,
  } = form;

  const onSubmit: SubmitHandler<SkillsFormData> = (data) => {
    startTransition(async () => {
      let errorMessage: string | null;

      if (id) {
        errorMessage = (await editSkillAction(data, id)).errorMessage;
      } else {
        errorMessage = (await createSkillAction(data)).errorMessage;
      }

      if (!errorMessage) {
        toast.success("Success", {
          description: `The skill has been successfully ${id ? "edited" : "created"}!`,
        });
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onCancel = () => {
    setIsRedirecting(true);
    router.push("/admin/skills/");
  };

  const isDisabled = isPending || isRedirecting;

  return (
    <Form {...form}>
      <form
        className="max-w-4xl px-5 lg:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-10 text-center text-3xl font-bold">
          {id ? "Edit" : "Create"} skill
        </h1>
        <div className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a skill type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(SkillType).map((value) => (
                      <SelectItem key={value} value={value}>
                        {capitalizeWords(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10 flex w-full flex-col-reverse items-center gap-5 lg:flex-row">
          <Button
            className="w-full flex-1"
            onClick={onCancel}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="w-full flex-1" disabled={isDisabled} type="submit">
            {id ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillsForm;
