"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [wasJustPressed, setWasJustPressed] = useState(false);

  useEffect(() => {
    if (wasJustPressed) {
      const timeout = setTimeout(() => {
        setWasJustPressed(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [wasJustPressed]);

  return (
    <Button
      icon={
        wasJustPressed ? <ClipboardCheck size={20} /> : <Clipboard size={20} />
      }
      onClick={async () => {
        setWasJustPressed(true);
        await navigator.clipboard.writeText(textToCopy);
      }}
      className="w-[180px]"
    >
      {wasJustPressed ? "Copied" : "Copy"}
    </Button>
  );
};

export default CopyButton;
