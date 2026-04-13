"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, clearCart, hydrated } =
    useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-8 space-y-4">
          <div className="h-32 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-32 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
          Browse the store and add items you love. They will appear here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Shopping cart
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {items.reduce((n, x) => n + x.quantity, 0)} item
            {items.reduce((n, x) => n + x.quantity, 0) !== 1 ? "s" : ""} in
            your cart
          </p>
        </div>
        <button
          type="button"
          onClick={() => clearCart()}
          className="self-start text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400"
        >
          Clear cart
        </button>
      </div>

      <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-50 sm:h-24 sm:w-24 dark:bg-zinc-800/50">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="96px"
                className="object-contain p-2"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase text-orange-600">
                {product.category}
              </p>
              <h2 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                {product.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                ${product.price.toFixed(2)} each
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:justify-end">
              <div className="flex items-center rounded-full border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  onClick={() =>
                    setQuantity(product.id, quantity - 1)
                  }
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-zinc-600 transition hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  onClick={() =>
                    setQuantity(product.id, quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <p className="min-w-20 text-right text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="text-sm font-medium text-zinc-500 underline-offset-2 hover:text-red-600 hover:underline dark:text-zinc-400"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Subtotal</p>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            ${subtotal.toFixed(2)}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:opacity-50"
          disabled
        >
          Checkout (demo)
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Checkout is disabled for this demo. Data is stored locally in your
        browser.
      </p>
    </div>
  );
}
