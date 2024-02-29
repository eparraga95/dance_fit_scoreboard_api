import { MigrationInterface, QueryRunner } from "typeorm";

export class GreatColumnOnScores1709123401941 implements MigrationInterface {
    name = 'GreatColumnOnScores1709123401941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" ADD "great" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "great"`);
    }

}
