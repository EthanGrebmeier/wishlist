"use client";

import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { Wishlist, WishlistProduct } from "~/types/wishlist";
import { AnimatePresence, motion } from "framer-motion";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { PackageOpen } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useAction } from "next-safe-action/hooks";
import { markProductReceived } from "~/server/actions/product";
import type { User } from "~/types/user";
import SharedUserThumbnail from "../../share-wishlist/shared-users/shared-user-thumbnail";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/ui/submit-button";

type ModalProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  sharedUsers: User[];
};

const Modal = ({ wishlist, sharedUsers, product }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="w-fit">
            I have received this item
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[380px] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="font-serif text-4xl font-medium">
              Mark item as received
            </DialogTitle>
          </DialogHeader>
          <ModalContent
            sharedUsers={sharedUsers}
            wishlist={wishlist}
            product={product}
            animationDelaySeconds={0.1}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="w-fit">
          Mark item as received
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[440px] overflow-hidden">
        <DrawerHeader className="text-start">
          <DrawerTitle className="font-serif text-4xl font-medium">
            Have you received this item?
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ModalContent
            sharedUsers={sharedUsers}
            wishlist={wishlist}
            product={product}
            animationDelaySeconds={0.2}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

type ModalContentProps = {
  animationDelaySeconds?: number;
  wishlist: Wishlist;
  product: WishlistProduct;
  sharedUsers: User[];
};

const ModalContent = ({
  animationDelaySeconds,
  wishlist,
  product,
  sharedUsers,
}: ModalContentProps) => {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const { execute } = useAction(markProductReceived, {
    onSuccess: () => router.refresh(),
  });

  return (
    <form
      action={() => {
        execute({
          productId: product.id,
          wishlistId: wishlist.id,
          purchasedByUserId: selectedUserId,
        });
      }}
      className="relative  pt-2"
    >
      <div className="flex flex-col gap-6">
        <div className="flex max-w-[360px] flex-col ">
          <p className="mb-2 text-lg font-medium">
            {" "}
            Marking this item as received will move it{" "}
          </p>
          <span>
            {" "}
            <p className="w-[64px]"> From: </p>
            <p className="line-clamp-1 max-w-[240px] overflow-ellipsis font-bold text-black">
              {" "}
              {wishlist.name}{" "}
            </p>
          </span>
          <span>
            {" "}
            <p className="w-[64px]"> To: </p>
            <p className="font-bold text-black"> My Received Gifts </p>{" "}
          </span>
        </div>
        <motion.div
          key="received"
          initial={{
            translateY: 100,
            rotate: 0,
          }}
          animate={{
            translateY: 0,
            rotate: 9,
          }}
          exit={{
            translateY: 100,
            rotate: 0,
          }}
          transition={{
            delay: animationDelaySeconds,
          }}
          className="absolute bottom-2 right-2"
        >
          <ColoredIconWrapper className="border-dashed  ">
            <PackageOpen strokeWidth={2} size={65} color="black" />
          </ColoredIconWrapper>
        </motion.div>
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-medium">Who got this for you?</h3>
          <ul className="mb-6 flex max-h-[210px] flex-col gap-1 overflow-y-auto rounded-md border-2 border-black p-2">
            {sharedUsers.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedUserId === user.id) {
                      setSelectedUserId(undefined);
                    } else {
                      setSelectedUserId(user.id);
                    }
                  }}
                  className={cn(
                    "flex w-full flex-row items-center gap-2 rounded-md p-2 transition-all ",
                    selectedUserId === user.id
                      ? "bg-green-200 font-medium"
                      : "hover:bg-blue-200",
                  )}
                >
                  <SharedUserThumbnail>
                    {user.image ? (
                      <img src={user.image} />
                    ) : (
                      <div className="h-full w-full bg-green-300"> </div>
                    )}
                  </SharedUserThumbnail>
                  <p className="max-w-[180px] overflow-ellipsis text-center text-lg leading-tight">
                    {user.id === wishlist.createdById ? "You" : user.name}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <SubmitButton className="w-fit">
          {" "}
          {selectedUserId
            ? "Mark item received"
            : "Skip and mark item received"}
        </SubmitButton>{" "}
      </div>
    </form>
  );
};

export default Modal;
