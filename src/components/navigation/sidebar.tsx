import Navigation from ".";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = () => {
  return (
    <>
      <section className="0 sticky top-0 z-10 grid grid-cols-1 grid-rows-[auto_1fr] bg-background py-4 lg:relative lg:h-screen lg:pb-4 lg:pt-8">
        <div className="flex items-center justify-between px-6 lg:mb-8 ">
          <p className=" pt-2 font-serif text-4xl font-medium"> Wishlist </p>
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
