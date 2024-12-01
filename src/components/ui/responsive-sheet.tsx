"use client";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { cn } from "~/lib/utils";
import { XIcon } from "lucide-react";

type ResponsiveSheetProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  header?: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  shouldPadBottomMobile?: boolean;
};

const ResponsiveSheet = ({
  children,
  trigger,
  title,
  header,
  onClose,
  isOpen,
  setIsOpen,
  shouldPadBottomMobile = false,
}: ResponsiveSheetProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
    setIsOpen ? setIsOpen(open) : setInternalIsOpen(open);
  };

  if (isDesktop) {
    return (
      <Sheet open={isOpen ?? internalIsOpen} onOpenChange={onOpenChange}>
        {trigger && <SheetTrigger>{trigger}</SheetTrigger>}

        <SheetContent
          side="right"
          className=" right-6 top-8 flex max-h-[calc(100svh-64px)] flex-col overflow-y-auto rounded-lg border-2 border-black"
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-2 top-2"
          >
            <XIcon size={24} />
          </button>
          <SheetHeader className="flex h-14 flex-row items-center justify-between overflow-hidden border-b border-black">
            <SheetTitle className="font-serif text-2xl font-medium">
              {title}
            </SheetTitle>
            {header}
          </SheetHeader>
          <div className="flex-1">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer
      repositionInputs={false}
      open={isOpen ?? internalIsOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <DrawerTrigger>{trigger}</DrawerTrigger>}
      <DrawerContent className="mx-auto max-w-[440px] overflow-hidden">
        <DrawerHeader className="flex h-14 flex-row items-center justify-between border-b border-black">
          <DrawerTitle className="font-serif text-2xl font-medium">
            {title}
          </DrawerTitle>
          {header}
        </DrawerHeader>
        <div
          className={cn(
            "max-h-[74svh] overflow-y-auto px-4",
            shouldPadBottomMobile && "pb-[68px]",
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveSheet;
