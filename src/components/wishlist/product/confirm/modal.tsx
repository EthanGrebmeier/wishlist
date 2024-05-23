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
import type {
  Wishlist,
  WishlistProduct,
  WishlistShares,
  WishlistSharesWithUser,
} from "~/types/wishlist";
import { AnimatePresence, motion } from "framer-motion";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { ArrowRight, Check, Gift, PackageOpen, Scroll } from "lucide-react";
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
import SharedUserThumbnail from "../../share-wishlist/shared-users/shared-user-thumbnail";
import { cn, getBackgroundColor } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/ui/submit-button";
import MockCard from "~/components/home/mock-card";

type ModalProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  wishlistShares: WishlistSharesWithUser[];
};

const Modal = ({ wishlist, wishlistShares, product }: ModalProps) => {
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
        <DialogContent className="max-w-[480px] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="font-serif text-4xl font-medium">
              Mark item as received
            </DialogTitle>
          </DialogHeader>
          <ModalContent
            wishlistShares={wishlistShares}
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
      <DrawerContent className="mx-auto max-w-[480px] overflow-hidden">
        <DrawerHeader className="text-start">
          <DrawerTitle className="text-balance font-serif text-4xl font-medium">
            Have you received this item?
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[80svh] overflow-y-auto p-4">
          <ModalContent
            wishlistShares={wishlistShares}
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
  wishlistShares: WishlistSharesWithUser[];
};

const ModalContent = ({
  animationDelaySeconds,
  wishlist,
  product,
  wishlistShares,
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
        <div className="flex flex-col ">
          <p className="mb-6 text-xl font-medium">
            {" "}
            Marking this item as received will move it{" "}
          </p>
          <div className="grid grid-cols-[1fr_auto_1fr] flex-row flex-nowrap items-center gap-2">
            <div>
              <p className="mb-2 text-xl font-medium "> From: </p>
              <MockCard
                title={wishlist.name}
                color={getBackgroundColor(wishlist.color) ?? "bg-white"}
              >
                {wishlist.imageUrl ? (
                  <img
                    src={wishlist.imageUrl}
                    className="w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-green-100">
                    {" "}
                    <Scroll size={50} />{" "}
                  </div>
                )}
              </MockCard>
            </div>
            <ArrowRight className="animate-pulse" size={40} />

            <div>
              <p className="mb-2 text-xl font-medium "> To: </p>

              <MockCard
                title="My Gifts"
                color={getBackgroundColor("pink") ?? "bg-white"}
              >
                <div className="flex h-full w-full items-center justify-center bg-green-100">
                  {" "}
                  <Gift size={50} />{" "}
                </div>
              </MockCard>
            </div>
          </div>
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
          <h3 className="text-lg font-medium">Who got this for you?</h3>
          <p className="mb-4 text-balance text-sm tracking-tight">
            Select a user from the list below to credit them for the item
          </p>
          <ul className="mb-6 flex max-h-[210px] flex-col gap-1 overflow-y-auto rounded-md border-2 border-black p-2">
            {wishlistShares.map(({ users: user }) => (
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
                    "flex w-full flex-row items-center justify-between gap-2 rounded-md p-2 transition-all ",
                    selectedUserId === user.id
                      ? "bg-green-200 font-medium"
                      : "hover:bg-blue-200",
                  )}
                >
                  <div className="flex items-center gap-2">
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
                  </div>
                  {selectedUserId === user.id && <Check size={20} />}
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
