import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeTables1670771398657 implements MigrationInterface {
  name = 'InitializeTables1670771398657';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercises" ("ID" SERIAL NOT NULL, "Title" character varying NOT NULL, "Description" character varying NOT NULL, "GroupID" integer NOT NULL, CONSTRAINT "PK_6773a16bbd292dcc2ff41ea1c3e" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises_groups" ("ID" SERIAL NOT NULL, "Title" character varying NOT NULL, "Description" character varying NOT NULL, CONSTRAINT "PK_5c95bda0c7f6f954d7e915a1cf5" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "templates" ("ID" SERIAL NOT NULL, "Title" character varying NOT NULL, "Description" character varying NOT NULL, CONSTRAINT "PK_fc8ecd76e89352749f47967451f" PRIMARY KEY ("ID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "templates"`);
    await queryRunner.query(`DROP TABLE "exercises_groups"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
  }
}
