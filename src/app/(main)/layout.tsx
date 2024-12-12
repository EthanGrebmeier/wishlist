import Sidebar from "~/components/navigation/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid grid-cols-1 xl:grid-cols-[auto_1fr] ">
      <Sidebar />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col gap-4 px-2 pb-16 md:max-w-none md:px-6 xl:max-w-screen-xl xl:pt-8"
      >
        {children}
      </main>
    </div>
  );
}
