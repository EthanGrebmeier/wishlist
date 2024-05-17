type WishlistPageProps = {
  children: JSX.Element;
};
const WishlistPage = ({ children }: WishlistPageProps) => {
  return <main className="relative">{children}</main>;
};

export default WishlistPage;
