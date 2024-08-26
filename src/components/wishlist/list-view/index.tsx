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
        "grid grid-cols-2 gap-4 px-2 py-4 sm:grid-cols-3 md:px-6 xl:grid-cols-4",
        gridDisplay === "grid" ? " grid-cols-2" : " grid-cols-1",
      )}
    >
      {children}
    </ul>
  );
};

export default ListView;
