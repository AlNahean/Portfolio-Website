# Al Nahean's Portfolio

A modern, high-performance personal portfolio and knowledge hub built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. This project serves as a showcase of my work, a blog for my thoughts, and a study hub for my learning notes.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Content:** [Fumadocs](https://fumadocs.vercel.app/) (MDX)
- **Deployment:** Vercel

## Features

- **Portfolio Showcase:** Sections for projects, detailed experience, and tech stack.
- **Blog & Study Hub:** MDX-powered content management for articles and study notes.
- **Guestbook:** Interactive guestbook for visitors to leave messages.
- **Dynamic Island:** Interactive UI component for media controls and notifications.
- **GitHub Stats:** Real-time integration with GitHub API.
- **SEO Optimized:** Built-in SEO best practices with metadata management.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd portolio
   ```

2. **Install dependencies:**

   This project prefers `pnpm`.

   ```bash
   pnpm install
   ```

3. **Set up Environment Variables:**

   Copy the example environment file and fill in the required values.

   ```bash
   cp .env.example .env
   ```

   Make sure to configure your `DATABASE_URL` and other secrets.

4. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `content/`: MDX files for Blog (`content/blog`) and Study Hub (`content/study`).
- `src/components/`: Reusable UI components.
- `src/app/`: Next.js App Router pages and API routes.
- `prisma/`: Database schema and migrations.

## License

This project is open source and available under the [MIT License](LICENSE).
