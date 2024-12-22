"use client";
import { Scroll } from "lucide-react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import TitleBar from "../ui/title-bar";

export const WishlistIndexHeader = () => {
  return (
    <TitleBar
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      wrapperClassName="sticky top-[72px] md:top-0 md:relative"
    >
      <span className="flex items-center justify-center gap-4 pl-2">
        <ColoredIconWrapper>
          <Scroll size="25" />
        </ColoredIconWrapper>
        <TitleBar.Title>Wishlists</TitleBar.Title>{" "}
      </span>
    </TitleBar>
  );
};
