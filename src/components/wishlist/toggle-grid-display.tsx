"use client";
import { useAtom } from "jotai";
import React from "react";
import { gridDisplayAtom } from "~/store/grid-display";
import { Button } from "../ui/button";
import { Grid, Rows3 } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const ToggleGridDisplay = () => {
  const [gridDisplay, setGridDisplay] = useAtom(gridDisplayAtom);

  return (
    <Tooltip text={gridDisplay === "grid" ? "List View" : "Grid View"}>
      <Button
        onClick={() => setGridDisplay(gridDisplay === "grid" ? "list" : "grid")}
      >
        {gridDisplay === "grid" ? <Rows3 size={25} /> : <Grid size={25} />}
      </Button>
    </Tooltip>
  );
};

export default ToggleGridDisplay;
