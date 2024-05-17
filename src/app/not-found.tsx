import React from "react";

const MagicLinkNotFound = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-xl font-sans font-medium">
        {" "}
        The provided link is either expired or invalid
      </p>
    </div>
  );
};

export default MagicLinkNotFound;
