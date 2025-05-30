import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PostPageProps {
  params: {
    id: string;
  };
}

type PostWithAuthorAndComments = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
    email: string;
  };
  comments: Array<{
    id: string;
    content: string;
    createdAt: Date;
    author: {
      name: string;
    };
  }>;
};

type PostMetadata = {
  title: string | null;
  content: string | null;
};

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({ select: { id: true } });
    return posts.map((post) => ({ id: post.id }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await prisma.post.findUnique({ 
      where: { id: params.id },
      select: {
        title: true,
        content: true,
      }
    }) as PostMetadata | null;
    
    return {
      title: post?.title ?? 'Post Not Found',
      description: post?.content?.slice(0, 150) ?? '',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Post Not Found',
      description: '',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        comments: {
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
        },
      },
    });

    if (!post) {
      notFound();
    }

    const typedPost = post as PostWithAuthorAndComments;

    return (
      <main className="min-h-screen p-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{typedPost.title}</h1>
          <div className="text-gray-600 mb-8">
            By {typedPost.author.name} • {new Date(typedPost.createdAt).toLocaleDateString()}
          </div>
          <div className="prose max-w-none mb-12">
            <p>{typedPost.content}</p>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Comments</h2>
            <div className="space-y-6">
              {typedPost.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Error</h1>
          <p className="text-red-600">Failed to load post. Please try again later.</p>
        </div>
      </main>
    );
  }
} 