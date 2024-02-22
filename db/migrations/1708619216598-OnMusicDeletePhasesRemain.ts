import { MigrationInterface, QueryRunner } from "typeorm";

export class OnMusicDeletePhasesRemain1708619216598 implements MigrationInterface {
    name = 'OnMusicDeletePhasesRemain1708619216598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00"`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00"`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
