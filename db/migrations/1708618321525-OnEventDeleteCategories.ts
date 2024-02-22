import { MigrationInterface, QueryRunner } from "typeorm";

export class OnEventDeleteCategories1708618321525 implements MigrationInterface {
    name = 'OnEventDeleteCategories1708618321525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_018031936fcadc099aefd7ec3db"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_018031936fcadc099aefd7ec3db" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_018031936fcadc099aefd7ec3db"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_018031936fcadc099aefd7ec3db" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
