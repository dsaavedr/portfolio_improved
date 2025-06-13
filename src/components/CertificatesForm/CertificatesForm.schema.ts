import { z } from "zod";

export const CertificatesFormSchema = z.object({
  title: z.string().min(2, "Required"),
  source: z.string().min(2, "Required"),
  date: z.date(),
});
