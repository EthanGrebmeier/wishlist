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

type MobileSidebarProps = {
  navigation: JSX.Element;
};

const MobileSidebar = ({ navigation }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex px-0 lg:hidden" variant="ghost">
          <Menu size="30" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <h1 className="text-left text-4xl font-medium"> Navigation</h1>
        </SheetHeader>
        <SheetDescription className="h-full pb-6 pt-4">
          {navigation}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
