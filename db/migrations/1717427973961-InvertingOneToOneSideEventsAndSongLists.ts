import { MigrationInterface, QueryRunner } from "typeorm";

export class InvertingOneToOneSideEventsAndSongLists1717427973961 implements MigrationInterface {
    name = 'InvertingOneToOneSideEventsAndSongLists1717427973961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_7123f02de3b501cb32dc3c281c3"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "UQ_7123f02de3b501cb32dc3c281c3"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "songListSongListId"`);
        await queryRunner.query(`ALTER TABLE "song_lists" ADD "eventEventId" bigint`);
        await queryRunner.query(`ALTER TABLE "song_lists" ADD CONSTRAINT "UQ_7b4a1059ad6f5bbabdd3cdb0908" UNIQUE ("eventEventId")`);
        await queryRunner.query(`ALTER TABLE "song_lists" ADD CONSTRAINT "FK_7b4a1059ad6f5bbabdd3cdb0908" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_lists" DROP CONSTRAINT "FK_7b4a1059ad6f5bbabdd3cdb0908"`);
        await queryRunner.query(`ALTER TABLE "song_lists" DROP CONSTRAINT "UQ_7b4a1059ad6f5bbabdd3cdb0908"`);
        await queryRunner.query(`ALTER TABLE "song_lists" DROP COLUMN "eventEventId"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "songListSongListId" bigint`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "UQ_7123f02de3b501cb32dc3c281c3" UNIQUE ("songListSongListId")`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_7123f02de3b501cb32dc3c281c3" FOREIGN KEY ("songListSongListId") REFERENCES "song_lists"("song_list_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
