import Navigation from ".";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = () => {
  return (
    <section className="sticky top-0 grid grid-cols-1 grid-rows-[auto_1fr] border-b border-gray-200 pt-4 lg:relative lg:h-screen lg:border-b-0 lg:border-r lg:py-8">
      <div className="flex items-center justify-between px-6 lg:mb-8 ">
        <p className=" pt-2 font-serif text-4xl font-medium"> Wishlist </p>
        <MobileSidebar navigation={<Navigation />} />
      </div>
      <div className="hidden h-1 min-h-full px-4 lg:flex">
        <Navigation />
      </div>
    </section>
  );
};

export default Sidebar;
