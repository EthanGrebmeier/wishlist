type ProductImageProps = {
  imageUrl: string;
};

const className = "w-full h-full object-cover object-center";

const ProductImage = ({ imageUrl }: ProductImageProps) => {
  return <img src={imageUrl} className={className} />;
};

export default ProductImage;
