import { getSkills } from "@/actions/skills";
import SkillsTable from "@/components/SkillsTable/SkillsTable";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const page = async () => {
  const skillsResult = await getSkills();
  let skills: Prisma.SkillGetPayload<null>[] = [];

  if ("errorMessage" in skillsResult) {
    toast.error("Error", {
      description: skillsResult.errorMessage,
    });

    redirect("/admin");
  }

  if ("skills" in skillsResult) {
    skills = skillsResult.skills;
  }

  return (
    <div className="container mx-auto pt-5 pb-5">
      <h1 className="mb-10 text-center text-3xl font-bold">Skills</h1>
      <SkillsTable skills={skills} />
    </div>
  );
};

export default page;
