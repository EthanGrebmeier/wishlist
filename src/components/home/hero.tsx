"use client";
import { Gift, BookUser, UserCircle, Package, ScrollText } from "lucide-react";

import React from "react";
import Logo from "../navigation/logo";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import ButtonLink from "../ui/button-link";
import FlyingIcon from "./flying-icon";

const Hero = () => {
  return (
    <div className="relative flex min-h-[calc(100svh-340px)] w-full flex-col items-center justify-center pt-24 ">
      <div className=" flex h-fit w-fit flex-col items-center justify-center ">
        <FlyingIcon
          animate={{
            top: "23%",
            left: "22%",
            rotate: -382,
            opacity: 1,
          }}
        >
          <ColoredIconWrapper className=" bg-yellow-300">
            <BookUser size={65} />
          </ColoredIconWrapper>
        </FlyingIcon>
        <FlyingIcon
          animate={{
            right: "22%",
            bottom: "30%",
            rotate: 372,
            opacity: 1,
          }}
        >
          <ColoredIconWrapper className=" bg-pink-300">
            <Gift size={65} />
          </ColoredIconWrapper>
        </FlyingIcon>
        <FlyingIcon
          animate={{
            left: "25%",
            bottom: "14%",
            rotate: 352,
            opacity: 1,
          }}
        >
          <ColoredIconWrapper className="bg-blue-400">
            <Package size={65} />
          </ColoredIconWrapper>
        </FlyingIcon>
        <div className="z-10 flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <h1 className="font-serif text-5xl md:text-7xl">
            <span className="sr-only">fillaneed</span>
          </h1>
          <Logo ariaHidden={true} className="pt-0" size="large" />
        </div>
        <div className="flex flex-col items-center gap-6 px-4">
          <p className="text-balance text-center text-xl md:text-2xl font-serif">
            Create your dream wishlist
          </p>
          <ButtonLink
            icon={<ScrollText size={20} />}
            href="/auth/sign-in"
            className="w-fit"
          >
            Get Started
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
