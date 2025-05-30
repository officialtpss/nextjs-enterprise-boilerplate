# Next.js Enterprise Boilerplate

A modern, scalable Next.js boilerplate project with TypeScript, Prisma, PostgreSQL, and more.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Prisma** with PostgreSQL for database management
- **RESTful API** routes with proper error handling
- **Tailwind CSS** for styling with optimized font loading
- **ESLint** and **Prettier** for code quality
- **Jest** and **Testing Library** for testing
- **Zod** for runtime type validation
- **Error Boundaries** and loading states
- **Static Site Generation (SSG)** support
- **Responsive Design** with modern UI components
- **Optimized Font Loading** with next/font
- **Form Handling** with React Hook Form
- **Data Fetching** with SWR

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Update the `.env.local` file with your PostgreSQL credentials.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with sample data:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── posts/          # Post-related pages
│   │   └── layout.tsx      # Root layout
│   ├── lib/                # Utility functions
│   ├── validations/        # Zod validation schemas
│   └── types/              # TypeScript type definitions
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── tests/                  # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run db:seed` - Seed the database with sample data

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create a new comment
- `GET /api/comments/[id]` - Get a specific comment
- `PUT /api/comments/[id]` - Update a comment
- `DELETE /api/comments/[id]` - Delete a comment

## Features in Detail

### Type Safety
- Full TypeScript support
- Zod schemas for runtime validation
- Proper error handling with type checking

### Database
- Prisma ORM with PostgreSQL
- Automatic migrations
- Type-safe database queries
- Sample data seeding with realistic content

### UI/UX
- Responsive design with Tailwind CSS
- Loading states for better UX
- Error boundaries for graceful error handling
- Modern and clean interface
- Optimized font loading with next/font
- CSS variables for consistent theming

### Testing
- Jest for unit testing
- Testing Library for component testing
- Test utilities and helpers

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Lint-staged for pre-commit checks

### Data Management
- SWR for data fetching and caching
- React Hook Form for form handling
- Zod for form validation
- Optimistic updates

### 👤 Author

Tech Prastish - [github.com/officialtpss](https://github.com/officialtpss)  

Contact: info@tech-prastish.com


### 📄 License

This is a sample project intended for learning and demo purposes only.

