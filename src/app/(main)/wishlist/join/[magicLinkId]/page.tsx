"use client";

import React, { useEffect } from "react";
import Loading from "~/components/wishlist/wishlist/loading";
import { joinWishlistViaMagicLink } from "~/server/actions/wishlist";

type WishlistJoinPageProps = {
  params: {
    magicLinkId: string;
  };
};

const Page = ({ params }: WishlistJoinPageProps) => {
  useEffect(() => {
    const joinWishlist = async () => {
      await joinWishlistViaMagicLink({
        magicLinkId: params.magicLinkId,
      });
    };

    void joinWishlist();
  }, [params.magicLinkId]);

  return <Loading />;
};

export default Page;
