import { z } from "zod";
import { CertificatesFormSchema } from "./CertificatesForm.schema";

export type CertificatesFormData = z.infer<typeof CertificatesFormSchema>;

export type CertificatesFormParams = {
  initialValues?: CertificatesFormData;
  id?: string;
};
