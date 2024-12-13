import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "~/lib/utils";
import { Input } from "./input";

type SearchBarProps = {
  onChange: (value: string) => void;
  shouldDebounce?: boolean;
  defaultValue?: string;
  className?: string;
};

export const SearchBar = ({
  onChange,
  shouldDebounce = false,
  defaultValue = "",
  className,
}: SearchBarProps) => {
  const [debouncedValue, setDebouncedValue] = useDebounceValue(
    defaultValue,
    300,
  );

  useEffect(() => {
    if (shouldDebounce) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, shouldDebounce, onChange]);

  return (
    <div className={cn("relative ", className)}>
      <Input
        className="w-full border-2 bg-transparent p-2 pr-8"
        type="text"
        placeholder="Search"
        defaultValue={defaultValue}
        onChange={(e) => {
          if (shouldDebounce) {
            setDebouncedValue(e.target.value);
          } else {
            onChange(e.target.value);
          }
        }}
      />
      <SearchIcon
        size={24}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
