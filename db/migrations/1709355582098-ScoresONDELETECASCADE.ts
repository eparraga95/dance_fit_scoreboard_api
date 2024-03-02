import { MigrationInterface, QueryRunner } from "typeorm";

export class ScoresONDELETECASCADE1709355582098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_b42778656ea05283d2862a0dde7"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_221184c43396fbd1534af86d21d"`)
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_b42778656ea05283d2862a0dde7" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71" FOREIGN KEY ("musicMusicId") REFERENCES "musics"("music_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_221184c43396fbd1534af86d21d" FOREIGN KEY ("phasePhaseId") REFERENCES "phases"("phase_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_b42778656ea05283d2862a0dde7"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71"`)
        await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_221184c43396fbd1534af86d21d"`)
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_0a8b9c794f83711c2fadfa5d849" FOREIGN KEY ("playerPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_b42778656ea05283d2862a0dde7" FOREIGN KEY ("eventEventId") REFERENCES "events"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_4b4b31cc535a8da41d5201766b7" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_5d25fdd27f0980fff023e6afd71" FOREIGN KEY ("musicMusicId") REFERENCES "musics"("music_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scores" ADD CONSTRAINT "FK_221184c43396fbd1534af86d21d" FOREIGN KEY ("phasePhaseId") REFERENCES "phases"("phase_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
