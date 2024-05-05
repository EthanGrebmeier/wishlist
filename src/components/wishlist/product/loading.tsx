const ProductLoading = () => {
  return (
    <div
      aria-hidden="true"
      className=" mx-auto flex w-full max-w-[600px] grid-cols-1 flex-col gap-4 px-2 pb-4 md:mt-4 md:px-6 lg:mx-6 lg:mt-8 lg:grid lg:h-[calc(100svh-32px)] lg:max-h-[calc(100svh-32px)] lg:w-auto lg:max-w-none lg:flex-1 lg:grid-rows-[1fr] lg:gap-14 lg:px-0"
    >
      <section className="flex h-full w-full  flex-col gap-4 overflow-hidden transition-all lg:grid lg:grid-cols-[1fr_min-content] lg:gap-4">
        <div className="flex w-full justify-center gap-4 align-top lg:mx-0">
          <div className="relative flex h-min w-[400px] items-center justify-center overflow-hidden rounded-md  border-2 border-black bg-white">
            <div className="skeleton aspect-square w-full"></div>
          </div>
        </div>
        <div className="mx-auto mb-4 flex w-full flex-col justify-between gap-2  lg:h-full lg:w-[320px] lg:max-w-none ">
          <div className="rounded-md border-black lg:border-2 lg:p-4">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-8"> </div>
              <div className="skeleton h-3"> </div>
            </div>
          </div>
          <div className="flex w-full flex-col justify-end gap-6 rounded-md border-black lg:-mt-4 lg:border-2 lg:p-4">
            <div className="flex flex-col gap-4">
              <div className="skeleton h-24"> </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductLoading;
