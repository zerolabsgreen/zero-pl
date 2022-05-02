import { ConnectionOptions } from 'typeorm';
import { URL } from 'url';
import { resolve } from 'path';

const getDBConnectionOptions = (): ConnectionOptions => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL undefined');
  }

  const url = new URL(process.env.DATABASE_URL);
  return {
    type: 'postgres',
    host: url.hostname,
    port: parseInt(url.port, 10),
    username: url.username,
    password: url.password,
    database: url.pathname.replace('/', ''),
    ssl: process.env.DB_SSL_OFF
      ? false
      : { rejectUnauthorized: false },
  };
};

const config: ConnectionOptions = {
  ...getDBConnectionOptions(),
  synchronize: false,
  migrationsRun: true,
  migrations: [
    resolve(
      `${__dirname}/../node_modules/@energyweb/issuer-api/dist/js/migrations/*.js`
    ),
    `${__dirname}/migrations/*.ts`,
  ],
  migrationsTableName: 'migrations_tokenization',
};

export = config;
