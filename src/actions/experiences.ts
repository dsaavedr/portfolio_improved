"use server";

import { getUser } from "@/auth/server";
import { ExperiencesFormData } from "@/components/ExperiencesForm/ExperiencesForm.schema";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const editExperienceAction = async (
  data: ExperiencesFormData,
  id: string,
) => {
  return {
    errorMessage: "",
  };
};

export const createExperienceAction = async (data: ExperiencesFormData) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");

    const {
      company,
      location,
      startDate,
      endDate,
      roleEn,
      roleEs,
      descriptionEn,
      descriptionEs,
      responsibilitiesEn,
      responsibilitiesEs,
    } = data;

    const responsibilities: Prisma.TranslationCreateInput[] = [];

    responsibilitiesEn.split(";").forEach((el, idx) => {
      responsibilities.push({
        en: el.trim(),
        es: (responsibilitiesEs.split(";")[idx] || "").trim(),
      });
    });

    await prisma.experience.create({
      data: {
        company,
        location,
        startDate,
        endDate,
        role: {
          en: roleEn,
          es: roleEs || "",
        },
        description: {
          en: descriptionEn,
          es: descriptionEs,
        },
        responsibilities,
        userId: user.id,
      },
    });

    return {
      errorMessage: null,
    };
  } catch (err) {
    return handleError(err);
  }
};
