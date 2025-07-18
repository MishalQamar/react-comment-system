import { Prisma } from '@prisma/client';

export type ReplyType = Prisma.CommentGetPayload<{
  include: {
    user: { select: { username: true } };
  };
}>;

export type CommentWithReplies = Prisma.CommentGetPayload<{
  include: {
    user: { select: { username: true } };
    replies: {
      include: {
        user: { select: { username: true } };
      };
    };
  };
}>;

export type Comment = CommentWithReplies | ReplyType;
