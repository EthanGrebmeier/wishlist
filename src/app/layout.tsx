import "~/styles/globals.css";

import { Inter } from "next/font/google";

import Sidebar from "~/components/navigation/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={`font-sans ${inter.variable} bg-background`}>
        <div className="mx-auto grid grid-cols-[auto_1fr] ">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
