import "~/styles/globals.css";

import { Afacad, Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import Sidebar from "~/components/navigation/sidebar";
import { ourFileRouter } from "~/server/uploadthing";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Providers from "~/context/providers";

// const serif = Afacad({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const serif = localFont({
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
        className={`font-sans ${serif.variable} ${junicode.variable}  mx-auto max-w-[2200px] bg-background`}
      >
        <Providers>
          <MotionConfig reducedMotion="user">
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
          </MotionConfig>
        </Providers>
      </body>
    </html>
  );
}
