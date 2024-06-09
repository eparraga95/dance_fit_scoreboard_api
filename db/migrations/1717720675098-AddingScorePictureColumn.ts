import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingScorePictureColumn1717720675098 implements MigrationInterface {
    name = 'AddingScorePictureColumn1717720675098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" ADD "score_picture" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "score_picture"`);
    }

}
