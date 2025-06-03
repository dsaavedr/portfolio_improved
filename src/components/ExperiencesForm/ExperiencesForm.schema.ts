import { z } from "zod";

export const ExperiencesFormSchema = z
  .object({
    roleEn: z.string(),
    roleEs: z.string().optional(),
    company: z.string(),
    location: z.string(),
    descriptionEn: z.string(),
    descriptionEs: z.string(),
    responsibilitiesEn: z.array(z.string()),
    responsibilitiesEs: z.array(z.string()),
    startDate: z.date(),
    endDate: z.date().optional(),
  })
  .refine(
    ({ responsibilitiesEn, responsibilitiesEs }) => {
      return responsibilitiesEn.length === responsibilitiesEs.length;
    },
    {
      message: "The number of responsibilities isn't equal.",
    },
  );

export type ExperiencesFormData = z.infer<typeof ExperiencesFormSchema>;
