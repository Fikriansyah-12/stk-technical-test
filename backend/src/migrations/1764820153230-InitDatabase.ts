import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1764820153230 implements MigrationInterface {
    name = 'InitDatabase1764820153230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parentId" uuid, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menus" ADD CONSTRAINT "FK_8523e13f1ba719e16eb474657ec" FOREIGN KEY ("parentId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_8523e13f1ba719e16eb474657ec"`);
        await queryRunner.query(`DROP TABLE "menus"`);
    }

}
