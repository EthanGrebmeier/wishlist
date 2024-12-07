"use client";

import { useAtom } from "jotai";
import { gridDisplayAtom } from "~/store/grid-display";
import { cn } from "~/lib/utils";

type ListViewProps = {
  children?: React.ReactNode;
};

const ListView = ({ children }: ListViewProps) => {
  const [gridDisplay] = useAtom(gridDisplayAtom);

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-4  sm:grid-cols-3 xl:grid-cols-3",
        gridDisplay === "grid" ? " grid-cols-2" : " grid-cols-1",
      )}
    >
      {children}
    </ul>
  );
};

export default ListView;
