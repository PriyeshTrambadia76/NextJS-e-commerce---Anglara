import { getProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/product-card";

export const revalidate = 3600;

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-zinc-200 bg-linear-to-br from-orange-50 via-white to-zinc-50 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            New season · Fake Store API
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Style that fits your everyday
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Discover curated products from electronics to fashion. Add items to
            your cart and manage them on the cart page — all powered by{" "}
              Fake Store API.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Featured products
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {products.length} products available
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Products are temporarily unavailable.
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Please refresh in a moment. The API may be waking up or rate
              limited.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
