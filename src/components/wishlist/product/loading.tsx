const ProductLoading = () => {
  return (
    <div
      aria-hidden="true"
      className="flex w-full max-w-screen-sm flex-col gap-8 px-4 lg:py-4 lg:pt-10 xl:max-w-none xl:pr-8 xl:pt-4 "
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_440px]">
        <div className="skeleton relative flex aspect-square flex-1  rounded-md border-2 border-black bg-white">
          {" "}
        </div>
        <div className="skeleton sm:rounded-md sm:border-2 sm:border-black ">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
