# no-nonsense ordering experience

Cairo is a fast, hassle-free food ordering system that lets you browse smartly, place, and manage your orders with just a few taps

-----

## Stack & Structure

  * **Backend (Routes, Controllers, Services, DAOs):** Next.js, TypeScript, Prisma, PostgreSQL, Stripe, Zod

  * **Frontend (React Components, Contexts, Hooks):** Next.js (App Router), React, TypeScript, TailwindCSS, Radix UI, React Hook Form

-----

## Overview

  * **`/`**: Browse and select a restaurant

  * **`/[slug]`**: Choose an order type

  * **`/[slug]/menu`**: Explore the menu and build your cart

  * **`/[slug]/menu/[productId]`**: View item details

  * **`/[slug]/orders`**: Track your order history

-----

## Run

1.  **Clone the repository and install dependencies:**

```bash
git clone https://github.com/efdourado/fs-cairo.git && cd fs-cairo && npm install
```

2.  **Set up environment variables** by copying the example (and fill in your secrets):

```bash
cp .env.example .env
```

3.  **Run the database migrations:**

```bash
npx prisma migrate dev
```

4.  **Seed the database (optional):**

```bash
npx prisma db seed
```

5.  **Start the development server:**

```bash
npm run dev
```

6.  **Build for production:**

```bash
npm run build
```