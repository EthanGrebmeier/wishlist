import React from "react";
import ButtonLink from "../ui/button-link";

const SkipToContent = () => {
  return (
    <ButtonLink
      href="#main"
      className="absolute left-4 top-0 z-20 w-[240px] -translate-y-[230%] transition-all focus:translate-y-4"
      tabIndex={0}
    >
      Skip to content
    </ButtonLink>
  );
};

export default SkipToContent;
