import { zodResolver } from "@hookform/resolvers/zod";
import {
  BanknoteIcon,
  CalculatorIcon,
  ChartColumnIncreasing,
  ClipboardIcon,
  FilePlus,
  ImageIcon,
  SquarePenIcon,
  StoreIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "~/components/ui/form";
import { generateId } from "~/lib/utils";
import { productInputSchema } from "~/schema/wishlist/product";
import type { partialCompiledProductDataSchema } from "~/schema/wishlist/scrape";
import { updateProduct } from "~/server/actions/product";
import type { WishlistProduct } from "~/types/wishlist";
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
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

type AddProductFormProps = {
  wishlistId: string;
  onSuccess?: () => void;
  defaultValues?: z.infer<typeof partialCompiledProductDataSchema>;
  product?: WishlistProduct;
  imageUrl?: string;
  frame: "form" | "image" | "autofill";
  setFrame?: Dispatch<SetStateAction<"form" | "image" | "autofill">>;
};

const ProductForm = () => {
  const { form, handleSubmit } = useProductForm();

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col gap-2"
        action={handleSubmit}
        onSubmit={() => form.trigger()}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <HorizontalInputWrapper
              required
              Icon={SquarePenIcon}
              label="Name"
              input={<HorizontalTextInput placeholder="Cool Mug" {...field} />}
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
  const { handleSubmit, isEditing } = useProductForm();

  return (
    <div className="flex w-full justify-end">
      <Button onClick={handleSubmit} icon={<FilePlus size={15} />}>
        {isEditing ? "Update Product" : "Add Product"}
      </Button>
    </div>
  );
};

type ProductFormContextType = {
  form: UseFormReturn<z.infer<typeof productInputSchema>>;
  formError: string;
  isEditing: boolean;
  setFormError: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
  setFormValues: (
    values: z.infer<typeof partialCompiledProductDataSchema>,
  ) => void;
  setImageUrl: (imageUrl: string) => void;
  frame: ProductInputFrame;
  setFrame: Dispatch<SetStateAction<ProductInputFrame>>;
};

const ProductFormContext = createContext<ProductFormContextType | null>(null);

type ProductFormProviderProps = {
  children: React.ReactNode;
  product?: WishlistProduct;
  wishlistId: string;
  defaultValues?: z.infer<typeof partialCompiledProductDataSchema>;
  isEditing: boolean;
};

export type ProductInputFrame = "form" | "autofill" | "image";

export const ProductFormProvider = ({
  children,
  product,
  wishlistId,
  defaultValues,
  isEditing,
}: ProductFormProviderProps) => {
  const [frame, setFrame] = useState<ProductInputFrame>("form");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof productInputSchema>>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      brand: defaultValues?.brand ?? "",
      quantity: defaultValues?.quantity ?? "1",
      price: defaultValues?.price ?? "",
      url: defaultValues?.url ?? "",
      priority: product?.priority ?? "normal",
    },
  });

  const { execute: executeUpdate } = useAction(updateProduct, {
    onError: (error) => {
      setFormError("Error updating product");
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleSubmit = () => {
    const values = form.getValues();
    executeUpdate({
      ...values,
      id: product?.id ?? generateId(),
      wishlistId,
    });
  };

  const setFormValues = (
    values: z.infer<typeof partialCompiledProductDataSchema>,
  ) => {
    form.setValue("name", values.name ?? "");
    form.setValue("description", values.description ?? "");
    form.setValue("brand", values.brand ?? "");
    form.setValue("quantity", values.quantity ?? "1");
    form.setValue("price", values.price ?? "");
    form.setValue("url", values.url ?? "");
    form.setValue("imageUrl", values.images?.[0] ?? "");
  };

  const setImageUrl = (imageUrl: string) => {
    form.setValue("imageUrl", imageUrl);
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
