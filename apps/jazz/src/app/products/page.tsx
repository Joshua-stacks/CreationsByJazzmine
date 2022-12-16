import ProductList from "@/components/ProductList";

export default function Products() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold">Best Sellers</h1>

        <div className="mt-5 flex overflow-x-auto md:grid md:auto-rows-auto md:grid-cols-6">
          {/* @ts-expect-error Server Component */}
          <ProductList />
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold">Catalog</h1>
      </div>
    </div>
  );
};
