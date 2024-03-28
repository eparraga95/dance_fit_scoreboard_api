import { MigrationInterface, QueryRunner } from "typeorm";

export class SongListsTable1711640201522 implements MigrationInterface {
    name = 'SongListsTable1711640201522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song_lists" ("song_list_id" BIGSERIAL NOT NULL, CONSTRAINT "PK_6fd26c09c02116065bc260c492e" PRIMARY KEY ("song_list_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "song_lists"`);
    }

}
