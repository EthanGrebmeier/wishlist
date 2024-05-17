import Sidebar from "~/components/navigation/sidebar";

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
    <div className="mx-auto grid grid-cols-1 pb-16 md:pb-0 lg:grid-cols-[auto_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
