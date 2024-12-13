"use client";

import { BookUserIcon } from "lucide-react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import TitleBar from "../ui/title-bar";
import { SearchBar } from "../ui/search-bar";
import { useSearchParams, useRouter } from "next/navigation";

export const CommitmentsTitleBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`/my-commitments?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <TitleBar className="py-2  sm:py-0 ">
        <div className="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <ColoredIconWrapper className="bg-blue-300">
              <BookUserIcon size={24} />
            </ColoredIconWrapper>
            <TitleBar.Title>My Commitments</TitleBar.Title>
          </div>
        </div>
      </TitleBar>
      <div className="flex w-full items-center gap-2">
        <SearchBar
          className="flex-1 "
          onChange={setSearch}
          shouldDebounce={true}
          defaultValue={searchParams.get("search") ?? ""}
        />
      </div>
    </div>
  );
};
