import { MigrationInterface, QueryRunner } from "typeorm";

export class NewScoreData1709118363476 implements MigrationInterface {
    name = 'NewScoreData1709118363476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`);
        await queryRunner.query(`ALTER TABLE "players_categories_categories" DROP CONSTRAINT "FK_b42397343ccaff062735ee26c0f"`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "perfect" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "good" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "bad" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "miss" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "max_combo" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "total_notes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players_categories_categories" ADD CONSTRAINT "FK_b42397343ccaff062735ee26c0f" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players_categories_categories" DROP CONSTRAINT "FK_b42397343ccaff062735ee26c0f"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "total_notes"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "max_combo"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "miss"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "bad"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "good"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "perfect"`);
        await queryRunner.query(`ALTER TABLE "players_categories_categories" ADD CONSTRAINT "FK_b42397343ccaff062735ee26c0f" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
