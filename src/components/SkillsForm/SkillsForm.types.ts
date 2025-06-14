import { z } from "zod";
import { SkillsFormSchema } from "./SkillsForm.schema";

export type SkillsFormData = z.infer<typeof SkillsFormSchema>;

export type SkillsFormParams = {
  initialValues?: SkillsFormData;
  id?: string;
};
