type ProductImageProps = {
  imageUrl: string | null;
};

const className = "h-full w-full object-cover";

const ProductImage = ({ imageUrl }: ProductImageProps) => {
  /* eslint-disable-next-line */
  imageUrl = imageUrl || "https://placehold.co/600x600";

  /* eslint-disable-next-line  */
  return <img src={imageUrl} className={className} />;
};

export default ProductImage;
