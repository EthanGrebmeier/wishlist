import { createSafeActionClient } from "next-safe-action";
import { getServerAuthSession } from "~/server/auth";

export type ServerActionResponse = {
  message: string;
} | null;

export const makeProtectedAction = createSafeActionClient({
  middleware: async () => {
    const session = await getServerAuthSession();

    if (!session) {
      throw new Error("User not found");
    }

    return { session };
  },
});

export const makeSafeAction = createSafeActionClient();
