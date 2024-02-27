import { MigrationInterface, QueryRunner } from "typeorm";

export class OnCategoryDeleteScores1709035903793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`)
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
