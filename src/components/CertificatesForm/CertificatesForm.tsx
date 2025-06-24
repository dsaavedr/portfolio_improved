"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  CertificatesFormData,
  CertificatesFormParams,
} from "./CertificatesForm.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificatesFormSchema } from "./CertificatesForm.schema";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createCertificateAction,
  editCertificateAction,
} from "@/actions/certificates";

const CertificatesForm = ({ initialValues, id }: CertificatesFormParams) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<CertificatesFormData>({
    resolver: zodResolver(CertificatesFormSchema),
    defaultValues: initialValues || {
      title: "",
      source: "",
      date: new Date(2020, 10),
    },
    mode: "onChange",
  });
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { watch, control, handleSubmit } = form;

  const date = watch("date");

  const onSubmit: SubmitHandler<CertificatesFormData> = (data) => {
    startTransition(async () => {
      let errorMessage: string | null;

      if (id) {
        errorMessage = (await editCertificateAction(data, id)).errorMessage;
      } else {
        errorMessage = (await createCertificateAction(data)).errorMessage;
      }

      if (!errorMessage) {
        toast.success("Success", {
          description: `The certificate has been successfully ${id ? "edited" : "created"}!`,
        });
        router.push("/admin/certificates");
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  };

  const onCancel = () => {
    setIsRedirecting(true);
    router.push("/admin/certificates");
  };

  const isDisabled = isPending || isRedirecting;

  return (
    <Form {...form}>
      <form
        className="max-w-4xl min-w-auto px-5 md:min-w-xl lg:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="mb-10 text-3xl font-bold">
            {id ? "Edit" : "Create"} certificate
          </h1>
        </div>
        <div className="space-y-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="APIs and microservices" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input placeholder="University of Narnia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        defaultMonth={field.value}
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

export default CertificatesForm;
