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
    <div className="container mx-auto pt-5 pb-5">
      <h1 className="mb-10 text-center text-3xl font-bold">Experiences</h1>
      <ExperiencesTable experiences={experiences} />
    </div>
  );
};

export default page;
