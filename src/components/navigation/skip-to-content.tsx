import React from "react";
import ButtonLink from "../ui/button-link";

const SkipToContent = () => {
  return (
    <ButtonLink
      href="#main"
      className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[130%] transition-all focus:translate-y-4"
      tabIndex={0}
    >
      Skip to content
    </ButtonLink>
  );
};

export default SkipToContent;
