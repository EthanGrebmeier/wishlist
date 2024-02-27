"use client";
import { useRef } from "react";

const Logo = () => {
  const logoRef = useRef(null);
  return (
    <div ref={logoRef} className="mb-8  ">
      <p className="px-8 pb-4 text-4xl font-medium"> Wishlist </p>
    </div>
  );
};

export default Logo;
