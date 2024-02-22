import { MigrationInterface, QueryRunner } from "typeorm";

export class TableCreation1708616099691 implements MigrationInterface {
    name = 'TableCreation1708616099691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("event_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_dfa3d03bef3f90f650fd138fb38" UNIQUE ("name"), CONSTRAINT "PK_1b77463a4487f09e798dffcb43a" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`CREATE TABLE "musics" ("music_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, "mode" character varying NOT NULL, CONSTRAINT "PK_70201b0dbf70791aaa02de575a3" PRIMARY KEY ("music_id"))`);
        await queryRunner.query(`CREATE TABLE "phases" ("phase_id" BIGSERIAL NOT NULL, "phase_number" integer NOT NULL, "music_number" integer NOT NULL, "modes_available" text array NOT NULL, "passing_players" integer NOT NULL, "categoryCategoryId" bigint, CONSTRAINT "PK_3340426679fb41e2187c1f028c8" PRIMARY KEY ("phase_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "level_min" integer NOT NULL, "level_max" integer NOT NULL, "number_of_phases" integer NOT NULL, "eventEventId" bigint, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "scores" ("score_id" BIGSERIAL NOT NULL, "value" integer NOT NULL, "grade" character varying NOT NULL, "plate" character varying NOT NULL, "validated" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "playerPlayerId" bigint, "eventEventId" bigint, "categoryCategoryId" bigint, "musicMusicId" bigint, "phasePhaseId" bigint, CONSTRAINT "PK_b164c6cd21a79e8adac5718947e" PRIMARY KEY ("score_id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("session_id" BIGSERIAL NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_9340188c93349808f10d1db74a8" PRIMARY KEY ("session_id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("player_id" BIGSERIAL NOT NULL, "nickname" character varying NOT NULL, "password" character varying NOT NULL, "profilePicture" character varying, "role" character varying NOT NULL, "sessionPlayerId" bigint, CONSTRAINT "UQ_b087be71894b730ec150a1ed458" UNIQUE ("nickname"), CONSTRAINT "REL_5941177c5993a43cd8861445ee" UNIQUE ("sessionPlayerId"), CONSTRAINT "PK_7274d067b855d5824050aaf5e68" PRIMARY KEY ("player_id"))`);
        await queryRunner.query(`CREATE TABLE "phases_musics_musics" ("phasesPhaseId" bigint NOT NULL, "musicsMusicId" bigint NOT NULL, CONSTRAINT "PK_b03a04092f0063a7d6943196869" PRIMARY KEY ("phasesPhaseId", "musicsMusicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_197078e493ca616e59cb1251af" ON "phases_musics_musics" ("phasesPhaseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71d0f2d4a8c2276cd3e1e716f0" ON "phases_musics_musics" ("musicsMusicId") `);
        await queryRunner.query(`CREATE TABLE "players_events_events" ("playersPlayerId" bigint NOT NULL, "eventsEventId" bigint NOT NULL, CONSTRAINT "PK_545097fe6590db8e9a9b2cf5e88" PRIMARY KEY ("playersPlayerId", "eventsEventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9541e7ab84b817e362a6239a7b" ON "players_events_events" ("playersPlayerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c9e2848a831ae46b0cb51f796" ON "players_events_events" ("eventsEventId") `);
        await queryRunner.query(`CREATE TABLE "players_categories_categories" ("playersPlayerId" bigint NOT NULL, "categoriesCategoryId" bigint NOT NULL, CONSTRAINT "PK_1caa982335762325bea2c8e0df9" PRIMARY KEY ("playersPlayerId", "categoriesCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7327e75a72d56ece415f4cfc3c" ON "players_categories_categories" ("playersPlayerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b42397343ccaff062735ee26c0" ON "players_categories_categories" ("categoriesCategoryId") `);
        await queryRunner.query(`ALTER TABLE "phases" ADD CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_018031936fcadc099aefd7ec3db" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_b42778656ea05283d2862a0dde7" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71" FOREIGN KEY ("musicMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_221184c43396fbd1534af86d21d" FOREIGN KEY ("phasePhaseId") REFERENCES "phases"("phase_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_5941177c5993a43cd8861445eec" FOREIGN KEY ("sessionPlayerId") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_197078e493ca616e59cb1251af1" FOREIGN KEY ("phasesPhaseId") REFERENCES "phases"("phase_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players_events_events" ADD CONSTRAINT "FK_9541e7ab84b817e362a6239a7bd" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "players_events_events" ADD CONSTRAINT "FK_2c9e2848a831ae46b0cb51f796c" FOREIGN KEY ("eventsEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players_categories_categories" ADD CONSTRAINT "FK_7327e75a72d56ece415f4cfc3c9" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "players_categories_categories" ADD CONSTRAINT "FK_b42397343ccaff062735ee26c0f" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players_categories_categories" DROP CONSTRAINT "FK_b42397343ccaff062735ee26c0f"`);
        await queryRunner.query(`ALTER TABLE "players_categories_categories" DROP CONSTRAINT "FK_7327e75a72d56ece415f4cfc3c9"`);
        await queryRunner.query(`ALTER TABLE "players_events_events" DROP CONSTRAINT "FK_2c9e2848a831ae46b0cb51f796c"`);
        await queryRunner.query(`ALTER TABLE "players_events_events" DROP CONSTRAINT "FK_9541e7ab84b817e362a6239a7bd"`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00"`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_197078e493ca616e59cb1251af1"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_5941177c5993a43cd8861445eec"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_221184c43396fbd1534af86d21d"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_b42778656ea05283d2862a0dde7"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_018031936fcadc099aefd7ec3db"`);
        await queryRunner.query(`ALTER TABLE "phases" DROP CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b42397343ccaff062735ee26c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7327e75a72d56ece415f4cfc3c"`);
        await queryRunner.query(`DROP TABLE "players_categories_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c9e2848a831ae46b0cb51f796"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9541e7ab84b817e362a6239a7b"`);
        await queryRunner.query(`DROP TABLE "players_events_events"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71d0f2d4a8c2276cd3e1e716f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_197078e493ca616e59cb1251af"`);
        await queryRunner.query(`DROP TABLE "phases_musics_musics"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "scores"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "phases"`);
        await queryRunner.query(`DROP TABLE "musics"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
