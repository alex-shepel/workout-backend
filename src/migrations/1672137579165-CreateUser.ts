import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1672137579165 implements MigrationInterface {
  name = 'CreateUser1672137579165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("ID" SERIAL NOT NULL, "Email" character varying NOT NULL, "Name" character varying, "Password" character varying NOT NULL, CONSTRAINT "UQ_f73ebcea50dd1c375f20260dbe4" UNIQUE ("Email"), CONSTRAINT "PK_5763954075431ddd0821cd906da" PRIMARY KEY ("ID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
