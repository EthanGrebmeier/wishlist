import "~/styles/globals.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import Sidebar from "~/components/navigation/sidebar";
import { ourFileRouter } from "~/server/uploadthing";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const orbiter = localFont({
  src: [
    {
      path: "../../public/fonts/TASAOrbiterVF.woff2",
    },
  ],
  variable: "--font-sans",
});

const junicode = localFont({
  src: [
    {
      path: "../../public/fonts/Junicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Junicode-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

export const metadata = {
  title: "Fillaneed",
  description: "Create your dream wishlist",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${orbiter.variable} ${junicode.variable}  mx-auto max-w-[2200px] bg-background`}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <div className="h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
