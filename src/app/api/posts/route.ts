import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPostSchema } from '@/validations/post';
import { ZodError } from 'zod';

type CreatePostBody = {
  title: string;
  content: string;
  published?: boolean;
};

export async function POST(request: Request) {
  try {
    const json = await request.json() as CreatePostBody;
    const body = createPostSchema.parse(json);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published ?? false,
        authorId: 'temp-author-id', // Note: In a real app, this would come from the authenticated user
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 