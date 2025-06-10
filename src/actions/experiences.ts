"use server";

import { getUser } from "@/auth/server";
import { ExperiencesFormData } from "@/components/ExperiencesForm/ExperiencesForm.schema";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export const editExperienceAction = async (
  data: ExperiencesFormData,
  id: string,
) => {
  const responsibilitiesEn = data.responsibilitiesEn.split(";");
  const responsibilitiesEs = data.responsibilitiesEs.split(";");
  const responsibilities: { en: string; es: string }[] = [];
  responsibilitiesEn.forEach((el, idx) => {
    responsibilities.push({
      en: el.trim(),
      es: (responsibilitiesEs[idx] || "").trim(),
    });
  });
  try {
    const { company, location, startDate, endDate } = data;
    await prisma.experience.update({
      where: {
        id,
      },
      data: {
        role: {
          en: data.roleEn,
          es: data.roleEs || "",
        },
        company,
        location,
        description: {
          en: data.descriptionEn,
          es: data.descriptionEs,
        },
        responsibilities,
        startDate,
        endDate,
      },
    });

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
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

export const deleteExperienceAction = async (id: string) => {
  try {
    await prisma.experience.delete({
      where: {
        id,
      },
    });

    return {
      errorMessage: null,
    };
  } catch (err) {
    return handleError(err);
  } finally {
    redirect("/admin/experiences");
  }
};

export const getExperiences = async () => {
  try {
    const experiences = await prisma.experience.findMany();
    return { experiences };
  } catch (err) {
    return handleError(err);
  }
};

export const getExperienceById = async (id: string) => {
  try {
    const experience = await prisma.experience.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { experience };
  } catch (err) {
    return handleError(err);
  }
};
