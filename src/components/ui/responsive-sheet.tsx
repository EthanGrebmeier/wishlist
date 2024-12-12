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
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { cn } from "~/lib/utils";
import { XIcon } from "lucide-react";
import useMeasure from "react-use-measure";

type ResponsiveSheetProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  header?: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  shouldPadBottomMobile?: boolean;
  titleIcon?: React.ReactNode;
  contentClassName?: string;
};

const ResponsiveSheet = ({
  children,
  trigger,
  title,
  header,
  onClose,
  isOpen,
  setIsOpen,
  titleIcon,
  contentClassName,
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

  const [ref, { height: headerHeight }] = useMeasure();

  console.log(headerHeight);

  if (isDesktop) {
    return (
      <Sheet open={isOpen ?? internalIsOpen} onOpenChange={onOpenChange}>
        {trigger && <SheetTrigger>{trigger}</SheetTrigger>}

        <SheetContent
          side="right"
          className={cn(
            " right-6 top-8 flex max-h-[calc(100svh-64px)] flex-col overflow-hidden rounded-lg border-2 border-black",
            contentClassName,
          )}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-2 top-2"
          >
            <XIcon size={24} />
          </button>
          <SheetHeader
            ref={ref}
            className="flex flex-row items-center justify-between overflow-hidden border-b border-black px-4 pb-4 pt-8"
          >
            <div className="flex items-center gap-2">
              {titleIcon}
              <SheetTitle className=" -mb-1 font-serif text-2xl font-medium">
                {title}
              </SheetTitle>
            </div>
            {header}
          </SheetHeader>
          <div
            className={cn(
              "overflow-y-auto px-4 pt-2",
              shouldPadBottomMobile && "pb-[74px]",
            )}
            style={{
              maxHeight: `calc(100svh - ${headerHeight}px - 68px)`,
            }}
          >
            {children}
          </div>
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
          <div className="flex items-center gap-2">
            {titleIcon}
            <DrawerTitle className="-mb-1 font-serif text-2xl font-medium">
              {title}
            </DrawerTitle>
          </div>
          {header}
        </DrawerHeader>
        <div
          className={cn(
            "max-h-[74svh] overflow-y-auto px-4 pt-2",
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
