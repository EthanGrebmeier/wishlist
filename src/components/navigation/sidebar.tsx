import Navigation from ".";
import Logo from "./logo";
import MobileSidebar from "./mobile-nav";

const Sidebar = () => {
  return (
    <>
      <section className="top-0 z-10 grid grid-cols-1 grid-rows-[auto_1fr] bg-background py-4 md:sticky md:top-0 lg:h-screen">
        <div className="flex items-center justify-between px-2 md:px-6 lg:mb-8 ">
          <Logo />
        </div>
        <div className="hidden h-1 min-h-full px-4 lg:flex">
          <Navigation />
        </div>
      </section>
      <MobileSidebar navigation={<Navigation />} />
    </>
  );
};

export default Sidebar;
