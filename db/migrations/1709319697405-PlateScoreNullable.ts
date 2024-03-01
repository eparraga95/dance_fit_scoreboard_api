import { MigrationInterface, QueryRunner } from "typeorm";

export class PlateScoreNullable1709319697405 implements MigrationInterface {
    name = 'PlateScoreNullable1709319697405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" ALTER COLUMN "plate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" ALTER COLUMN "plate" SET NOT NULL`);
    }

}
