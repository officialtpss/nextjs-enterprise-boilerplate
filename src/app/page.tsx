import { prisma } from '@/lib/prisma';
import Link from 'next/link';

type PostWithAuthor = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
};

export default async function Home() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts found. Be the first to create one!</p>
          ) : (
            <div className="grid gap-6">
              {posts.map((post: PostWithAuthor) => (
                <article
                  key={post.id}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{post.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
          <div className="p-6 bg-red-50 rounded-lg">
            <p className="text-red-600">Failed to load posts. Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }
}
