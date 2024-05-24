import { endOfTomorrow, formatDate } from "date-fns";
import {
  CakeSlice,
  Calendar,
  Gift,
  Heart,
  Lock,
  School,
  UserCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import Hero from "~/components/home/hero";
import MockCard from "~/components/home/mock-card";
import ButtonLink from "~/components/ui/button-link";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import Link from "~/components/ui/link";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const user = session?.user;

  if (user) {
    redirect("/wishlist");
  }

  return (
    <main className="flex max-w-[100svw] flex-col items-center justify-center gap-24 overflow-clip bg-background pb-8">
      <Hero />
      <div className="relative flex w-full items-center justify-center px-2">
        <div className="relative flex w-full max-w-[800px] flex-col">
          <h2 className="mb-2 text-balance text-center font-serif text-4xl">
            {" "}
            Create your dream wishlist!
          </h2>
          <p className="text-center text-xl">
            {" "}
            Fillaneed is perfect for birthdays, holidays, events, and registries
          </p>
          <div className="grid w-full  grid-cols-2 gap-4 py-8 md:grid-cols-3">
            <MockCard title="21st Birthday!" color="bg-green-400">
              <div className=" absolute left-2 top-2 flex items-center gap-2 rounded-md border-2 border-black bg-green-400 p-1 font-medium">
                <Calendar size={20} />{" "}
                <time className="text-sm">
                  {formatDate(endOfTomorrow(), "P")}
                </time>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CakeSlice size={50} />
              </div>
            </MockCard>
            <MockCard title="Back to School" color="bg-yellow-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <School size={50} />
              </div>
            </MockCard>
            <MockCard
              className="hidden md:block"
              title="Our wedding registry"
              color="bg-blue-400"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart size={50} />
              </div>
            </MockCard>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-2">
        <div className="relative flex w-fit flex-col items-center justify-center">
          <ColoredIconWrapper className="absolute -right-8 -top-8 rotate-[7deg] bg-red-400 md:-right-48">
            <Lock size={65} />
          </ColoredIconWrapper>
          <h2 className="mb-2 max-w-[280px] text-balance text-center font-serif text-4xl">
            {" "}
            Don&apos;t want to spoil the surprise?{" "}
          </h2>
          <p className="max-w-[500px] text-balance text-center text-xl">
            {" "}
            Turn on &quot;Keep it a secret&quot; mode to keep what&apos;s
            already been purchased a secret to yourself
          </p>
          <div className="grid w-full max-w-[550px] grid-cols-2 gap-8 py-8 sm:gap-4">
            <div className="flex w-full  flex-col items-center gap-2">
              <p className="text-xl xs:text-2xl"> What you see </p>
              <MockCard title="Dream Gift" price={"$25"} color="bg-green-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift size={50} />
                </div>
              </MockCard>
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <p className="text-xl xs:text-2xl"> What they see </p>
              <MockCard title="Dream Gift" price={"$25"} color="bg-green-200">
                <div className="absolute left-2 top-2 z-10 rounded-md border-2 border-black bg-green-300 px-1 py-[2px] font-medium ">
                  <p className="-mb-[1px] text-sm font-medium text-black">
                    {" "}
                    Purchased{" "}
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift size={50} />
                </div>
              </MockCard>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-black p-4">
        <p className="text-center font-serif text-4xl">Ready to get started?</p>
        <ButtonLink
          icon={<UserCircle size={20} />}
          href="/auth/sign-in"
          className="w-fit"
        >
          Sign In
        </ButtonLink>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <Link className="hover:font-bold" href="/privacy">
          Privacy Policy
        </Link>
        <Link className="hover:font-bold" href="/terms">
          Terms and Conditions
        </Link>
        <Link className="hover:font-bold" href="/guidelines">
          Community Guidelines
        </Link>
      </div>
    </main>
  );
}
