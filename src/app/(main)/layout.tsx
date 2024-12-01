import Sidebar from "~/components/navigation/sidebar";
import { Provider } from "jotai";
import SessionProvider from "~/components/auth/session-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid grid-cols-1 pb-16 md:pb-0 lg:grid-cols-[auto_1fr]">
      <SessionProvider>
        <Provider>
          <Sidebar />
          <main id="main" tabIndex={-1} className="relative flex flex-1">
            {children}
          </main>
        </Provider>
      </SessionProvider>
    </div>
  );
}
