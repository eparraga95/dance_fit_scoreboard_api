import { MigrationInterface, QueryRunner } from "typeorm";

export class EventTypesAndRelations1711373116141 implements MigrationInterface {
    name = 'EventTypesAndRelations1711373116141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_types" ("event_type_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d5110ab69f4aacfe41fecdf4fcd" UNIQUE ("name"), CONSTRAINT "PK_240ad7f0de69ed293bbee56c949" PRIMARY KEY ("event_type_id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD "eventTypeEventTypeId" bigint`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_99ebfe0d8adcff715eafae9ba21" FOREIGN KEY ("eventTypeEventTypeId") REFERENCES "event_types"("event_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_99ebfe0d8adcff715eafae9ba21"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "eventTypeEventTypeId"`);
        await queryRunner.query(`DROP TABLE "event_types"`);
    }

}
