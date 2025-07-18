import prisma from '@/lib/prisma';

export const getArticle = async () => {
  const article = await prisma.article.findFirst({
    include: {
      comments: {
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

  return article;
};
