import { MigrationInterface, QueryRunner } from "typeorm";

export class ComfortLevelsTable1711535550290 implements MigrationInterface {
    name = 'ComfortLevelsTable1711535550290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comfort_levels" ("comfort_level_id" BIGSERIAL NOT NULL, "level_single" integer, "level_double" integer, "playerPlayerId" bigint, "eventEventId" bigint, CONSTRAINT "PK_bbd9e8e6c269dc37363b34e6714" PRIMARY KEY ("comfort_level_id"))`);
        await queryRunner.query(`ALTER TABLE "comfort_levels" ADD CONSTRAINT "FK_e6be435c2e61878fe11ce602b4b" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comfort_levels" ADD CONSTRAINT "FK_82a097ae6ba05133f330a3e7aec" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comfort_levels" DROP CONSTRAINT "FK_82a097ae6ba05133f330a3e7aec"`);
        await queryRunner.query(`ALTER TABLE "comfort_levels" DROP CONSTRAINT "FK_e6be435c2e61878fe11ce602b4b"`);
        await queryRunner.query(`DROP TABLE "comfort_levels"`);
    }

}
