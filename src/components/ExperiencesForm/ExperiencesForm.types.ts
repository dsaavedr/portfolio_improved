import { z } from "zod";
import { ExperiencesFormSchema } from "./ExperiencesForm.schema";

export type ExperiencesFormData = z.infer<typeof ExperiencesFormSchema>;

export type ExperiencesFormParams = {
  initialValues?: ExperiencesFormData;
  id?: string;
};
