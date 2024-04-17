import { createSafeActionClient } from "next-safe-action";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export type ServerActionResponse = {
  message: string;
} | null;

export const makeProtectedAction = createSafeActionClient({
  middleware: async () => {
    const session = await getServerAuthSession();

    if (!session) {
      redirect("/");
    }

    return { session };
  },
});

export const makeSafeAction = createSafeActionClient();
