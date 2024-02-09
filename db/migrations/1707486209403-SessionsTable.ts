import { MigrationInterface, QueryRunner } from "typeorm";

export class SessionsTable1707486209403 implements MigrationInterface {
    name = 'SessionsTable1707486209403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sessions" ("session_id" BIGSERIAL NOT NULL, "token" character varying NOT NULL, "playerPlayerId" bigint, CONSTRAINT "REL_a3886aae861f3a1e644f9632ba" UNIQUE ("playerPlayerId"), CONSTRAINT "PK_9340188c93349808f10d1db74a8" PRIMARY KEY ("session_id"))`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_a3886aae861f3a1e644f9632ba3" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_a3886aae861f3a1e644f9632ba3"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
    }

}
