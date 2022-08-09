import { InternalServerErrorException } from '@nestjs/common';
import Bull from 'bull';

export const redisUrlToConfig = (
  redisUrl: string,
): Bull.QueueOptions['redis'] => {
  if (!redisUrl) {
    throw new InternalServerErrorException(`REDIS_URL env variable not set`);
  }

  const { hostname, port, username, password, protocol } = new URL(redisUrl);

  return {
    host: hostname,
    port: Number(port),
    username: username,
    password: password,
    tls: protocol === 'redis:' ? undefined : { rejectUnauthorized: false },
    maxRetriesPerRequest: null,
  };
};
