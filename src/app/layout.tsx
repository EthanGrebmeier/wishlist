import "~/styles/globals.css";
import localFont from "next/font/local";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/server/uploadthing";

const orbiter = localFont({
  src: [
    {
      path: "../fonts/TASAOrbiterVF.woff2",
    },
  ],
  variable: "--font-sans",
});

const junicode = localFont({
  src: [
    {
      path: "../fonts/Junicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Junicode-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

export const metadata = {
  title: "Wishlist",
  description: "Create your dream wishlist",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        {children}
      </body>
    </html>
  );
}
