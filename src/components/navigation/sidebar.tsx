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
      <section className="top-0 z-10 grid grid-cols-1 grid-rows-[auto_1fr] gap-6 bg-background  py-4 pr-4  xl:sticky xl:h-screen">
        <SkipToContent />
        <div className="mt-6 flex w-full items-center justify-center px-2 xl:w-fit xl:justify-between xl:px-6">
          <Logo />
        </div>
        <div className="hidden h-1 min-h-full pl-4 xl:flex">
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
