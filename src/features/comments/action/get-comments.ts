import prisma from '@/lib/prisma';
import { CommentEntity } from '@prisma/client';

export const getComments = async (
  entity: CommentEntity,
  entityId: string
) => {
  switch (entity) {
    case 'ARTICLE': {
      return await prisma.comment.findMany({
        where: {
          articleId: entityId,
        },

        orderBy: {
          createdAt: 'desc',
        },

        include: {
          user: {
            select: {
              username: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });
    }

    case 'EPISODE': {
      return await prisma.comment.findMany({
        where: {
          episodeId: entityId,
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });
    }

    default:
      return [];
  }
};
