import React from "react";
import AnimatedPackage from "./animated-package";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { Gift } from "lucide-react";

const ConfirmedReceipt = () => {
  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-md border-2 border-black px-4 py-6 md:w-1/2 lg:w-full">
      <p className=" font-serif text-2xl font-medium leading-tight">
        This item is all yours!
      </p>
      <AnimatedPackage
        icon={
          <ColoredIconWrapper className="bg-pink-300">
            <Gift size={45} />
          </ColoredIconWrapper>
        }
      />
    </div>
  );
};

export default ConfirmedReceipt;
