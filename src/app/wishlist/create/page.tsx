import CreateWishlistForm from "~/components/wishlist/create-wishlist";

const CreateWishlist = () => {
  return (
    <div className="rounded-md border-2 border-black px-6 py-6">
      <h1 className="mb-8 text-4xl font-medium"> Create Wishlist</h1>
      <div className="w-[440px]">
        <CreateWishlistForm />
      </div>
    </div>
  );
};

export default CreateWishlist;
