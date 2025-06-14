import { SkillType } from "@prisma/client";
import { z } from "zod";

export const SkillsFormSchema = z.object({
  name: z.string().min(1, "Required"),
  type: z.nativeEnum(SkillType),
});
