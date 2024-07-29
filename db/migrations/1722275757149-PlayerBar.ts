import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerBar1722275757149 implements MigrationInterface {
    name = 'PlayerBar1722275757149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" ADD "bar" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "bar"`);
    }

}
