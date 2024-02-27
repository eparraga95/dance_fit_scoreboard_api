import { MigrationInterface, QueryRunner } from "typeorm";

export class OnCategoryDeletePlayerRelations1709036215840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players_categories_categories" DROP CONSTRAINT "FK_b42397343ccaff062735ee26c0f"`)
        await queryRunner.query(`ALTER TABLE "players_categories_categories" ADD CONSTRAINT "FK_b42397343ccaff062735ee26c0f" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players_categories_categories" DROP CONSTRAINT "FK_b42397343ccaff062735ee26c0f"`)
        await queryRunner.query(`ALTER TABLE "players_categories_categories" ADD CONSTRAINT "FK_b42397343ccaff062735ee26c0f" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
