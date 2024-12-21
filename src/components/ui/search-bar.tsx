import { SearchIcon, XIcon } from "lucide-react";
import { forwardRef, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "~/lib/utils";
import { Input } from "./input";

type SearchBarProps = {
  onChange: (value: string) => void;
  shouldDebounce?: boolean;
  defaultValue?: string;
  value?: string;
  className?: string;
  inputClassName?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
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
    },
    ref,
  ) => {
    const [debouncedValue, setDebouncedValue] = useDebounceValue(
      defaultValue,
      300,
    );

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

    const showClearButton =
      value !== undefined ? value.length > 0 : defaultValue.length > 0;

    return (
      <div className={cn("relative ", className)}>
        <Input
          ref={ref}
          className={cn(
            "w-full overflow-ellipsis border-2 bg-background p-2 pr-7",
            inputClassName,
          )}
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => {
            if (shouldDebounce) {
              setDebouncedValue(e.target.value);
            } else {
              onChange(e.target.value);
            }
          }}
          onKeyDown={onKeyDown}
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {showClearButton ? (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-sm p-1 hover:bg-secondary"
            >
              <XIcon size={16} className="text-muted-foreground" />
            </button>
          ) : (
            <SearchIcon size={20} className="text-muted-foreground" />
          )}
        </div>
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
