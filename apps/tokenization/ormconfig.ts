import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { resolve } from 'path';
import { getDBConnectionOptions } from "./src/app/ormOptions";

dotenv.config({
  path: '.env'
})

export const AppDataSource = new DataSource({
  ...getDBConnectionOptions(),
  synchronize: false,
  migrationsRun: true,
  migrations: [
    resolve(
      `${__dirname}/../../node_modules/@zero-labs/tokenization-api/dist/js/migrations/*.js`
    ),
    `${__dirname}/migrations/*.ts`,
  ],
  migrationsTableName: 'migrations_tokenization',
});
