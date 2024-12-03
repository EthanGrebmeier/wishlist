"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  Grid,
  Menu,
  PackagePlusIcon,
  PencilIcon,
  Rows3,
  ScrollIcon,
  SettingsIcon,
  ShareIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { DrawerTrigger } from "~/components/ui/drawer";
import { cn } from "~/lib/utils";
import {
  isProductFormOpenAtom,
  productToEditAtom,
  viewedProductAtom,
} from "~/store/product-settings";
import {
  canUserEditAtom,
  isWishlistShareOpenAtom,
  viewedWishlistAtom,
  wishlistToEditAtom,
} from "~/store/wishlist-settings";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";
import ContextButton from "./context-button";
import { gridDisplayAtom } from "~/store/grid-display";
import { useMediaQuery } from "usehooks-ts";

export const ContextBar = () => {
  const currentPath = usePathname();
  const setIsAddProductModalOpen = useSetAtom(isProductFormOpenAtom);
  const setIsAddWishlistModalOpen = useSetAtom(isWishlistSettingsOpenAtom);
  const setWishlistToEdit = useSetAtom(wishlistToEditAtom);
  const canUserEdit = useAtomValue(canUserEditAtom);
  const viewedProduct = useAtomValue(viewedProductAtom);
  const viewedWishlist = useAtomValue(viewedWishlistAtom);
  const setProductToEdit = useSetAtom(productToEditAtom);
  const setIsWishlistShareOpen = useSetAtom(isWishlistShareOpenAtom);
  const [isGridDisplay, setGridDisplay] = useAtom(gridDisplayAtom);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const actions = useMemo(() => {
    return {
      wishlistView: [
        {
          shouldShow: canUserEdit,
          backgroundColor: "#4ade80",
          icon: <PackagePlusIcon size={25} />,
          text: "Add Product",
          hideTextOnMobile: false,
          onClick: () => {
            setIsAddProductModalOpen(true);
          },
        },
        {
          shouldShow: isMobile,
          backgroundColor: "#E7DBFA",
          icon:
            isGridDisplay === "grid" ? <Grid size={25} /> : <Rows3 size={25} />,
          text: "Toggle Grid",
          hideTextOnMobile: true,
          onClick: () => {
            setGridDisplay((prev) => (prev === "grid" ? "list" : "grid"));
          },
        },
        {
          shouldShow: canUserEdit,
          backgroundColor: "#E7DBFA",
          icon: <SettingsIcon size={25} />,
          text: "Edit List",
          hideTextOnMobile: true,
          onClick: () => {
            setIsAddWishlistModalOpen(true);
            if (viewedWishlist) setWishlistToEdit(viewedWishlist);
          },
        },
        {
          shouldShow: canUserEdit,
          backgroundColor: "#f9a8d4",
          icon: <ShareIcon size={25} />,
          text: "Share List",
          hideTextOnMobile: true,
          onClick: () => {
            setIsWishlistShareOpen(true);
          },
        },
      ],
      wishlistGroupView: [
        {
          shouldShow: true,
          backgroundColor: "#4ade80",
          icon: <ScrollIcon size={25} />,
          text: "Add List",
          hideTextOnMobile: false,
          onClick: () => {
            setIsAddWishlistModalOpen(true);
          },
        },
        {
          shouldShow: isMobile,
          backgroundColor: "#E7DBFA",
          icon:
            isGridDisplay === "grid" ? <Grid size={25} /> : <Rows3 size={25} />,
          text: "Toggle Grid",
          hideTextOnMobile: true,
          onClick: () => {
            setGridDisplay((prev) => (prev === "grid" ? "list" : "grid"));
          },
        },
      ],
      productView: [
        {
          shouldShow: canUserEdit,
          backgroundColor: "#facc15",
          icon: <PencilIcon size={25} />,
          text: "Edit Product",
          hideTextOnMobile: false,
          onClick: () => {
            if (viewedProduct) setProductToEdit(viewedProduct);
            setIsAddProductModalOpen(true);
          },
        },
      ],
      none: [],
    };
  }, [
    setIsAddProductModalOpen,
    setIsAddWishlistModalOpen,
    setProductToEdit,
    setWishlistToEdit,
    setIsWishlistShareOpen,
    setGridDisplay,
    isGridDisplay,
    viewedProduct,
    viewedWishlist,
    canUserEdit,
    isMobile,
  ]);

  const currentAction = useMemo(() => {
    if (currentPath.includes("shared")) return "none";
    if (/^\/wishlist\/[^/]+$/.test(currentPath)) return "wishlistView";
    if (currentPath.includes("/wishlist")) return "wishlistGroupView";
    if (currentPath.includes("/product")) return "productView";
    return "none";
  }, [currentPath]);

  const visibleActions = actions[currentAction].filter(
    (action) => action.shouldShow,
  );

  return (
    <div className="fixed bottom-4 right-1/2 z-20 flex h-14 translate-x-1/2 items-end overflow-hidden ">
      <div className="flex h-14 w-fit items-end overflow-hidden">
        <AnimatePresence mode="wait">
          {visibleActions.map((action, index) => (
            <ContextButton
              key={action.text}
              isLeftmost={index === 0}
              isRightmost={index === visibleActions.length - 1}
              {...action}
            />
          ))}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          "rounded-r-full bg-black lg:hidden",
          visibleActions.length === 0 ? "rounded-full " : "rounded-r-full",
        )}
      >
        <motion.div
          style={{
            translateY: "-4px",
          }}
          whileTap={{
            translateY: "0px",
          }}
          className={cn(
            " border-2 border-black bg-background py-2 ",
            visibleActions.length === 0
              ? "rounded-full px-4"
              : "rounded-r-full pl-3 pr-4",
          )}
        >
          <DrawerTrigger className="flex items-center gap-2 font-bold">
            <Menu size={25} />
          </DrawerTrigger>
        </motion.div>
      </div>
    </div>
  );
};
