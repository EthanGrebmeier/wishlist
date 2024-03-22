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

type UpdateNameProps = {
  title: string;
  wishlistId: string;
  isEditor: boolean;
};

const TitleDisplay = ({ title, wishlistId, isEditor }: UpdateNameProps) => {
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
              <div className="animate-bounce rounded-md border-2 border-black bg-primary p-1 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                <Pencil size={15} />
              </div>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>Edit Title</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="border-black ">
        <DialogHeader>
          <div className="flex items-center gap-4 font-serif text-4xl">
            <DialogTitle className="text-4xl font-medium">
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
            wishlistId={wishlistId}
            defaultValue={title}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TitleDisplay;
