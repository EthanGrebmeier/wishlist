"use client";

import { SearchIcon, ContactRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import { SearchBar } from "../ui/search-bar";
import { cn, getBackgroundColor } from "~/lib/utils";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { searchWishlistsAndProducts } from "~/server/actions/search";
import { useQuery } from "@tanstack/react-query";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";

const sanitizeSearchQuery = (query: string) => {
  // Remove special characters and brackets, keep alphanumeric, spaces, and basic punctuation
  return query.replace(/[^\w\s.,!?-]/g, "");
};

type SearchPopoverProps = {
  alignPopover?: "start" | "end" | "center";
};

export const SearchPopover = ({
  alignPopover = "start",
}: SearchPopoverProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [debouncedSearch] = useDebounceValue(
    sanitizeSearchQuery(searchQuery),
    300,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => {
    setShowPopover(false);
  });

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchWishlistsAndProducts(debouncedSearch),
    enabled: debouncedSearch.length > 0,
  });

  const hasResults = Boolean(searchResults?.wishlists.length ?? 0 > 0);

  useEffect(() => {
    const showPopover = debouncedSearch.length > 0;
    setShowPopover(showPopover);
  }, [debouncedSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowPopover(false);
      setSearchQuery("");
      return;
    }

    if (e.key === "ArrowDown" && showPopover && resultsRef.current) {
      e.preventDefault();
      const firstFocusable =
        resultsRef.current.querySelector<HTMLElement>("a, button");
      firstFocusable?.focus();
    }

    // Handle Tab key when popover is open
    if (e.key === "Tab" && showPopover) {
      e.preventDefault();
      const firstFocusable =
        resultsRef.current?.querySelector<HTMLElement>("a, button");
      firstFocusable?.focus();
    }
  };

  const handleResultKeyDown = (e: React.KeyboardEvent) => {
    const currentElement = e.currentTarget;
    const allFocusable = Array.from(
      resultsRef.current?.querySelectorAll("a, button") ?? [],
    );
    const currentIndex = allFocusable.indexOf(currentElement as HTMLElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextElement = allFocusable[currentIndex + 1] as HTMLElement;
      if (nextElement) {
        nextElement.focus();
      } else {
        // Loop back to search input if we're at the end
        inputRef.current?.focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentIndex === 0) {
        inputRef.current?.focus();
      } else {
        const prevElement = allFocusable[currentIndex - 1] as HTMLElement;
        prevElement?.focus();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowPopover(false);
      setSearchQuery("");
      inputRef.current?.focus();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        // If Shift+Tab, go to previous or loop to last
        if (currentIndex === 0) {
          const lastElement = allFocusable[
            allFocusable.length - 1
          ] as HTMLElement;
          lastElement?.focus();
        } else {
          const prevElement = allFocusable[currentIndex - 1] as HTMLElement;
          prevElement?.focus();
        }
      } else {
        // If Tab, go to next or loop to search input
        const nextElement = allFocusable[currentIndex + 1] as HTMLElement;
        if (nextElement) {
          nextElement.focus();
        } else {
          inputRef.current?.focus();
        }
      }
    }
  };

  const onLinkClick = () => {
    setShowPopover(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <SearchBar
        ref={inputRef}
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full"
        inputClassName="md:rounded-md rounded-full"
        onKeyDown={handleKeyDown}
        aria-expanded={showPopover}
        aria-controls="search-results"
        aria-haspopup="listbox"
        // role="combobox"
      />
      {showPopover && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-[300px] overflow-hidden rounded-md border-2 border-black bg-background shadow-md",
            alignPopover === "end" && "right-0",
            alignPopover === "center" && "left-1/2 -translate-x-1/2",
            alignPopover === "start" && "left-0",
          )}
        >
          <div
            ref={resultsRef}
            id="search-results"
            role="listbox"
            className="max-h-[300px] overflow-y-auto p-2"
            tabIndex={-1}
          >
            <AnimatePresence mode="wait">
              {debouncedSearch.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-2 text-sm text-muted-foreground"
                >
                  Search for wishlists or products
                </motion.div>
              )}
              {debouncedSearch.length > 0 && !isLoading && !hasResults && (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-2 text-sm text-muted-foreground"
                >
                  No results found
                </motion.div>
              )}
              {isLoading && debouncedSearch.length > 0 && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-2 text-sm text-muted-foreground"
                >
                  Searching...
                </motion.div>
              )}
              {searchResults?.wishlists &&
                searchResults.wishlists.length > 0 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-1"
                  >
                    {searchResults.wishlists.map((wishlist) => (
                      <motion.div key={wishlist.id} className="overflow-hidden">
                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/wishlist/${wishlist.id}`}
                            onClick={onLinkClick}
                            onKeyDown={handleResultKeyDown}
                            className="flex items-center gap-2 rounded-md p-2 hover:bg-secondary focus:bg-secondary focus:outline-none"
                            role="option"
                          >
                            {wishlist.isOwner ? (
                              <div
                                className={cn(
                                  "h-3 w-3 rounded-full border border-black",
                                  getBackgroundColor(wishlist.color),
                                )}
                              />
                            ) : (
                              <ColoredIconWrapper
                                className={cn(
                                  "rounded-sm border bg-white",
                                  getBackgroundColor(wishlist.color),
                                )}
                              >
                                <ContactRound size={12} />
                              </ColoredIconWrapper>
                            )}
                            <span className="font-medium">{wishlist.name}</span>
                          </Link>
                          {wishlist.products.length > 0 && (
                            <div className="ml-5 flex flex-col gap-1 text-sm text-muted-foreground">
                              {wishlist.products.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/product/${product.id}`}
                                  onClick={onLinkClick}
                                  onKeyDown={handleResultKeyDown}
                                  className="block rounded-md px-2 py-1 hover:bg-secondary focus:bg-secondary focus:outline-none"
                                  role="option"
                                >
                                  {product.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
