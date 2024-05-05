import { Scroll } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";

const Logo = () => {
  return (
    // <Image
    //   src={"/fillaneed-logo-1.png"}
    //   alt="Fillaneed"
    //   height={80}
    //   width={140}
    // />
    <div className="flex items-center gap-4 pt-4">
      <p className="mt-2 font-serif text-4xl font-medium">Fillaneed</p>

      <ColoredIconWrapper>
        <Scroll size="25" />
      </ColoredIconWrapper>
    </div>
  );
};

export default Logo;
