import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log('🌱 Starting seeding...');

    // Create users
    const alicePassword = await bcrypt.hash('alice123', 10);
    const bobPassword = await bcrypt.hash('bob123', 10);
    const charliePassword = await bcrypt.hash('charlie123', 10);

    const alice = await prisma.user.create({
      data: {
        email: 'alice@example.com',
        name: 'Alice Johnson',
        password: alicePassword,
      },
    });

    const bob = await prisma.user.create({
      data: {
        email: 'bob@example.com',
        name: 'Bob Smith',
        password: bobPassword,
      },
    });

    const charlie = await prisma.user.create({
      data: {
        email: 'charlie@example.com',
        name: 'Charlie Brown',
        password: charliePassword,
      },
    });

    console.log('👤 Created users');

    // Create posts
    const post1 = await prisma.post.create({
      data: {
        title: 'Getting Started with Next.js',
        content: 'Next.js is a React framework that enables server-side rendering and static site generation...',
        published: true,
        authorId: alice.id,
      },
    });

    const post2 = await prisma.post.create({
      data: {
        title: 'Understanding TypeScript',
        content: 'TypeScript is a strongly typed programming language that builds on JavaScript...',
        published: true,
        authorId: bob.id,
      },
    });

    const post3 = await prisma.post.create({
      data: {
        title: 'The Power of Prisma',
        content: 'Prisma is a next-generation ORM that makes working with databases easy...',
        published: false,
        authorId: charlie.id,
      },
    });

    console.log('📝 Created posts');

    // Create comments
    await prisma.comment.create({
      data: {
        content: 'Great article! This really helped me understand Next.js better.',
        postId: post1.id,
        authorId: bob.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: 'I have a question about server-side rendering. Can you explain more?',
        postId: post1.id,
        authorId: charlie.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: 'TypeScript has been a game-changer for our team!',
        postId: post2.id,
        authorId: alice.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: 'Looking forward to trying out Prisma in my next project.',
        postId: post3.id,
        authorId: bob.id,
      },
    });

    console.log('💬 Created comments');
    console.log('✅ Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 