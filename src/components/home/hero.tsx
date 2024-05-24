"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Gift, BookUser, UserCircle, Scroll, Package } from "lucide-react";

import React from "react";
import Logo from "../navigation/logo";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import ButtonLink from "../ui/button-link";
import FlyingIcon from "./flying-icon";

const Hero = () => {
  const shouldNotAnimate = useReducedMotion();

  return (
    <div className=" flex min-h-[calc(100svh-240px)] w-full flex-col items-center justify-center pt-24">
      <div className="relative flex h-fit w-fit flex-col items-center justify-center ">
        <FlyingIcon
          animate={{
            top: "-136px",
            left: "-24px",
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
            right: "-28px",
            bottom: "-128px",
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
            left: "-20px",
            bottom: "-98px",
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
            Welcome to<span className="sr-only">fillaneed</span>
          </h1>
          <Logo ariaHidden={true} className="pt-0" size="large" />
        </div>
        <div className="mt-4 flex flex-col items-center gap-6 px-4">
          <p className="text-balance text-center text-xl md:text-2xl">
            A place for you to build and share wishlists!
          </p>
          <ButtonLink
            icon={<UserCircle size={20} />}
            href="/auth/sign-in"
            className="w-fit"
          >
            Sign In
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
