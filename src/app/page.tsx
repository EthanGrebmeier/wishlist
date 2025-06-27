import { Lock, ScrollIcon, SparklesIcon, UserPlus } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Feature } from "~/components/home/feature";
import Logo from "~/components/navigation/logo";
import ButtonLink from "~/components/ui/button-link";
import Link from "~/components/ui/link";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const user = session?.user;

  if (user) {
    redirect("/wishlist");
  }

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col gap-8 px-2 py-8 md:px-8">
      <div className="flex w-full items-center justify-between gap-4 leading-3">
        <Logo />
        <div className="flex gap-4">
          <ButtonLink href="/auth/sign-in">Sign In</ButtonLink>
        </div>
      </div>
      <div className=" flex flex-col gap-16 rounded-xl border-2 border-black px-4 py-16 sm:px-8">
        <div className="flex h-full w-full flex-col items-center gap-12">
          <div className="flex max-w-[430px] flex-1 flex-col items-center justify-center gap-4 text-center">
            <h1 className=" font-serif text-5xl sm:text-7xl">
              Build your dream wishlist.
            </h1>
            <p className=" font-serif text-2xl leading-tight sm:text-3xl">
              fillaneed is perfect for birthdays, back-to-school and anything
              inbetween!{" "}
            </p>
            <ButtonLink href="/auth/sign-in" icon={<ScrollIcon />}>
              Get Started
            </ButtonLink>
          </div>
          <div className="relative hidden aspect-[27/19] w-full overflow-hidden md:block">
            <Image
              className=" h-full w-full object-cover object-top "
              src="/images/b47534f02d9e85f958443f66445e1bb2.png"
              alt="My birthday wishlist"
              fill
            />
          </div>
          <div className="relative flex aspect-[16/25] w-full overflow-hidden md:hidden">
            <Image
              className="h-full w-full object-cover object-top "
              src="/images/mobile-product-page.png"
              alt="My birthday wishlist"
              fill
            />
          </div>
        </div>
        <div className="grid gap-8 border-t-2 border-black pt-16 md:grid-cols-3 md:gap-4">
          <Feature
            title="Keep it a secret"
            description='Enable "Keep it a secret mode" to hide what gifts friends and family have bought you'
            icon={<Lock size={20} />}
            bgColor="bg-yellow-400"
          />
          <Feature
            title="Easily add products"
            description="Autofill product details quickly with a link"
            icon={<SparklesIcon size={20} />}
            bgColor="bg-indigo-300"
          />
          <Feature
            title="Share with friends and family"
            icon={<UserPlus size={20} />}
            bgColor="bg-green-400"
          />
        </div>
        <div className="flex flex-col items-center gap-4 border-t-2 border-black pt-16">
          <h2 className="text-balance text-center font-serif text-5xl sm:text-7xl">
            Create your wishlist today!
          </h2>
          <ButtonLink
            href="/auth/sign-in"
            className="w-fit"
            icon={<ScrollIcon />}
          >
            Get Started
          </ButtonLink>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
        <Link className="px-2 font-bold hover:text-blue-500" href="/privacy">
          Privacy Policy
        </Link>
        <Link className="px-2 font-bold hover:text-blue-500" href="/terms">
          Terms and Conditions
        </Link>
        <Link className="px-2 font-bold hover:text-blue-500" href="/guidelines">
          Community Guidelines
        </Link>
      </div>
    </main>
  );
}
