"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const logInAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });

    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

export const signUpAction = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });

    if (error) {
      throw error;
    }

    const userId = data.user?.id;

    if (!userId) throw new Error("Error signing up");

    await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
      },
    });

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
};
