import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1708371368381 implements MigrationInterface {
    name = 'Tables1708371368381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "musics" ("music_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, "mode" character varying NOT NULL, CONSTRAINT "PK_70201b0dbf70791aaa02de575a3" PRIMARY KEY ("music_id"))`);
        await queryRunner.query(`CREATE TABLE "scores" ("score_id" BIGSERIAL NOT NULL, "value" integer NOT NULL, "grade" character varying NOT NULL, "plate" character varying NOT NULL, "validated" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "playerPlayerId" bigint, "eventEventId" bigint, "categoryCategoryId" bigint, "musicMusicId" bigint, "phasePhaseId" bigint, CONSTRAINT "PK_b164c6cd21a79e8adac5718947e" PRIMARY KEY ("score_id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("player_id" BIGSERIAL NOT NULL, "nickname" character varying NOT NULL, "password" character varying NOT NULL, "profilePicture" character varying, "role" character varying NOT NULL, CONSTRAINT "UQ_b087be71894b730ec150a1ed458" UNIQUE ("nickname"), CONSTRAINT "PK_7274d067b855d5824050aaf5e68" PRIMARY KEY ("player_id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("event_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_dfa3d03bef3f90f650fd138fb38" UNIQUE ("name"), CONSTRAINT "PK_1b77463a4487f09e798dffcb43a" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "level_min" integer NOT NULL, "level_max" integer NOT NULL, "number_of_phases" integer NOT NULL, "eventEventId" bigint, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "phases" ("phase_id" BIGSERIAL NOT NULL, "phase_number" integer NOT NULL, "music_number" integer NOT NULL, "modes_available" text array NOT NULL, "passing_players" integer NOT NULL, "categoryCategoryId" bigint, CONSTRAINT "PK_3340426679fb41e2187c1f028c8" PRIMARY KEY ("phase_id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("session_id" BIGSERIAL NOT NULL, "token" character varying NOT NULL, "playerPlayerId" bigint, CONSTRAINT "REL_a3886aae861f3a1e644f9632ba" UNIQUE ("playerPlayerId"), CONSTRAINT "PK_9340188c93349808f10d1db74a8" PRIMARY KEY ("session_id"))`);
        await queryRunner.query(`CREATE TABLE "events_players_players" ("eventsEventId" bigint NOT NULL, "playersPlayerId" bigint NOT NULL, CONSTRAINT "PK_4b629d9980bf0d77bcd452e037b" PRIMARY KEY ("eventsEventId", "playersPlayerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d29f443458b5bfa5641f846414" ON "events_players_players" ("eventsEventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eb7a3df23517fe794fed5765f6" ON "events_players_players" ("playersPlayerId") `);
        await queryRunner.query(`CREATE TABLE "categories_players_players" ("categoriesCategoryId" bigint NOT NULL, "playersPlayerId" bigint NOT NULL, CONSTRAINT "PK_0a0fddfd311e9ab089e40c14a32" PRIMARY KEY ("categoriesCategoryId", "playersPlayerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4aa54dc7443c3df204bf3483a1" ON "categories_players_players" ("categoriesCategoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_98d633ebd345281abf2e5dc189" ON "categories_players_players" ("playersPlayerId") `);
        await queryRunner.query(`CREATE TABLE "phases_musics_musics" ("phasesPhaseId" bigint NOT NULL, "musicsMusicId" bigint NOT NULL, CONSTRAINT "PK_b03a04092f0063a7d6943196869" PRIMARY KEY ("phasesPhaseId", "musicsMusicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_197078e493ca616e59cb1251af" ON "phases_musics_musics" ("phasesPhaseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71d0f2d4a8c2276cd3e1e716f0" ON "phases_musics_musics" ("musicsMusicId") `);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_b42778656ea05283d2862a0dde7" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71" FOREIGN KEY ("musicMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_221184c43396fbd1534af86d21d" FOREIGN KEY ("phasePhaseId") REFERENCES "phases"("phase_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_018031936fcadc099aefd7ec3db" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phases" ADD CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_a3886aae861f3a1e644f9632ba3" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_players_players" ADD CONSTRAINT "FK_d29f443458b5bfa5641f846414d" FOREIGN KEY ("eventsEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_players_players" ADD CONSTRAINT "FK_eb7a3df23517fe794fed5765f64" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_players_players" ADD CONSTRAINT "FK_4aa54dc7443c3df204bf3483a19" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_players_players" ADD CONSTRAINT "FK_98d633ebd345281abf2e5dc189b" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_197078e493ca616e59cb1251af1" FOREIGN KEY ("phasesPhaseId") REFERENCES "phases"("phase_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00"`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_197078e493ca616e59cb1251af1"`);
        await queryRunner.query(`ALTER TABLE "categories_players_players" DROP CONSTRAINT "FK_98d633ebd345281abf2e5dc189b"`);
        await queryRunner.query(`ALTER TABLE "categories_players_players" DROP CONSTRAINT "FK_4aa54dc7443c3df204bf3483a19"`);
        await queryRunner.query(`ALTER TABLE "events_players_players" DROP CONSTRAINT "FK_eb7a3df23517fe794fed5765f64"`);
        await queryRunner.query(`ALTER TABLE "events_players_players" DROP CONSTRAINT "FK_d29f443458b5bfa5641f846414d"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_a3886aae861f3a1e644f9632ba3"`);
        await queryRunner.query(`ALTER TABLE "phases" DROP CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_018031936fcadc099aefd7ec3db"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_221184c43396fbd1534af86d21d"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_b42778656ea05283d2862a0dde7"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71d0f2d4a8c2276cd3e1e716f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_197078e493ca616e59cb1251af"`);
        await queryRunner.query(`DROP TABLE "phases_musics_musics"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98d633ebd345281abf2e5dc189"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4aa54dc7443c3df204bf3483a1"`);
        await queryRunner.query(`DROP TABLE "categories_players_players"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb7a3df23517fe794fed5765f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d29f443458b5bfa5641f846414"`);
        await queryRunner.query(`DROP TABLE "events_players_players"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "phases"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "scores"`);
        await queryRunner.query(`DROP TABLE "musics"`);
    }

}
