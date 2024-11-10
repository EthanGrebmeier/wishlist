"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Sheet,
  SheetContent,
  SheetFooter,
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

type ResponsiveSheetProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  onClose?: () => void;
};

const ResponsiveSheet = ({
  children,
  trigger,
  title,
  header,
  footer,
  onClose,
}: ResponsiveSheetProps) => {
  const formRef = useRef();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
    setIsOpen(open);
  };

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger>{trigger}</SheetTrigger>

        <SheetContent
          side="right"
          className="right-6 top-8 flex flex-col overflow-hidden rounded-lg border-2 border-black"
        >
          <SheetHeader className="flex h-14 flex-row items-center justify-between overflow-hidden border-b border-black">
            <SheetTitle className="font-serif text-2xl font-medium">
              {title}
            </SheetTitle>
            {header}
          </SheetHeader>
          <div className="flex-1">{children}</div>
          <SheetFooter>{footer}</SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[440px] overflow-hidden">
        <DrawerHeader className="flex h-14 flex-row items-center justify-between border-b border-black">
          <DrawerTitle className="font-serif text-2xl font-medium">
            {title}
          </DrawerTitle>
          {header}
        </DrawerHeader>
        <div
          style={{
            scrollbarGutter: "stable",
          }}
          className="max-h-[74svh] overflow-y-auto p-4 pb-[72px] "
        >
          {children}
        </div>
        {footer && (
          <DrawerFooter className="absolute bottom-0 left-0 right-0 flex h-16 flex-row items-center justify-between border-t border-black bg-transparent backdrop-blur-lg">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveSheet;
