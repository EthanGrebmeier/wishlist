"use client";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "~/lib/utils";

type ResponsiveDialogProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  trigger: React.ReactNode;
  bodyClassName?: string;
  headerClassName?: string;
  footer?: React.ReactNode;
};

const ResponsiveDialog = ({
  children,
  title,
  description,
  trigger,
  bodyClassName,
  headerClassName,
  footer,
}: ResponsiveDialogProps) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={bodyClassName}>
          <DialogHeader className={cn(headerClassName)}>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div>{children}</div>
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={showDialog} onOpenChange={setShowDialog}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={cn(headerClassName)}>
          <DrawerTitle className="text-xl font-semibold">{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div
          className={cn(
            "max-h-[calc(100svh-200px)] overflow-y-auto p-4",
            bodyClassName,
          )}
        >
          {children}
        </div>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
