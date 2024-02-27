import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navigation from "~/components/navigation";

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
      <body className={`font-sans ${inter.variable} bg-yellow-100`}>
        <div className="mx-auto grid grid-cols-[auto_1fr] ">
          <section className="border-r-2 border-black py-6">
            <div className="mb-8 border-b-2 border-black ">
              <p className="px-12 pb-4 text-4xl font-medium"> Wishlist </p>
            </div>
            <div className="px-12">
              <Navigation />
            </div>
          </section>
          {children}
        </div>
      </body>
    </html>
  );
}
