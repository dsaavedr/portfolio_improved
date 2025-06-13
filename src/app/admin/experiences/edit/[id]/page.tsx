import { getExperienceById } from "@/actions/experiences";
import ExperiencesForm from "@/components/ExperiencesForm/ExperiencesForm";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;
  const experienceResult = await getExperienceById(id);
  let experience: Prisma.ExperienceGetPayload<null>;
  let initialValues;

  if ("errorMessage" in experienceResult) {
    toast.error("Error", { description: experienceResult.errorMessage });
  }

  if ("experience" in experienceResult) {
    experience = experienceResult.experience;
    const {
      company,
      location,
      startDate,
      endDate,
      role,
      description,
      responsibilities,
    } = experience;

    initialValues = {
      company,
      location,
      startDate,
      roleEn: role.en,
      roleEs: role.es,
      descriptionEn: description.en,
      descriptionEs: description.es,
      responsibilitiesEn: responsibilities.map((el) => el.en).join(";"),
      responsibilitiesEs: responsibilities.map((el) => el.es).join(";"),
      endDate: endDate || undefined,
    };
  }

  return (
    <div className="flex w-full items-center justify-center pt-5">
      <ExperiencesForm id={id} initialValues={initialValues} />
    </div>
  );
};

export default page;
