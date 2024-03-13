import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovingSessions1710352710121 implements MigrationInterface {
    name = 'RemovingSessions1710352710121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_5941177c5993a43cd8861445eec"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "REL_5941177c5993a43cd8861445ee"`);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "sessionPlayerId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" ADD "sessionPlayerId" bigint`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "REL_5941177c5993a43cd8861445ee" UNIQUE ("sessionPlayerId")`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_5941177c5993a43cd8861445eec" FOREIGN KEY ("sessionPlayerId") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
