import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock the Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    post: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: '1',
          title: 'Test Post',
          content: 'Test Content',
          createdAt: new Date(),
          author: {
            name: 'Test Author',
          },
        },
      ]),
    },
  },
}));

describe('Home Page', () => {
  it('renders the home page with posts', async () => {
    render(await Home());
    // Check if the main heading is rendered
    expect(screen.getByText('Latest Posts')).toBeInTheDocument();
    // Check if the test post is rendered
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('By Test Author')).toBeInTheDocument();
  });
}); 