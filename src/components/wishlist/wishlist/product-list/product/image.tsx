import Image from "next/image";

type ProductImageProps = {
  imageUrl: string;
};

const ProductImage = ({ imageUrl }: ProductImageProps) => {
  return (
    <Image
      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 760px) 33vw, 100vw"
      src={imageUrl}
      alt=""
      fill
      className="h-full w-full object-cover object-center"
    />
  );
};

export default ProductImage;
