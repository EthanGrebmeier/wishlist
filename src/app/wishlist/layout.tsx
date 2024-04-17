type WishlistPageProps = {
  children: JSX.Element;
};
const WishlistPage = ({ children }: WishlistPageProps) => {
  return (
    <main className="relative flex min-h-[calc(100svh-80px)] flex-col">
      {children}
    </main>
  );
};

export default WishlistPage;
