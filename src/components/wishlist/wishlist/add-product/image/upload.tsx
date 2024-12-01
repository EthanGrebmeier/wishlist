import { useProductForm } from "../form";

import ImageUpload from "~/components/ui/image/upload";
import { useProductSheetNavigation } from "../navigation-context";

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
