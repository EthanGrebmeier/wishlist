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
import { productSchema } from "~/schema/wishlist/product";
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
import { Checkbox } from "~/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";

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
              input={<HorizontalTextInput placeholder="20" {...field} />}
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
  const { handleSubmit, isEditing, mutation, createAnother, setCreateAnother } =
    useProductForm();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        {!isEditing && (
          <>
            <Checkbox
              id="createAnother"
              checked={createAnother}
              onCheckedChange={(checked) =>
                setCreateAnother(checked as boolean)
              }
            />
            <label
              htmlFor="createAnother"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create Multiple
            </label>
          </>
        )}
      </div>
      <div className={!isEditing ? "ml-auto" : ""}>
        <StatusButton
          onClick={handleSubmit}
          status={
            mutation.isPending
              ? "executing"
              : mutation.isSuccess
                ? "hasSucceeded"
                : mutation.isError
                  ? "hasErrored"
                  : "idle"
          }
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
  mutation: ReturnType<
    typeof useMutation<unknown, Error, z.infer<typeof productSchema>>
  >;
  createAnother: boolean;
  setCreateAnother: Dispatch<SetStateAction<boolean>>;
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
  const [createAnother, setCreateAnother] = useState(false);
  const router = useRouter();

  const isEditing = Boolean(productToEdit);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
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
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof productSchema>) => {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      const isDifferentWishlist =
        !productToEdit && wishlistId !== variables.wishlistId;

      if (createAnother && !isEditing) {
        // Clear form fields but keep wishlistId
        setFormValues({
          name: "",
          description: "",
          brand: "",
          quantity: "1",
          price: "",
          url: "",
          priority: "normal",
          imageUrl: "",
          wishlistId: variables.wishlistId,
        });
        router.refresh();
        // Reset mutation state after a short delay
        setTimeout(() => {
          mutation.reset();
        }, 1000);
      } else {
        setTimeout(() => {
          setIsOpen(false);
          if (isDifferentWishlist) {
            router.push(`/wishlist/${variables.wishlistId}`, {
              scroll: true,
            });
          }
          router.refresh();
        }, 800);
      }
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      setFormError("Error updating product");
    },
  });

  const handleSubmit = useCallback(
    async (e?: React.BaseSyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }

      const values = form.getValues();
      mutation.mutate(values);
    },
    [form, mutation],
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
        handleSubmit,
        formError,
        setFormError,
        setFormValues,
        isEditing,
        setImageUrl,
        mutation,
        createAnother,
        setCreateAnother,
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
