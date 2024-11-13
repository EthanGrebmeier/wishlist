import { zodResolver } from "@hookform/resolvers/zod";
import {
  BanknoteIcon,
  CalculatorIcon,
  ChartColumnIncreasing,
  ClipboardIcon,
  FilePlus,
  LoaderCircleIcon,
  SquarePenIcon,
  StoreIcon,
} from "lucide-react";
import { type HookActionStatus, useAction } from "next-safe-action/hooks";
import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "~/components/ui/form";
import { generateId } from "~/lib/utils";
import { productInputSchema } from "~/schema/wishlist/product";
import { updateProduct } from "~/server/actions/product";
import {
  HorizontalInputWrapper,
  HorizontalTextInput,
  VerticalInputWrapper,
} from "./product-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { isProductFormOpenAtom, productToEditAtom } from "~/store/product-form";
import StatusButton from "~/components/ui/status-button";

const ProductForm = () => {
  const { form, handleSubmit } = useProductForm();

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col gap-2"
        action={handleSubmit}
        onSubmit={async (e) => {
          e.preventDefault();
          await form.trigger();
        }}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <HorizontalInputWrapper
              required
              Icon={SquarePenIcon}
              label="Name"
              input={
                <HorizontalTextInput
                  autoFocus
                  placeholder="Cool Mug"
                  {...field}
                />
              }
            />
          )}
        />
        <FormField
          name="brand"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={StoreIcon}
              label="Brand"
              input={<HorizontalTextInput placeholder="Acme Inc" {...field} />}
            />
          )}
        />
        <FormField
          name="price"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={BanknoteIcon}
              label="Price"
              input={<HorizontalTextInput placeholder="$20" {...field} />}
            />
          )}
        />
        <FormField
          name="quantity"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={CalculatorIcon}
              required
              label="Quantity"
              input={<HorizontalTextInput placeholder="1" {...field} />}
            />
          )}
        />
        <FormField
          name="priority"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={ChartColumnIncreasing}
              label="Priority"
              input={
                <Select
                  onValueChange={field.onChange}
                  defaultValue={z.string().parse(field.value)}
                >
                  <SelectTrigger className="h-8 border-none p-1">
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="focus:bg-red-200" value="low">
                      Low
                    </SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem className="focus:bg-yellow-200" value="high">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              }
            />
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <VerticalInputWrapper
              Icon={ClipboardIcon}
              label="Description"
              input={
                <Textarea {...field} className="w-full flex-1 resize-none" />
              }
            />
          )}
        />
      </form>
    </Form>
  );
};

export const ProductFormFooter = () => {
  const { handleSubmit, isEditing, status } = useProductForm();

  return (
    <div className="flex w-full justify-end">
      <StatusButton
        onClick={handleSubmit}
        status={status}
        content={{
          text: isEditing ? "Update Product" : "Add Product",
          Icon: FilePlus,
        }}
        loadingContent={{
          text: "Adding Product...",
          Icon: LoaderCircleIcon,
          shouldSpin: true,
        }}
        hasSucceededContent={{
          text: "Success!",
          Icon: FilePlus,
        }}
      />
    </div>
  );
};

type ProductFormContextType = {
  form: UseFormReturn<z.infer<typeof productInputSchema>>;
  formError: string;
  isEditing: boolean;
  setFormError: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
  setFormValues: (values: z.infer<typeof productInputSchema>) => void;
  setImageUrl: (imageUrl: string) => void;
  frame: ProductInputFrame;
  setFrame: Dispatch<SetStateAction<ProductInputFrame>>;
  resetProductForm: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  status: HookActionStatus;
};

const ProductFormContext = createContext<ProductFormContextType | null>(null);

type ProductFormProviderProps = {
  children: React.ReactNode;
  wishlistId: string;
};

export type ProductInputFrame = "form" | "autofill" | "image";

export const ProductFormProvider = ({
  children,
  wishlistId,
}: ProductFormProviderProps) => {
  const [isOpen, setIsOpen] = useAtom(isProductFormOpenAtom);
  const [productToEdit, setProductToEdit] = useAtom(productToEditAtom);
  const [frame, setFrame] = useState<ProductInputFrame>("form");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const isEditing = Boolean(productToEdit);

  const form = useForm<z.infer<typeof productInputSchema>>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: productToEdit?.name ?? "",
      description: productToEdit?.description ?? "",
      brand: productToEdit?.brand ?? "",
      quantity: productToEdit?.quantity ?? "1",
      price: productToEdit?.price ?? "",
      url: productToEdit?.url ?? "",
      priority: productToEdit?.priority ?? "normal",
    },
  });

  const { execute: executeUpdate, status } = useAction(updateProduct, {
    onError: (error) => {
      setFormError("Error updating product");
    },
    onSuccess: () => {
      resetProductForm();
      router.refresh();
    },
  });

  const handleSubmit = () => {
    const values = form.getValues();
    executeUpdate({
      ...values,
      id: productToEdit?.id ?? generateId(),
      wishlistId,
    });
  };

  const setFormValues = useCallback(
    (values: z.infer<typeof productInputSchema>) => {
      form.setValue("name", values.name ?? "");
      form.setValue("description", values.description ?? "");
      form.setValue("brand", values.brand ?? "");
      form.setValue("quantity", values.quantity ?? "1");
      form.setValue("price", values.price ?? "");
      form.setValue("url", values.url ?? "");
      form.setValue("imageUrl", values.imageUrl ?? "");
      form.setValue("priority", values.priority ?? "");
    },
    [form],
  );

  useEffect(() => {
    if (productToEdit) {
      setFormValues(productToEdit);
    }
  }, [productToEdit, setFormValues]);

  const setImageUrl = (imageUrl: string) => {
    form.setValue("imageUrl", imageUrl);
  };

  const resetProductForm = () => {
    form.reset();
    setFrame("form");
    setIsOpen(false);
    setProductToEdit(undefined);
  };

  return (
    <ProductFormContext.Provider
      value={{
        form,
        handleSubmit,
        formError,
        setFormError,
        setFormValues,
        frame,
        setFrame,
        isEditing,
        setImageUrl,
        resetProductForm,
        isOpen,
        setIsOpen,
        status,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  );
};

export const useProductForm = () => {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error("useProductForm must be used within a ProductFormProvider");
  }
  return context;
};

export default ProductForm;
