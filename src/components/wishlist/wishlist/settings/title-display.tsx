"use client";

import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import TitleBar from "~/components/ui/title-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import EditTitleForm from "./edit-title-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Wishlist } from "~/types/wishlist";
import { cn, getBackgroundColor } from "~/lib/utils";

type UpdateNameProps = {
  title: string;
  wishlist: Wishlist;
  isEditor: boolean;
};

const TitleDisplay = ({ title, wishlist, isEditor }: UpdateNameProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!isEditor) {
    return <TitleBar.Title>{title}</TitleBar.Title>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DialogTrigger className="group flex items-center gap-4">
              <TitleBar.Title>{title}</TitleBar.Title>
              <div
                className={cn(
                  "animate-bounce rounded-md border-2 border-black p-1 opacity-0 transition-opacity duration-1000 group-hover:opacity-100",
                  getBackgroundColor(wishlist.color),
                )}
              >
                <Pencil size={15} />
              </div>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>Edit Title</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="border-black py-4">
        <DialogHeader>
          <div className="flex items-center gap-4 font-serif text-4xl">
            <DialogTitle className="px-4 text-4xl font-medium">
              Edit Title
            </DialogTitle>
            {/* <div className="-mt-2 rounded-md border-2 border-black bg-primary p-1 ">
              <Pencil size={15} />
            </div> */}
          </div>
          <EditTitleForm
            onSuccess={() => {
              router.refresh();
              setIsOpen(false);
            }}
            wishlistId={wishlist.id}
            defaultValue={title}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TitleDisplay;
