"use client";

import { type ChangeEvent, useState } from "react";
import { z } from "zod";

type IncrementorProps = {
  onQuantityChange: (value: number) => void;
  value: number;
};

const Incrementor = ({ onQuantityChange, value }: IncrementorProps) => {
  const [internalTextValue, setInternalTextValue] = useState<null | string>(
    null,
  );

  const increment = () => {
    onQuantityChange(value + 1);
  };

  const decrement = () => {
    if (value - 1 > 0) {
      onQuantityChange(value - 1);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalTextValue(e.target.value);
  };

  const onFocus = () => {
    if (value) {
      setInternalTextValue(`${value}`);
    } else {
      setInternalTextValue("");
    }
  };

  const onBlur = () => {
    if (internalTextValue) {
      try {
        const value = z.coerce.number().positive().parse(internalTextValue);
        onQuantityChange(value || 1);
      } catch {}
    }

    setInternalTextValue(null);
  };

  return (
    <div className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-black px-2">
      <button
        className="rounded-md px-4 text-2xl transition-colors hover:bg-red-200 disabled:hover:bg-transparent"
        type="button"
        onClick={decrement}
        disabled={value - 1 <= 0}
      >
        -
      </button>
      <input
        name="quantity"
        className="w-full bg-transparent text-center text-lg tabular-nums"
        value={internalTextValue ?? value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        className="rounded-md px-4 text-2xl transition-colors hover:bg-green-200"
        type="button"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default Incrementor;
