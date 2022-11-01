import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      nome: 'John Doe',
      email: 'john.doe@gmailing.com',
      avatarUrl: 'htto://github.com/ramondomiingos.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: { userId: user.id },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-05T18:52:19.283Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-03T18:52:19.283Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guess: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 0,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}


main()