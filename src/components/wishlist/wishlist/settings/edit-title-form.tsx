import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { SubmitButton } from "~/components/ui/submit-button";
import { updateTitle } from "~/server/actions/wishlist";

const editTitleInputSchema = z.object({
  title: z.string(),
});

type EditTitleFormProps = {
  wishlistId: string;
  onSuccess?: () => void;
  defaultValue?: string;
};

const EditTitleForm = ({
  wishlistId,
  onSuccess,
  defaultValue,
}: EditTitleFormProps) => {
  const { execute } = useAction(updateTitle, { onSuccess });

  const form = useForm<z.infer<typeof editTitleInputSchema>>({
    resolver: zodResolver(editTitleInputSchema),
    defaultValues: {
      title: defaultValue ?? "",
    },
  });

  const formValues = form.watch();

  return (
    <Form {...form}>
      <form
        onSubmit={() => form.trigger()}
        action={() => {
          execute({
            title: formValues.title,
            wishlistId,
          });
        }}
        className="space-y-4 px-4 "
      >
        <FormField
          name="title"
          render={({ field }) => (
            <div>
              <FormItem className="max-w-[320px]">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <SubmitButton
          icon={<Pencil size={20} />}
          className="absolute bottom-5 right-6"
        />
      </form>
    </Form>
  );
};

export default EditTitleForm;
