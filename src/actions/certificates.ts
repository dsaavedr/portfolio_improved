"use server";

import { getUser } from "@/auth/server";
import { CertificatesFormData } from "@/components/CertificatesForm/CertificatesForm.types";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const createCertificateAction = async (data: CertificatesFormData) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");

    await prisma.certificate.create({
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

export const editCertificateAction = async (
  data: CertificatesFormData,
  id: string,
) => {
  try {
    await prisma.certificate.update({
      where: { id },
      data,
    });

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

export const getCertificateById = async (id: string) => {
  try {
    const certificate = await prisma.certificate.findFirstOrThrow({
      where: { id },
    });

    return { certificate };
  } catch (err) {
    return handleError(err);
  }
};
