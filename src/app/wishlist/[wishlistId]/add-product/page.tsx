import AddProduct from "~/components/wishlist/view-wishlist/add-product";

type AddProductPageProps = {
  params: {
    wishlistId: string;
  };
};

const AddProductPage = async ({ params }: AddProductPageProps) => {
  return (
    <div className=" px-4 py-6">
      <h1 className="mb-8 text-4xl font-medium">Add Product</h1>
      <div className="w-[440px]">
        <AddProduct wishlistId={params.wishlistId} />
      </div>
    </div>
  );
};

export default AddProductPage;
