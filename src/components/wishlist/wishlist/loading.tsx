import TitleBar from "~/components/ui/title-bar";
import ListView from "../list-view";

const Loading = () => {
  return (
    <>
      <TitleBar className=" flex-col items-start justify-center gap-8">
        <div className="h-10 w-44 animate-pulse rounded-md bg-slate-200 py-1"></div>
      </TitleBar>
      <div className="flex flex-col gap-2 ">
        <div className="h-8 w-44 animate-pulse rounded-md bg-slate-200 py-1"></div>
        <ListView>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => (
            <div
              key={index}
              className="skeleton relative flex w-full animate-pulse flex-col overflow-hidden rounded-md border-2 border-black bg-white"
            >
              <div className="aspect-[12/14] w-full" />
              <div className="h-12 w-full border-t-2 border-black bg-slate-200 px-2 py-4" />
            </div>
          ))}
        </ListView>
      </div>
    </>
  );
};

export default Loading;
