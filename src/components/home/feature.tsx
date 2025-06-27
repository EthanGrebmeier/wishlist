interface FeatureProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  bgColor: string;
}

export function Feature({ title, description, icon, bgColor }: FeatureProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <div
        className={`flex w-fit items-center justify-center rounded-xl border-2 border-black ${bgColor} p-2`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-balance font-serif text-4xl">{title}</h2>
        {description && (
          <p className="max-w-[340px] text-pretty font-sans text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
