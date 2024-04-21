import ButtonLink from "~/components/ui/button-link";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const user = session?.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {user ? (
        <div className="w-fit space-y-2">
          <h1 className="font-serif text-4xl font-medium">
            Welcome, {user.name}!
          </h1>
          <ButtonLink href="/api/auth/signout">Sign out</ButtonLink>
        </div>
      ) : (
        <div className="w-fit space-y-2">
          <h1 className="font-serif text-4xl font-medium">Welcome!</h1>
          <ButtonLink href="/api/auth/signin">Sign in</ButtonLink>
        </div>
      )}
    </main>
  );
}
