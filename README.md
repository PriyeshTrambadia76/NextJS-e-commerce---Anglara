## Anglara E‑commerce Demo

Basic e‑commerce setup built for the Anglara technical task using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.  
Products and categories come from the public **Fake Store API**.

### Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Language**: TypeScript
- **Data**: [`https://fakestoreapi.com/docs`](https://fakestoreapi.com/docs)

### Features

- **Homepage**
  - Hero section introducing the store.
  - Product grid rendered from `GET /products`.
  - Product cards with image, title, category, price, and **Add to cart** button.
- **Cart page**
  - Shows items added from the homepage with quantity controls.
  - Increase/decrease quantity, remove single item, or clear entire cart.
  - Subtotal calculation (no real checkout – demo only).
  - Cart state is persisted to `localStorage` so it survives reloads.
- **Responsive**
  - Layout adapts to mobile, tablet, and desktop.
  - Uses modern flex/grid utilities from Tailwind.
- **Performance**
  - Products are statically generated with `revalidate` (Incremental Static Regeneration).
  - Images from Fake Store are optimized via `next/image` and `next.config.ts` remote patterns.

### Getting started (local)

#### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm (comes with Node)

#### Install dependencies

```bash
cd anglara_nextjs_interview
npm install
```

#### Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

- Homepage: product listing and hero.
- `/cart`: cart management page.

#### Production build

```bash
npm run build
npm start
```

This will run the optimized production build on `http://localhost:3000`.

### Project structure (key files)

- `src/app/layout.tsx` – Root layout, `CartProvider`, header, and footer.
- `src/app/page.tsx` – Homepage, product fetching and grid UI.
- `src/app/cart/page.tsx` – Cart page with quantity controls and subtotal.
- `src/context/cart-context.tsx` – Cart state, localStorage persistence, and hooks.
- `src/lib/api/products.ts` – Fake Store API client helpers.
- `src/lib/types/product.ts` – Shared `Product` and `CartItem` TypeScript types.
- `src/app/globals.css` – Tailwind + design tokens.

### Performance notes

- **Static rendering**: product list is fetched on the server with `revalidate` so pages are served statically and periodically refreshed.
- **Image optimization**: all product thumbnails go through `next/image` which handles lazy‑loading and appropriate image sizes.
- **Minimal client state**: only the cart uses client components; product listing itself is rendered on the server to keep the bundle size small.

### Git & deployment

#### Initialize and push to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial Anglara e-commerce implementation"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

Replace `<your-username>` and `<your-repo-name>` with your GitHub details, then share that repository URL.

#### Deploy to Vercel

1. Create a free account at `https://vercel.com`.
2. Click **New Project** and import your GitHub repository.
3. Use the defaults for a Next.js App Router project:
   - Framework preset: **Next.js**.
   - Build command: `next build` (via `npm run build`).
   - Output: `.next`.
4. Click **Deploy**.

After deployment completes, Vercel will give you a public URL like `https://<project-name>.vercel.app` – share that URL together with the GitHub repo link.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
