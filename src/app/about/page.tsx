export const metadata = {
  title: 'About | Next.js Boilerplate',
  description: 'About this Next.js enterprise boilerplate project',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <p className="text-lg text-gray-700 mb-4">
          This is a modern, scalable Next.js boilerplate project demonstrating advanced usage of core Next.js features including SSR, API routes, dynamic routing, and data handling using Prisma with a MySQL database.
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>App Router (Next.js 15)</li>
          <li>Prisma ORM + MySQL</li>
          <li>RESTful API routes</li>
          <li>TypeScript, Tailwind CSS, ESLint, Prettier</li>
          <li>Testing with Jest</li>
        </ul>
      </div>
    </main>
  );
} 