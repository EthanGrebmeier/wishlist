import Navigation from ".";

const Sidebar = () => {
  return (
    <section className="grid h-screen grid-cols-1 grid-rows-[auto_1fr] border-r border-gray-200 bg-slate-100/40 py-6">
      <div className="mb-8  ">
        <p className="px-8 pb-4 text-4xl font-medium"> Wishlist </p>
      </div>
      <div className="h-1 min-h-full px-4">
        <Navigation />
      </div>
    </section>
  );
};

export default Sidebar;
