import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createUserSchema } from '@/validations/user';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = createUserSchema.parse(json);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password, // Note: In a real app, you should hash the password
      },
    });

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 