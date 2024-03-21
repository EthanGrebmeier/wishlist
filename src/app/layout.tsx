import "~/styles/globals.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Sidebar from "~/components/navigation/sidebar";

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
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] ">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
