"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  BookUserIcon,
  Grid,
  Menu,
  PackagePlusIcon,
  PencilIcon,
  Rows3,
  ScrollIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingBasketIcon,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";
import { usePreventScroll } from "@react-aria/overlays";
import { useContextBar } from "~/context/context-bar-context";

type ContextBarProps = {
  navigation: React.ReactNode;
};
export const ContextBar = ({ navigation }: ContextBarProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
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
  const { buttons: childrenActions } = useContextBar();
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const actions = useMemo(() => {
    return {
      wishlistView: [
        {
          shouldShow: canUserEdit,
          backgroundColor: "#4ade80",
          icon: <PackagePlusIcon size={25} />,
          text: "Add Product",
          hideTextOnMobile: true,
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
          shouldShow: true,
          backgroundColor: "#f9a8d4",
          icon: <ShareIcon size={25} />,
          text: "Sharing",
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
          text: "Edit",
          hideTextOnMobile: false,
          onClick: () => {
            if (viewedProduct) setProductToEdit(viewedProduct);
            setIsAddProductModalOpen(true);
          },
        },
        {
          shouldShow: viewedProduct?.url,
          backgroundColor: "#fdba74",
          icon: <ShoppingBasketIcon size={25} />,
          text: "Purchase",
          hideTextOnMobile: true,
          onClick: () => {
            if (viewedProduct?.url) window.open(viewedProduct.url, "_blank");
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

  const visibleActions = [...actions[currentAction], ...childrenActions].filter(
    (action) => action.shouldShow,
  );
  const ref = useRef<HTMLDivElement>(null);
  const openNavButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [currentPath]);

  useOnClickOutside(ref, () => {
    setIsMobileNavOpen(false);
  });

  usePreventScroll({
    isDisabled: !isMobileNavOpen,
  });

  useEffect(() => {
    if (!isMobile) {
      setIsMobileNavOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobileNavOpen) {
      const dialogElement = ref.current;
      const openNavButton = openNavButtonRef.current;
      if (dialogElement && openNavButton) {
        const focusableElements = dialogElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstFocusableElement = focusableElements[0] as HTMLElement;
        const lastFocusableElement = openNavButton;
        firstFocusableElement.focus();

        const handleTabKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Tab") {
            if (
              event.shiftKey &&
              document.activeElement === firstFocusableElement
            ) {
              event.preventDefault();
              lastFocusableElement.focus();
            } else if (
              !event.shiftKey &&
              document.activeElement === lastFocusableElement
            ) {
              event.preventDefault();
              firstFocusableElement.focus();
            }
          }
        };

        const handleEscapeKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            setIsMobileNavOpen(false);
          }
        };

        document.addEventListener("keydown", handleTabKeyPress);
        document.addEventListener("keydown", handleEscapeKeyPress);

        return () => {
          document.removeEventListener("keydown", handleTabKeyPress);
          document.removeEventListener("keydown", handleEscapeKeyPress);
        };
      }
    }
  }, [isMobileNavOpen]);

  return (
    <>
      <AnimatePresence>
        {isMobile && isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-1/2 z-20 flex translate-x-1/2 flex-col items-center overflow-hidden ">
        <AnimatePresence>
          {isMobile && isMobileNavOpen && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 340 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="z-30 flex w-screen min-w-full max-w-[min(calc(100svw-16px),440px)] xs:max-w-[min(calc(100svw-32px),440px)] overflow-hidden rounded-3xl border-2 border-black bg-background "
            >
              <div className="flex h-full w-full overflow-hidden">
                {navigation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex ">
          <div className="flex h-14 w-fit items-end overflow-hidden">
            <AnimatePresence mode="popLayout">
              {visibleActions.map((action, index) => (
                <ContextButton
                  key={action.text}
                  isLeftmost={index === 0}
                  isRightmost={index === visibleActions.length - 1}
                  hideTextOnMobile={
                    visibleActions.length > 2 ? action.hideTextOnMobile : false
                  }
                  onClick={action.onClick}
                  icon={action.icon}
                  text={action.text}
                  backgroundColor={action.backgroundColor}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className={cn("flex h-14 items-end  lg:hidden")}>
            <div
              className={cn(
                "flex  bg-black",
                visibleActions.length === 0
                  ? "rounded-full "
                  : "rounded-r-full",
              )}
            >
              <motion.button
                ref={openNavButtonRef}
                style={{
                  translateY: "-4px",
                }}
                whileFocus={{
                  translateY: "-3px",
                }}
                whileHover={{
                  translateY: "-3px",
                }}
                whileTap={{
                  translateY: "0px",
                }}
                className={cn(
                  " flex items-center gap-2 border-2 border-black bg-background py-2 font-bold",
                  visibleActions.length === 0
                    ? "rounded-full px-4"
                    : "rounded-r-full pl-3 pr-4",
                )}
                aria-label={
                  isMobileNavOpen
                    ? "Close Navigation Menu"
                    : "Open Navigation Menu"
                }
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {isMobileNavOpen ? <X size={25} /> : <Menu size={25} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
