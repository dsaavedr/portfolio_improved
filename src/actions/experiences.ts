import { ExperiencesFormData } from "@/components/ExperiencesForm/ExperiencesForm.schema";

export const editExperienceAction = async (
  data: ExperiencesFormData,
  id: string,
) => {
  return {
    errorMessage: "",
  };
};

export const createExperienceAction = async (data: ExperiencesFormData) => {
  return {
    errorMessage: "",
  };
};
