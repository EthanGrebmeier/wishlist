"use server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/users";

export const findUserByEmail = async (
  prevState: { message: string } | null,
  formData: { email: string },
) => {
  return db.query.users.findFirst({
    where: eq(users.email, formData.email),
  });
};
