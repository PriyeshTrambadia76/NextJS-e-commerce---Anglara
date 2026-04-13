"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types/product";

const STORAGE_KEY = "anglara-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === product.id);
      if (i === -1) {
        return [...prev, { product, quantity: 1 }];
      }
      const next = [...prev];
      next[i] = {
        ...next[i],
        quantity: next[i].quantity + 1,
      };
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((x) => x.product.id !== productId));
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    const q = Math.max(0, Math.floor(quantity));
    setItems((prev) => {
      if (q === 0) {
        return prev.filter((x) => x.product.id !== productId);
      }
      return prev.map((x) =>
        x.product.id === productId ? { ...x, quantity: q } : x,
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, x) => sum + x.quantity, 0);
    const subtotal = items.reduce(
      (sum, x) => sum + x.product.price * x.quantity,
      0,
    );
    return {
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [items, hydrated, addItem, removeItem, setQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
