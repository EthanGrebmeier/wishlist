"use client";

import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import type { Wishlist } from "~/types/wishlist";
import WishlistSettingsContent from "./edit-wishlist-content";
import { Button } from "~/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useRouter } from "next/navigation";
import { CreateWishlistForm } from "../../create-wishlist";
import WishlistSettingsSheet from "../../wishlist-settings";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";
import { useAtom } from "jotai";

const WishlistSettings = () => {
  const [isWishlistSettingsOpen, setIsWishlistSettingsOpen] = useAtom(
    isWishlistSettingsOpenAtom,
  );

  return (
    <>
      <Button variant="outline" onClick={() => setIsWishlistSettingsOpen(true)}>
        Create Wishlist
      </Button>
      <WishlistSettingsSheet />
    </>
  );
};

export default WishlistSettings;
