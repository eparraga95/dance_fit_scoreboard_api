import { MigrationInterface, QueryRunner } from "typeorm";

export class SongListsOneToOneEvents1711640832817 implements MigrationInterface {
    name = 'SongListsOneToOneEvents1711640832817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "songListSongListId" bigint`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "UQ_7123f02de3b501cb32dc3c281c3" UNIQUE ("songListSongListId")`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_7123f02de3b501cb32dc3c281c3" FOREIGN KEY ("songListSongListId") REFERENCES "song_lists"("song_list_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_7123f02de3b501cb32dc3c281c3"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "UQ_7123f02de3b501cb32dc3c281c3"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "songListSongListId"`);
    }

}
