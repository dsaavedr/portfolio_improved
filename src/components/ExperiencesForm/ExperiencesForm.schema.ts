import { z } from "zod";

export const ExperiencesFormSchema = z
  .object({
    roleEn: z.string().min(2, "Required"),
    roleEs: z.string().optional(),
    company: z.string().min(2, "Required"),
    location: z.string().min(2, "Required"),
    descriptionEn: z.string().min(2, "Required"),
    descriptionEs: z.string().min(2, "Required"),
    responsibilitiesEn: z.string().min(2, "Required"),
    responsibilitiesEs: z.string().min(2, "Required"),
    startDate: z.date(),
    endDate: z.date().optional(),
  })
  .refine(
    ({ responsibilitiesEn, responsibilitiesEs }) => {
      return (
        responsibilitiesEn.split(";").length ===
        responsibilitiesEs.split(";").length
      );
    },
    {
      message: "The number of responsibilities isn't equal",
      path: ["responsibilitiesEs"],
    },
  )
  .refine(
    ({ startDate, endDate }) => {
      if (!endDate) return true;
      return endDate.getTime() > startDate.getTime();
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    },
  );

export type ExperiencesFormData = z.infer<typeof ExperiencesFormSchema>;
