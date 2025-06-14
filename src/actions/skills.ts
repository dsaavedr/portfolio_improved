"use server";

import { getUser } from "@/auth/server";
import { SkillsFormData } from "@/components/SkillsForm/SkillsForm.types";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createSkillAction = async (data: SkillsFormData) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");

    await prisma.skill.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

export const editSkillAction = async (data: SkillsFormData, id: string) => {
  try {
    await prisma.skill.update({
      where: {
        id,
      },
      data,
    });

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

export const deleteSkillAction = async (id: string) => {
  try {
    await prisma.skill.delete({
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
    revalidatePath("/admin/skills");
  }
};

export const getSkills = async () => {
  try {
    const skills = await prisma.skill.findMany();
    return { skills };
  } catch (err) {
    return handleError(err);
  }
};

export const getSkillById = async (id: string) => {
  try {
    const skill = await prisma.skill.findFirstOrThrow({
      where: { id },
    });

    return { skill };
  } catch (err) {
    return handleError(err);
  }
};
