import Sidebar from "~/components/navigation/sidebar";
import { Provider } from "jotai";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid grid-cols-1 pb-16 md:pb-0 lg:grid-cols-[auto_1fr]">
      <Sidebar />
      <Provider>
        <main id="main" tabIndex={-1} className="relative">
          {children}
        </main>
      </Provider>
    </div>
  );
}
