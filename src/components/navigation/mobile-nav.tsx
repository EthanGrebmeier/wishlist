"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Logo from "./logo";

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
          size="circle"
          className="fixed bottom-4 right-4 z-20 lg:hidden"
        >
          <Menu size={25} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[440px] ">
        <DrawerHeader>
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <Logo className="mx-auto w-fit" />
        </DrawerHeader>
        <div className=" max-h-[80svh] w-full overflow-y-auto p-4 text-black">
          {navigation}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
