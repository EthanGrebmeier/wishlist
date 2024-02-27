import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const user = session?.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {user ? (
        <div className="space-y-2">
          <div>Welcome, {user.name}</div>
          <Link href="/api/auth/signout">Sign out</Link>
        </div>
      ) : (
        <div className="space-y-2">
          <div>Not Signed In </div>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </main>
  );
}
