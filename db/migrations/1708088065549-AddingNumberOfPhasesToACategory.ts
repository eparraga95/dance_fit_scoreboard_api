import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingNumberOfPhasesToACategory1708088065549 implements MigrationInterface {
    name = 'AddingNumberOfPhasesToACategory1708088065549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "number_of_phases" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "number_of_phases"`);
    }

}
