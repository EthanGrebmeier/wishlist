import { SearchIcon, XIcon } from "lucide-react";
import { forwardRef, useEffect, useState, useRef } from "react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "~/lib/utils";
import { Input } from "./input";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { ShortcutIndicator } from "./shortcut-indicator";

type SearchBarProps = {
  onChange: (value: string) => void;
  shouldDebounce?: boolean;
  defaultValue?: string;
  value?: string;
  className?: string;
  inputClassName?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  showShortcut?: boolean;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      onChange,
      shouldDebounce = false,
      defaultValue = "",
      value,
      className,
      inputClassName,
      onKeyDown,
      placeholder = "Search",
      showShortcut = false,
    },
    ref,
  ) => {
    const [debouncedValue, setDebouncedValue] = useDebounceValue(
      defaultValue,
      300,
    );
    const [isFocused, setIsFocused] = useState(false);
    const clearButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (shouldDebounce) {
        onChange(debouncedValue);
      }
    }, [debouncedValue, shouldDebounce, onChange]);

    const handleClear = () => {
      if (shouldDebounce) {
        setDebouncedValue("");
      } else {
        onChange("");
      }
      if (ref && "current" in ref && ref.current) {
        ref.current.value = "";
        ref.current.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey && showClearButton) {
        e.preventDefault();
        clearButtonRef.current?.focus();
        return;
      }
      onKeyDown?.(e);
    };

    const showClearButton =
      value !== undefined ? value.length > 0 : defaultValue.length > 0;

    return (
      <div className={cn("relative ", className)}>
        <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
          <SearchIcon size={16} className="text-black" />
        </div>
        <Input
          ref={ref}
          className={cn(
            "w-full overflow-ellipsis border-2 bg-background pl-8 pr-8",
            inputClassName,
          )}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (shouldDebounce) {
              setDebouncedValue(e.target.value);
            } else {
              onChange(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <AnimatePresence initial={false} mode="wait">
            {showShortcut && !isFocused && <ShortcutIndicator />}
          </AnimatePresence>
          <AnimatePresence initial={false} mode="wait">
            {showClearButton ? (
              <motion.button
                ref={clearButtonRef}
                key="clear"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
                type="button"
                onClick={handleClear}
                className="clear-button rounded-sm p-1 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-black"
                onKeyDown={(e) => {
                  if (e.key === "Tab" && !e.shiftKey) {
                    e.stopPropagation();
                  }
                }}
              >
                <XIcon size={16} className="text-black" />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
