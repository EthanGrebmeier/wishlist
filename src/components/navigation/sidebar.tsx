import Navigation from ".";
import DeleteProductSheet from "../wishlist/product/delete-product-sheet";
import WishlistSettingsSheet from "../wishlist/wishlist-settings";
import { ContextBar } from "./context-bar";
import Logo from "./logo";
import MobileNavigation from "./mobile-nav";
import SkipToContent from "./skip-to-content";

const Sidebar = () => {
  return (
    <>
      <section className="top-0 z-10 grid grid-cols-1 grid-rows-[auto_1fr] bg-background  py-4  lg:sticky lg:h-screen">
        <SkipToContent />
        <div className="mt-6 flex w-full items-center justify-center px-2 lg:mb-8 lg:w-fit lg:justify-between lg:px-6">
          <Logo />
        </div>
        <div className="hidden h-1 min-h-full px-4 lg:flex">
          <Navigation />
        </div>
      </section>
      <ContextBar navigation={<MobileNavigation />} />
      <WishlistSettingsSheet />
      <DeleteProductSheet />
    </>
  );
};

export default Sidebar;
