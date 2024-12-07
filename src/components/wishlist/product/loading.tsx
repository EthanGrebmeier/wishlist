import TitleBar from "~/components/ui/title-bar";

const ProductLoading = () => {
  return (
    <>
      <TitleBar className="flex-col items-start justify-center gap-8">
        <div className="h-10 w-44 animate-pulse rounded-md bg-slate-200 py-1"></div>
      </TitleBar>
      <div aria-hidden="true" className="flex w-full flex-col gap-8 ">
        <div className="grid gap-4 md:grid-cols-[1fr_320px] xl:grid-cols-[1fr_440px]">
          <div className="skeleton relative flex aspect-square flex-1  rounded-md border-2 border-black bg-white">
            {" "}
          </div>
          <div className="skeleton sm:rounded-md sm:border-2 sm:border-black ">
            {" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLoading;
