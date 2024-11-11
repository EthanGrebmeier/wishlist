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
import {
  ArrowRight,
  Check,
  Gift,
  PackageCheck,
  PackageOpen,
  Scroll,
} from "lucide-react";
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
import { type Session } from "next-auth";
import Image from "next/image";

type ModalProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
};

const Modal = ({ wishlist, wishlistShares, product, session }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button icon={<PackageCheck size={25} />}> </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[480px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-4xl font-medium">
              Received this item?
            </DialogTitle>
          </DialogHeader>
          <ModalContent
            session={session}
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
        <Button icon={<PackageCheck size={25} />} className="h-fit w-fit">
          {" "}
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
            session={session}
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
  session: Session;
  animationDelaySeconds?: number;
  wishlist: Wishlist;
  product: WishlistProduct;
  wishlistShares: WishlistSharesWithUser[];
};

const ModalContent = ({
  session,
  animationDelaySeconds,
  wishlist,
  product,
  wishlistShares,
}: ModalContentProps) => {
  const [frame, setFrame] = useState<"attribute" | "confirm">("attribute");
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const { execute } = useAction(markProductReceived, {
    onSuccess: () => router.refresh(),
  });

  if (frame === "confirm") {
    return (
      <form
        action={() => {
          execute({
            productId: product.id,
            wishlistId: wishlist.id,
            purchasedByUserId: selectedUserId,
          });
        }}
        className="relative  overflow-hidden pt-2"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col ">
            <p className="mb-6 text-xl">
              {" "}
              Marking this item as received will move it{" "}
            </p>
            <div className="grid grid-cols-[1fr_auto_1fr] flex-row flex-nowrap items-center gap-2">
              <div>
                <p className="mb-2 text-xl font-medium "> From: </p>
                <MockCard
                  className="relative"
                  title={wishlist.name}
                  color={getBackgroundColor(wishlist.color) ?? "bg-white"}
                >
                  {wishlist.imageUrl ? (
                    <Image
                      alt={wishlist.name}
                      fill
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
          <div className="flex w-full items-start justify-between">
            <Button variant="secondary" onClick={() => setFrame("attribute")}>
              Back
            </Button>
            <SubmitButton className="w-fit">Confirm</SubmitButton>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="flex w-full flex-col ">
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
        className="absolute bottom-4 left-4"
      >
        <ColoredIconWrapper className="border-dashed  ">
          <PackageOpen strokeWidth={2} size={50} color="black" />
        </ColoredIconWrapper>
      </motion.div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Who got this for you?</h3>
        <p className="mb-4 text-balance text-sm tracking-tight">
          Select a user from the list below to credit them for the item
        </p>
        <ul className="mb-6 flex max-h-[210px] flex-col gap-1 overflow-y-auto rounded-md border-2 border-black p-2">
          {wishlistShares.map(({ users: sharedUser }) => (
            <li key={sharedUser.id}>
              <button
                type="button"
                onClick={() => {
                  if (selectedUserId === sharedUser.id) {
                    setSelectedUserId(undefined);
                  } else {
                    setSelectedUserId(sharedUser.id);
                  }
                }}
                className={cn(
                  "flex w-full flex-row items-center justify-between gap-2 rounded-md p-2 transition-all ",
                  selectedUserId === sharedUser.id
                    ? "bg-green-200 font-medium"
                    : "hover:bg-blue-200",
                )}
              >
                <div className="flex items-center gap-2">
                  <SharedUserThumbnail className="relative">
                    {sharedUser.image ? (
                      <Image
                        alt={sharedUser.name ?? ""}
                        fill
                        src={sharedUser.image}
                      />
                    ) : (
                      <div className="h-full w-full bg-green-300"> </div>
                    )}
                  </SharedUserThumbnail>
                  <p className="max-w-[180px] overflow-ellipsis text-center text-lg leading-tight">
                    {sharedUser.id === session.user.id
                      ? "You"
                      : sharedUser.name}
                  </p>
                </div>
                {selectedUserId === sharedUser.id && <Check size={20} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => {
          setFrame("confirm");
        }}
        className=" w-fit self-end "
      >
        {" "}
        {selectedUserId ? "Mark item received" : "Skip and mark item received"}
      </Button>{" "}
    </div>
  );
};

export default Modal;
