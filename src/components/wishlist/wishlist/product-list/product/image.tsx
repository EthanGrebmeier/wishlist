import Link from "~/components/ui/link";

type ProductImageProps = {
  imageUrl: string | null;
  link: string | null;
};

const className = "h-full w-full object-cover";

const ProductImage = ({ imageUrl, link }: ProductImageProps) => {
  imageUrl = imageUrl ?? "https://placehold.co/600x400/EEE/31343C";

  if (!link) {
    return <img src={imageUrl} className={className} />;
  }

  return (
    <Link href={link} variant="ghost">
      <img src={imageUrl} className={className} />
    </Link>
  );
};

export default ProductImage;
