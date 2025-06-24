import { getSkillById } from "@/actions/skills";
import SkillsForm from "@/components/SkillsForm/SkillsForm";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;
  const skillResult = await getSkillById(id);
  let skill: Prisma.SkillGetPayload<null>;
  let initialValues;

  if ("errorMessage" in skillResult) {
    toast.error("Error", { description: skillResult.errorMessage });
  }

  if ("skill" in skillResult) {
    skill = skillResult.skill;

    const { name, type } = skill;

    initialValues = {
      name,
      type,
    };
  }

  return (
    <div className="flex w-full items-center justify-center pt-5">
      <SkillsForm id={id} initialValues={initialValues} />
    </div>
  );
};

export default page;
