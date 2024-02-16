import { MigrationInterface, QueryRunner } from "typeorm";

export class PhasesManyToManyMusics1708016252146 implements MigrationInterface {
    name = 'PhasesManyToManyMusics1708016252146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phases_musics_musics" ("phasesPhaseId" bigint NOT NULL, "musicsMusicId" bigint NOT NULL, CONSTRAINT "PK_b03a04092f0063a7d6943196869" PRIMARY KEY ("phasesPhaseId", "musicsMusicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_197078e493ca616e59cb1251af" ON "phases_musics_musics" ("phasesPhaseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71d0f2d4a8c2276cd3e1e716f0" ON "phases_musics_musics" ("musicsMusicId") `);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_197078e493ca616e59cb1251af1" FOREIGN KEY ("phasesPhaseId") REFERENCES "phases"("phase_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" ADD CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00" FOREIGN KEY ("musicsMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_71d0f2d4a8c2276cd3e1e716f00"`);
        await queryRunner.query(`ALTER TABLE "phases_musics_musics" DROP CONSTRAINT "FK_197078e493ca616e59cb1251af1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71d0f2d4a8c2276cd3e1e716f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_197078e493ca616e59cb1251af"`);
        await queryRunner.query(`DROP TABLE "phases_musics_musics"`);
    }

}
