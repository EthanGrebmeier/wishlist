"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type MobileSidebarProps = {
  navigation: JSX.Element;
};

const MobileSidebar = ({ navigation }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-4 right-2 z-10 flex h-11 w-11 rounded-full border-2 border-black bg-green-200 p-2 lg:hidden"
        >
          <Menu className="h-full w-full" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Wishlist
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 text-black">{navigation}</div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex px-0 lg:hidden" variant="ghost">
          <Menu size="30" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h1 className="text-left font-serif text-4xl font-medium">
            {" "}
            Wishlist{" "}
          </h1>
        </SheetHeader>
        <SheetDescription className="h-full pb-6 pt-4 text-black">
          {navigation}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
