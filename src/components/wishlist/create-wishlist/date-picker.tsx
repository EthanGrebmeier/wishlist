"use client";

import { startOfMonth } from "date-fns";
import React from "react";

import { Calendar } from "~/components/ui/calendar";

type DatePickerProps = {
  date?: Date;
  setDate: (date: Date | undefined) => void;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <Calendar
      defaultMonth={date ? startOfMonth(date) : undefined}
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  );
};

export default DatePicker;
