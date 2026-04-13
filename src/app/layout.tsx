import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnglaraShop — E-commerce",
  description:
    "Basic e-commerce demo with Next.js, TypeScript, Tailwind CSS, and Fake Store API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <CartProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
            <p>
              Demo for Anglara Digital Solutions ·{" "}
              <a
                href="https://fakestoreapi.com/docs"
                className="text-orange-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Fake Store API
              </a>
            </p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
