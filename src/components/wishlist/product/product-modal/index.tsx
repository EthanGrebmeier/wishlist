"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import { isProductViewOpenAtom, productToViewAtom } from "~/store/product-view";
import { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import PlaceholderImage from "../placeholder-image";
import Commit from "../commit";
import { getSession } from "next-auth/react";
import { Session, User } from "next-auth";


export default function ProductModal({session}: {session: Session | null}) {
  const [isOpen, setIsOpen] = useAtom(isProductViewOpenAtom);
  const [product, setProductToView] = useAtom(productToViewAtom);

  const toggleOpen = () => {
    if (isOpen) {
      setProductToView(null);
    }
    setIsOpen(!isOpen);
  }

  if (!session) {
    return null;
  }

  return <ResponsiveSheet
  setIsOpen={setIsOpen}
  title={"Product"}
  isOpen={isOpen}

    >
      {product && <Content user={session.user} product={product} />}
    </ResponsiveSheet>
}

const Content = ({user, product}: {user: User, product: WishlistProductWithCommitmentsWithUser}) => {

  const hasUserCommitted = product.commitments.some(commitment => commitment.user.id === user?.id);
  return <div className="py-4 flex flex-col gap-4">
  <div className="relative h-[300px] w-full rounded-md border border-black overflow-hidden">
   {product.imageUrl ? (
     <Image
       src={product.imageUrl}
       alt={product.name}
       fill
       className="object-contain"
     />
   ) : (
     <PlaceholderImage className="relative flex h-full w-full items-center justify-center overflow-hidden " />
   )}
 </div>
   <div className="flex flex-col gap-2">
     <h2 className="text-2xl font-serif text-balance">{product.name}</h2>
    <div>
      <p className="font-serif text-xl"> About this product</p>
    <p className="text-base leading-tight text-pretty">{product.description}</p>
    </div>
   </div>
 <Commit product={product} hasUserCommitted={hasUserCommitted}  />
 </div>
}