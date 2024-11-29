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
  setDate: (date: Date | undefined) => void;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
};

export default DatePicker;
