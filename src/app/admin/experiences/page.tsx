import { redirect } from "next/navigation";
import { getExperiences } from "@/actions/experiences";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import ExperiencesTable from "@/components/ExperiencesTable/ExperiencesTable";

const page = async () => {
  const experiencesResult = await getExperiences();
  let experiences: Prisma.ExperienceGetPayload<null>[] = [];

  if ("errorMessage" in experiencesResult) {
    toast.error("Error", {
      description: experiencesResult.errorMessage,
    });
    redirect("/admin");
  }

  if ("experiences" in experiencesResult) {
    experiences = experiencesResult.experiences;
  }

  return (
    <div className="container mx-auto pt-25 pb-5">
      <ExperiencesTable experiences={experiences} />
    </div>
  );
};

export default page;
