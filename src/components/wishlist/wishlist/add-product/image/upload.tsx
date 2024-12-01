import { useProductForm } from "../form";
import { useProductSheetNavigation } from "..";
import ImageUpload from "~/components/ui/image/upload";

export const ProductImageUpload = () => {
  const { setImageUrl } = useProductForm();
  const { setFrame } = useProductSheetNavigation();

  return (
    <ImageUpload
      onImageSelect={setImageUrl}
      onBack={() => setFrame("form")}
      subtitle="Select an image for your product"
    />
  );
};
