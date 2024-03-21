type WishlistPageProps = {
  children: JSX.Element;
};
const WishlistPage = ({ children }: WishlistPageProps) => {
  return <main className="flex min-h-screen flex-col">{children}</main>;
};

export default WishlistPage;
