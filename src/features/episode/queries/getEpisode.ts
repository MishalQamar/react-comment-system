import prisma from '@/lib/prisma';

export const getEpisode = async () => {
  const episode = await prisma.episode.findFirst({
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

  return episode;
};
