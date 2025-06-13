import { Prisma } from "@prisma/client";

export type ICertificate = Prisma.CertificateGetPayload<null>;

export type CertificatesTableProps = {
  certificates: ICertificate[];
};

export type CreateColumnsProps = {
  onDelete: (id: string) => void;
};
