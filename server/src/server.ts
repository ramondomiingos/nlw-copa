import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { poolRoutes } from './routes/pool';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';

async function bootstrap() {
  const fastify = Fastify({
    //todo: remove true in logger and add env variable for logger
    logger: true,
  });

  await fastify.register(cors, { origin: true });
  await fastify.register(jwt, { secret: 'nlwcopa'}); // TODO: remove to env
  await fastify.register(poolRoutes);
  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);

  //todo:  and PORT in env variable
  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
