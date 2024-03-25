import TitleBar from "~/components/ui/title-bar";

const Loading = () => {
  return (
    <div className="pt-4">
      <TitleBar>
        <div className="h-12 w-44 animate-pulse rounded-md bg-slate-200"></div>
      </TitleBar>
      <ul className="grid gap-4 gap-y-12 px-6 py-4 sm:grid-cols-2 md:grid-cols-3 md:gap-y-6 lg:pt-8 xl:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="aspect-square w-full animate-pulse rounded-md bg-slate-200" />
          <div className="h-6 w-44 animate-pulse rounded-md bg-slate-200 px-2 py-4" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="aspect-square w-full animate-pulse rounded-md bg-slate-200" />
          <div className="h-6 w-44 animate-pulse rounded-md bg-slate-200 px-2 py-4" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="aspect-square w-full animate-pulse rounded-md bg-slate-200" />
          <div className="h-6 w-44 animate-pulse rounded-md bg-slate-200 px-2 py-4" />
        </div>
      </ul>
    </div>
  );
};

export default Loading;
