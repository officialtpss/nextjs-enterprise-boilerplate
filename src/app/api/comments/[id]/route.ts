import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateCommentSchema = z.object({
  content: z.string().min(1).optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, name: true } },
        post: { select: { id: true, title: true } },
      },
    });
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (error: unknown) {
    console.error('Error fetching comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const json = await request.json();
    const body = updateCommentSchema.parse(json);
    const comment = await prisma.comment.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(comment);
  } catch (error: unknown) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await prisma.comment.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 