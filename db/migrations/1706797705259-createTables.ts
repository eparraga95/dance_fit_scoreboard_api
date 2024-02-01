import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1706797705259 implements MigrationInterface {
    name = 'CreateTables1706797705259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" ("player_id" BIGSERIAL NOT NULL, "nickname" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_7274d067b855d5824050aaf5e68" PRIMARY KEY ("player_id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("event_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "starttime" character varying NOT NULL, "endtime" character varying NOT NULL, CONSTRAINT "PK_1b77463a4487f09e798dffcb43a" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`CREATE TABLE "scores" ("score_id" BIGSERIAL NOT NULL, "value" integer NOT NULL, "music" character varying NOT NULL, "mode" character varying NOT NULL, "level" integer NOT NULL, "grade" character varying NOT NULL, "plate" character varying NOT NULL, "validated" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL, "playerPlayerId" bigint, "eventEventId" bigint, CONSTRAINT "PK_b164c6cd21a79e8adac5718947e" PRIMARY KEY ("score_id"))`);
        await queryRunner.query(`CREATE TABLE "events_players_players" ("eventsEventId" bigint NOT NULL, "playersPlayerId" bigint NOT NULL, CONSTRAINT "PK_4b629d9980bf0d77bcd452e037b" PRIMARY KEY ("eventsEventId", "playersPlayerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d29f443458b5bfa5641f846414" ON "events_players_players" ("eventsEventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eb7a3df23517fe794fed5765f6" ON "events_players_players" ("playersPlayerId") `);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_b42778656ea05283d2862a0dde7" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events_players_players" ADD CONSTRAINT "FK_d29f443458b5bfa5641f846414d" FOREIGN KEY ("eventsEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events_players_players" ADD CONSTRAINT "FK_eb7a3df23517fe794fed5765f64" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events_players_players" DROP CONSTRAINT "FK_eb7a3df23517fe794fed5765f64"`);
        await queryRunner.query(`ALTER TABLE "events_players_players" DROP CONSTRAINT "FK_d29f443458b5bfa5641f846414d"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_b42778656ea05283d2862a0dde7"`);
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb7a3df23517fe794fed5765f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d29f443458b5bfa5641f846414"`);
        await queryRunner.query(`DROP TABLE "events_players_players"`);
        await queryRunner.query(`DROP TABLE "scores"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
