import React from "react";
import { Tooltip } from "./tooltip";
import { Button, type ButtonProps } from "./button";
import { cn } from "~/lib/utils";

type InputButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  button: ButtonProps & {
    tooltip?: string;
  };
};

const InputButton = React.forwardRef<HTMLInputElement, InputButtonProps>(
  ({ className, type, button, ...props }, ref) => {
    const {
      tooltip,
      className: buttonClassName,
      variant: buttonVariant,
      ...buttonProps
    } = button;

    return (
      <div
        className={cn(
          "flex h-10 w-full  rounded-l-md rounded-r-lg border border-black border-r-transparent  focus-within:ring-2 focus-within:ring-ring",
          className,
        )}
      >
        <input
          ref={ref}
          className="flex-1 overflow-ellipsis rounded-md rounded-r-none bg-transparent  p-2 focus-visible:outline-none"
          type="text"
          {...props}
        />
        <Tooltip text={tooltip}>
          <Button
            className={cn(" -mr-0.5 -mt-1 self-end", buttonClassName)}
            variant={buttonVariant}
            type="button"
            {...buttonProps}
          />
        </Tooltip>
      </div>
    );
  },
);

InputButton.displayName = "InputButton";

export default InputButton;
