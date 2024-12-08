import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import DatePicker from "../create-wishlist/date-picker";
import { useWishlistSettingsForm } from "./context";
import { CalendarIcon } from "lucide-react";
import { parseISO } from "date-fns";

export default function Calendar() {
  const { form, setFormValues } = useWishlistSettingsForm();
  const dueDate = form.getValues("dueDate");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-medium">Due Date</h3>
          <p className="text-sm tracking-tight">
            Select a date for your wishlist
          </p>
        </div>
        <ColoredIconWrapper className="bg-green-400">
          <CalendarIcon size={30} />
        </ColoredIconWrapper>
      </div>

      <DatePicker
        date={dueDate ? parseISO(dueDate) : undefined}
        setDate={(date) => {
          setFormValues({ dueDate: date?.toISOString() });
        }}
      />
    </div>
  );
}
