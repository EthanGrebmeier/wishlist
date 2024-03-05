import { Sparkles } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "~/components/ui/button";

type FrameSelectButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const FrameSelectButton = ({ onClick, children }: FrameSelectButtonProps) => (
  <Button
    variant="outline"
    onClick={onClick}
    className="flex items-center justify-center gap-4 rounded-md"
  >
    {children}
  </Button>
);

type FrameSelectProps = {
  setFrame: Dispatch<SetStateAction<"init" | "scrape" | "form">>;
};

const FrameSelect = ({ setFrame }: FrameSelectProps) => {
  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <FrameSelectButton onClick={() => setFrame("scrape")}>
        <Sparkles width={20} height={20} /> Autofill Product Data
      </FrameSelectButton>
      <p> or </p>
      <FrameSelectButton onClick={() => setFrame("form")}>
        Input product data
      </FrameSelectButton>
    </div>
  );
};

export default FrameSelect;
