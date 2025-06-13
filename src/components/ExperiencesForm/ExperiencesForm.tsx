"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ExperiencesFormSchema } from "./ExperiencesForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  ExperiencesFormData,
  ExperiencesFormParams,
} from "./ExperiencesForm.types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createExperienceAction,
  editExperienceAction,
} from "@/actions/experiences";
import Link from "next/link";

const ExperiencesForm = ({ initialValues, id }: ExperiencesFormParams) => {
  const router = useRouter();
  const form = useForm<ExperiencesFormData>({
    resolver: zodResolver(ExperiencesFormSchema),
    defaultValues: initialValues || {
      roleEn: "Web Developer",
      roleEs: "Desarrollador Web",
      company: "",
      location: "Bogotá",
      descriptionEn: "",
      descriptionEs: "",
      responsibilitiesEn: "",
      responsibilitiesEs: "",
    },
    mode: "onChange",
  });
  const { watch, control, handleSubmit } = form;
  const [isPending, startTransition] = useTransition();

  const [startDate, endDate] = watch(["startDate", "endDate"]);

  const onSubmit: SubmitHandler<ExperiencesFormData> = (data) => {
    startTransition(async () => {
      let errorMessage: string | null;
      if (id) {
        errorMessage = (await editExperienceAction(data, id)).errorMessage;
      } else {
        errorMessage = (await createExperienceAction(data)).errorMessage;
      }

      if (!errorMessage) {
        toast.success("Success", {
          description: `The experience has been successfully ${id ? "edited" : "created"}!`,
        });
        router.push("/admin/experiences");
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
        className="max-w-4xl px-5 lg:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="mb-10 text-3xl font-bold">
            {id ? "Edit" : "Create"} experience
          </h1>
        </div>
        <div className="flex justify-center gap-10">
          <div className="space-y-4">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          selected={field.value}
                          onSelect={field.onChange}
                          {...field}
                          mode="single"
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          selected={field.value}
                          onSelect={field.onChange}
                          {...field}
                          mode="single"
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="roleEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role (EN)</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="roleEs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role (ES)</FormLabel>
                  <FormControl>
                    <Input placeholder="Desarrollador Web" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Springfield" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={control}
              name="descriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (EN)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="descriptionEs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (ES)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="responsibilitiesEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities (EN)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Add responsibilities separated by &quot;;&quot;. White space
                    will be trimmed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="responsibilitiesEs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities (ES)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Add responsibilities separated by &quot;;&quot;. White space
                    will be trimmed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col-reverse items-center gap-5 lg:flex-row">
          <Link className="w-full flex-1" href="/admin/experiences">
            <Button className="w-full" type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button className="w-full flex-1" disabled={isPending} type="submit">
            {id ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExperiencesForm;
