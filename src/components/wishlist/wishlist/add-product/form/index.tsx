import { zodResolver } from "@hookform/resolvers/zod";
import {
  BanknoteIcon,
  CalculatorIcon,
  ChartColumnIncreasing,
  ClipboardIcon,
  FilePlus,
  LinkIcon,
  LoaderCircleIcon,
  SquarePenIcon,
  StoreIcon,
} from "lucide-react";
import { type HookActionStatus } from "next-safe-action/hooks";
import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "~/components/ui/form";
import { productSchema } from "~/schema/wishlist/product";
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
import { useAtomValue, useSetAtom } from "jotai";
import {
  isProductFormOpenAtom,
  productToEditAtom,
} from "~/store/product-settings";
import StatusButton from "~/components/ui/status-button";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
const ProductForm = () => {
  const { form, handleSubmit } = useProductForm();

  return (
    <Form {...form}>
      <form className="flex h-full flex-col gap-2" onSubmit={handleSubmit}>
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
          name="url"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={LinkIcon}
              label="URL"
              input={
                <HorizontalTextInput
                  placeholder="https://example.com"
                  {...field}
                />
              }
              error={form.formState.errors.url?.message}
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
        <button className="hidden" aria-hidden>
          Submit
        </button>
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
  form: UseFormReturn<z.infer<typeof productSchema>>;
  formError: string;
  isEditing: boolean;
  setFormError: Dispatch<SetStateAction<string>>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  setFormValues: (values: z.infer<typeof productSchema>) => void;
  setImageUrl: (imageUrl: string) => void;
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
  const setIsOpen = useSetAtom(isProductFormOpenAtom);
  const productToEdit = useAtomValue(productToEditAtom);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const isEditing = Boolean(productToEdit);

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updateProduct,
    zodResolver(productSchema),
    {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          name: productToEdit?.name ?? "",
          description: productToEdit?.description ?? "",
          brand: productToEdit?.brand ?? "",
          quantity: productToEdit?.quantity ?? "1",
          price: productToEdit?.price ?? "",
          url: productToEdit?.url ?? "",
          priority: productToEdit?.priority ?? "normal",
          imageUrl: productToEdit?.imageUrl ?? "",
          id: productToEdit?.id,
          wishlistId: productToEdit?.wishlistId ?? wishlistId,
        },
      },
      actionProps: {
        onError: () => {
          setFormError("Error updating product");
        },
        onSuccess: ({ input }) => {
          const isDifferentWishlist =
            !productToEdit && wishlistId !== input.wishlistId;
          setTimeout(() => {
            setIsOpen(false);
            if (isDifferentWishlist) {
              router.push(`/wishlist/${input.wishlistId}`, {
                scroll: true,
              });
            }
            router.refresh();
          }, 800);
        },
      },
    },
  );

  const setFormValues = useCallback(
    (values: z.infer<typeof productSchema>) => {
      form.setValue("name", values.name ?? "");
      form.setValue("description", values.description ?? "");
      form.setValue("brand", values.brand ?? "");
      form.setValue("quantity", values.quantity ?? "1");
      form.setValue("price", values.price ?? "");
      form.setValue("url", values.url ?? "");
      form.setValue("imageUrl", values.imageUrl ?? "");
      form.setValue("priority", values.priority ?? "");
      form.setValue("wishlistId", values.wishlistId ?? wishlistId);
    },
    [form, wishlistId],
  );

  useEffect(() => {
    if (productToEdit) {
      setFormValues(productToEdit);
    }
  }, [productToEdit, setFormValues]);

  const setImageUrl = (imageUrl: string) => {
    form.setValue("imageUrl", imageUrl);
  };
  return (
    <ProductFormContext.Provider
      value={{
        form,
        handleSubmit: handleSubmitWithAction,
        formError,
        setFormError,
        setFormValues,
        isEditing,
        setImageUrl,
        status: action.status,
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
