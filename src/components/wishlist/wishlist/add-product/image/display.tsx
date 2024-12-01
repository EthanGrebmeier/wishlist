import ImageDisplay from "~/components/ui/image/display";
import { useProductForm } from "../form";
import { useProductSheetNavigation } from "..";

export const ProductImageDisplay = () => {
  const { setFrame } = useProductSheetNavigation();
  const { form, setImageUrl } = useProductForm();
  const imageUrl = form.watch("imageUrl");

  return (
    <ImageDisplay
      openImageEditor={() => setFrame("image")}
      imageUrl={imageUrl ?? ""}
      removeImage={() => setImageUrl("")}
    />
  );
};
