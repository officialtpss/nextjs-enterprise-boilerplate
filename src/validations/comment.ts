import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment is too long'),
  postId: z.string().min(1, 'Post ID is required'),
  authorId: z.string().min(1, 'Author ID is required'),
});

export const updateCommentSchema = createCommentSchema.partial();

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>; 