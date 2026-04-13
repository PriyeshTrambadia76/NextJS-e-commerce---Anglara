"use client";

import Image from "next/image";
import type { Product } from "@/lib/types/product";
import { useCart } from "@/context/cart-context";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-orange-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-orange-900/50">
      <div className="relative aspect-square bg-zinc-50 p-6 dark:bg-zinc-800/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-orange-600">
          {product.category}
        </p>
        <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {product.title}
        </h2>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="rounded-full bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-700 active:scale-[0.98]"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
