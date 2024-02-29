import { MigrationInterface, QueryRunner } from "typeorm";

export class ScoreStagePassProp1709143784177 implements MigrationInterface {
    name = 'ScoreStagePassProp1709143784177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" ADD "stage_pass" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "stage_pass"`);
    }

}
