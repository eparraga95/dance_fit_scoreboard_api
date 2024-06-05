import { MigrationInterface, QueryRunner } from "typeorm";

export class EnrollmentsAndItsRelations1717513905376 implements MigrationInterface {
    name = 'EnrollmentsAndItsRelations1717513905376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enrollments" ("enrollment_id" BIGSERIAL NOT NULL, "eventEventId" bigint, "playerPlayerId" bigint, CONSTRAINT "PK_3e9102cadbf8e3aaabc5acc6042" PRIMARY KEY ("enrollment_id"))`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_1472317b4f04bd475399697a0e4" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollments" ADD CONSTRAINT "FK_0c3835c341c623c949b6487cdca" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_0c3835c341c623c949b6487cdca"`);
        await queryRunner.query(`ALTER TABLE "enrollments" DROP CONSTRAINT "FK_1472317b4f04bd475399697a0e4"`);
        await queryRunner.query(`DROP TABLE "enrollments"`);
    }

}
