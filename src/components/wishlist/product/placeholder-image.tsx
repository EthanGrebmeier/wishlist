import { Gift } from "lucide-react";
import React from "react";

const PlaceholderImage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-green-100">
      {" "}
      <Gift size={50} />{" "}
    </div>
  );
};

export default PlaceholderImage;
