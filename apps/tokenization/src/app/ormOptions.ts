import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { URL } from 'url';

export const getDBConnectionOptions = (): PostgresConnectionOptions => {
    if (!process.env.TOKENIZATION_DATABASE_URL) {
      throw new Error('TOKENIZATION_DATABASE_URL undefined');
    }
  
    const url = new URL(process.env.TOKENIZATION_DATABASE_URL);
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