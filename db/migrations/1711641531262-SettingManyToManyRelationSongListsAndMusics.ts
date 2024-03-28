import { MigrationInterface, QueryRunner } from "typeorm";

export class SettingManyToManyRelationSongListsAndMusics1711641531262 implements MigrationInterface {
    name = 'SettingManyToManyRelationSongListsAndMusics1711641531262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song_lists_musics_musics" ("songListsSongListId" bigint NOT NULL, "musicsMusicId" bigint NOT NULL, CONSTRAINT "PK_5ebdbadea7f71867882b7d44a42" PRIMARY KEY ("songListsSongListId", "musicsMusicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04c9bdbb97860ed1ba6d040853" ON "song_lists_musics_musics" ("songListsSongListId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b6ff4251cd671975492dfeb8b6" ON "song_lists_musics_musics" ("musicsMusicId") `);
        await queryRunner.query(`ALTER TABLE "song_lists_musics_musics" ADD CONSTRAINT "FK_04c9bdbb97860ed1ba6d0408538" FOREIGN KEY ("songListsSongListId") REFERENCES "song_lists"("song_list_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "song_lists_musics_musics" ADD CONSTRAINT "FK_b6ff4251cd671975492dfeb8b6b" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_lists_musics_musics" DROP CONSTRAINT "FK_b6ff4251cd671975492dfeb8b6b"`);
        await queryRunner.query(`ALTER TABLE "song_lists_musics_musics" DROP CONSTRAINT "FK_04c9bdbb97860ed1ba6d0408538"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b6ff4251cd671975492dfeb8b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04c9bdbb97860ed1ba6d040853"`);
        await queryRunner.query(`DROP TABLE "song_lists_musics_musics"`);
    }

}
