import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { join, resolve } from 'path';
import { getDBConnectionOptions } from "@zero-labs/tokenization-api";

dotenv.config({
  path: '.env'
})

export const AppDataSource = new DataSource({
  ...getDBConnectionOptions(
    process.env.TOKENIZATION_DATABASE_URL as string,
    Boolean(process.env.DB_SSL_OFF)
  ),
  synchronize: false,
  migrationsRun: true,
  entities: [
    join(__dirname, 'src', '**', '*.entity.{js,ts}'),
    resolve(`${__dirname}/../../../node_modules/@zero-labs/tokenization-api/dist/src/adapters/postgres/entities/**/*.entity.js`)
  ],
  migrations: [
    join(__dirname, 'migrations', '*.ts'),
    resolve(
      `${__dirname}/../../node_modules/@zero-labs/tokenization-api/dist/migrations/*.js`
    ),
  ],
  migrationsTableName: 'migrations_tokenization',
});

