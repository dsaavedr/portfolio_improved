import { getCertificateById } from "@/actions/certificates";
import CertificatesForm from "@/components/CertificatesForm/CertificatesForm";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;
  const certificateResult = await getCertificateById(id);
  let certificate: Prisma.CertificateGetPayload<null>;
  let initialValues;

  if ("errorMessage" in certificateResult) {
    toast.error("Error", { description: certificateResult.errorMessage });
  }

  if ("certificate" in certificateResult) {
    certificate = certificateResult.certificate;

    const { title, source, date } = certificate;

    initialValues = {
      title,
      source,
      date,
    };
  }

  return (
    <div className="flex w-full items-center justify-center pt-5">
      <CertificatesForm id={id} initialValues={initialValues} />
    </div>
  );
};

export default page;
