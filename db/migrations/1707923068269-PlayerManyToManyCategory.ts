import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerManyToManyCategory1707923068269 implements MigrationInterface {
    name = 'PlayerManyToManyCategory1707923068269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories_players_players" ("categoriesCategoryId" bigint NOT NULL, "playersPlayerId" bigint NOT NULL, CONSTRAINT "PK_0a0fddfd311e9ab089e40c14a32" PRIMARY KEY ("categoriesCategoryId", "playersPlayerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4aa54dc7443c3df204bf3483a1" ON "categories_players_players" ("categoriesCategoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_98d633ebd345281abf2e5dc189" ON "categories_players_players" ("playersPlayerId") `);
        await queryRunner.query(`ALTER TABLE "categories_players_players" ADD CONSTRAINT "FK_4aa54dc7443c3df204bf3483a19" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_players_players" ADD CONSTRAINT "FK_98d633ebd345281abf2e5dc189b" FOREIGN KEY ("playersPlayerId") REFERENCES "players"("player_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_players_players" DROP CONSTRAINT "FK_98d633ebd345281abf2e5dc189b"`);
        await queryRunner.query(`ALTER TABLE "categories_players_players" DROP CONSTRAINT "FK_4aa54dc7443c3df204bf3483a19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98d633ebd345281abf2e5dc189"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4aa54dc7443c3df204bf3483a1"`);
        await queryRunner.query(`DROP TABLE "categories_players_players"`);
    }

}
