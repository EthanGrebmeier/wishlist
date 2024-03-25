type WishlistPageProps = {
  children: JSX.Element;
};
const WishlistPage = ({ children }: WishlistPageProps) => {
  return (
    <main className="relative flex flex-col md:min-h-screen">{children}</main>
  );
};

export default WishlistPage;
