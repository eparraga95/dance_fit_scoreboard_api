import { MigrationInterface, QueryRunner } from "typeorm";

export class MusicAndCategoriesTablesAndItsRelations1707840669780 implements MigrationInterface {
    name = 'MusicAndCategoriesTablesAndItsRelations1707840669780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "musics" ("music_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, "mode" character varying NOT NULL, CONSTRAINT "PK_70201b0dbf70791aaa02de575a3" PRIMARY KEY ("music_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "level_min" integer NOT NULL, "level_max" integer NOT NULL, "eventEventId" bigint, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "categories_musics_musics" ("categoriesCategoryId" bigint NOT NULL, "musicsMusicId" bigint NOT NULL, CONSTRAINT "PK_61d44b37c2b0ad2cfbb1c53ca98" PRIMARY KEY ("categoriesCategoryId", "musicsMusicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d1c779bad05c95b960837e14ff" ON "categories_musics_musics" ("categoriesCategoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aba474f39e9f4c88dfafdcaff5" ON "categories_musics_musics" ("musicsMusicId") `);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "music"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "mode"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "categoryCategoryId" bigint`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "musicMusicId" bigint`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_018031936fcadc099aefd7ec3db" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71" FOREIGN KEY ("musicMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_musics_musics" ADD CONSTRAINT "FK_d1c779bad05c95b960837e14ff3" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_musics_musics" ADD CONSTRAINT "FK_aba474f39e9f4c88dfafdcaff54" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_musics_musics" DROP CONSTRAINT "FK_aba474f39e9f4c88dfafdcaff54"`);
        await queryRunner.query(`ALTER TABLE "categories_musics_musics" DROP CONSTRAINT "FK_d1c779bad05c95b960837e14ff3"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_018031936fcadc099aefd7ec3db"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "musicMusicId"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "categoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "level" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "mode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scores" ADD "music" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aba474f39e9f4c88dfafdcaff5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1c779bad05c95b960837e14ff"`);
        await queryRunner.query(`DROP TABLE "categories_musics_musics"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "musics"`);
    }

}
