import { MigrationInterface, QueryRunner } from "typeorm";

export class OnEventDeleteSongList1717428246247 implements MigrationInterface {
    name = 'OnEventDeleteSongList1717428246247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_lists" DROP CONSTRAINT "FK_7b4a1059ad6f5bbabdd3cdb0908"`);
        await queryRunner.query(`ALTER TABLE "song_lists" ADD CONSTRAINT "FK_7b4a1059ad6f5bbabdd3cdb0908" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_lists" DROP CONSTRAINT "FK_7b4a1059ad6f5bbabdd3cdb0908"`);
        await queryRunner.query(`ALTER TABLE "song_lists" ADD CONSTRAINT "FK_7b4a1059ad6f5bbabdd3cdb0908" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
