import { PrismaClient, CommentEntity } from '@prisma/client';

const prisma = new PrismaClient();

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function hoursAgo(hours: number) {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
}

async function main() {
  // --- Delete existing data in correct order to avoid foreign key conflicts ---
  await prisma.comment.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.episode.deleteMany({});

  console.log('🧹 Cleared existing data.');

  // --- Create 6 users ---
  const usernames = ['alice', 'bob', 'carol', 'dave', 'eve', 'frank'];
  const users = await Promise.all(
    usernames.map((username, i) =>
      prisma.user.create({
        data: {
          username,
          email: `${username}@example.com`,
          passwordHash: `hashedpassword${i + 1}`,
        },
      })
    )
  );

  // --- Create 1 article and 1 episode ---
  const article = await prisma.article.create({ data: {} });
  const episode = await prisma.episode.create({ data: {} });

  // --- Create article comments with different timestamps ---
  const articleComments = await Promise.all(
    users.map((user, i) =>
      prisma.comment.create({
        data: {
          text: `Article comment ${i + 1} by ${user.username}`,
          userId: user.id,
          articleId: article.id,
          entity: CommentEntity.ARTICLE,
          createdAt: daysAgo(6 - i),
          updatedAt: daysAgo(6 - i),
        },
      })
    )
  );

  // --- Create episode comments with different timestamps ---
  const episodeComments = await Promise.all(
    users.map((user, i) =>
      prisma.comment.create({
        data: {
          text: `Episode comment ${i + 1} by ${user.username}`,
          userId: user.id,
          episodeId: episode.id,
          entity: CommentEntity.EPISODE,
          createdAt: daysAgo(6 - i),
          updatedAt: daysAgo(6 - i),
        },
      })
    )
  );

  // --- Replies to article comments (first 3) ---
  await Promise.all(
    articleComments.slice(0, 3).map((parentComment, i) =>
      prisma.comment.create({
        data: {
          text: `Reply to article comment ${i + 1} by ${
            users[i + 3].username
          }`,
          userId: users[i + 3].id,
          articleId: article.id,
          entity: CommentEntity.ARTICLE,
          parentId: parentComment.id,
          createdAt: hoursAgo(12 - i * 2),
          updatedAt: hoursAgo(12 - i * 2),
        },
      })
    )
  );

  // --- Replies to episode comments (last 3) ---
  await Promise.all(
    episodeComments.slice(3).map((parentComment, i) =>
      prisma.comment.create({
        data: {
          text: `Reply to episode comment ${i + 4} by ${
            users[i].username
          }`,
          userId: users[i].id,
          episodeId: episode.id,
          entity: CommentEntity.EPISODE,
          parentId: parentComment.id,
          createdAt: hoursAgo(6 - i * 2),
          updatedAt: hoursAgo(6 - i * 2),
        },
      })
    )
  );

  console.log('✅ Seed complete with realistic timestamps.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
