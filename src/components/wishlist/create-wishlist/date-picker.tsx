"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React, { type Dispatch, type SetStateAction } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";

type DatePickerProps = {
  date?: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date-picker"
          variant={"outline"}
          className={cn(
            "flex w-full items-center justify-center border text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
