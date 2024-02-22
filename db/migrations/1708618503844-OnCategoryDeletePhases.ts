import { MigrationInterface, QueryRunner } from "typeorm";

export class OnCategoryDeletePhases1708618503844 implements MigrationInterface {
    name = 'OnCategoryDeletePhases1708618503844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phases" DROP CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03"`);
        await queryRunner.query(`ALTER TABLE "phases" ADD CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phases" DROP CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03"`);
        await queryRunner.query(`ALTER TABLE "phases" ADD CONSTRAINT "FK_46a561f4176bc3d772dff4a1b03" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
