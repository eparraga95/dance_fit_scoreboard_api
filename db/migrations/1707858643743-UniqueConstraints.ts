import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstraints1707858643743 implements MigrationInterface {
    name = 'UniqueConstraints1707858643743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "UQ_b087be71894b730ec150a1ed458" UNIQUE ("nickname")`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "UQ_dfa3d03bef3f90f650fd138fb38" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "musics" ADD CONSTRAINT "UQ_0380df45d388e95a33e8c4d9972" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "musics" DROP CONSTRAINT "UQ_0380df45d388e95a33e8c4d9972"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "UQ_dfa3d03bef3f90f650fd138fb38"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "UQ_b087be71894b730ec150a1ed458"`);
    }

}
