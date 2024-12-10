"use client";

import { BookUserIcon } from "lucide-react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import TitleBar from "../ui/title-bar";

export const CommitmentsTitleBar = () => {
  return (
    <TitleBar>
      <div className="flex items-center gap-2">
        <ColoredIconWrapper className="bg-blue-300">
          <BookUserIcon size={24} />
        </ColoredIconWrapper>
        <TitleBar.Title>My Commitments</TitleBar.Title>
      </div>
    </TitleBar>
  );
};
