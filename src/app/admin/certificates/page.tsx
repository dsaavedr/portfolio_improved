import { getCertificates } from "@/actions/certificates";
import CertificatesTable from "@/components/CertificatesTable/CertificatesTable";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const page = async () => {
  const certificatesResult = await getCertificates();
  let certificates: Prisma.CertificateGetPayload<null>[] = [];

  if ("errorMessage" in certificatesResult) {
    toast.error("Error", {
      description: certificatesResult.errorMessage,
    });

    redirect("/admin");
  }

  if ("certificates" in certificatesResult) {
    certificates = certificatesResult.certificates;
  }

  return (
    <div className="container mx-auto pt-5 pb-5">
      <h1 className="mb-10 text-center text-3xl font-bold">Certificates</h1>
      <CertificatesTable certificates={certificates} />
    </div>
  );
};

export default page;
