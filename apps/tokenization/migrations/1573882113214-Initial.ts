import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1573882113214 implements MigrationInterface {
    name = 'Initial1573882113214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
