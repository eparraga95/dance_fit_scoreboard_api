import { MigrationInterface, QueryRunner } from "typeorm";

export class NotDealingWithTimesNow1706886360943 implements MigrationInterface {
    name = 'NotDealingWithTimesNow1706886360943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "starttime"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "endtime"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "endtime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "starttime" character varying NOT NULL`);
    }

}
