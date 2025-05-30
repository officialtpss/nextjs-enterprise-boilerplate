import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createCommentSchema, type CreateCommentInput } from '@/validations/comment';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const json = await request.json() as CreateCommentInput;
    const body = createCommentSchema.parse(json);

    // Verify that the post exists
    const post = await prisma.post.findUnique({
      where: { id: body.postId },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const comment = await prisma.comment.create({
      data: body,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    
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
    const comments = await prisma.comment.findMany({
      include: {
        author: { 
          select: { 
            id: true, 
            name: true 
          } 
        },
        post: { 
          select: { 
            id: true, 
            title: true 
          } 
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 