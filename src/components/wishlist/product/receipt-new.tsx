import { Button } from "~/components/ui/button";


export default function ReceiptNew() {
  return <div className="border-2 border-black rounded-md  w-full h-fit">
    <div className="flex flex-col gap-2 p-4">
    <p className="font-medium text-lg">Received this item?</p>
      <p className="text-sm leading-tight tracking-normal">Marking an item as received lets others know you have it</p>
      <Button >Mark as Received</Button>

    </div>
  </div>
}
