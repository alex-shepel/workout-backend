import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1672668063733 implements MigrationInterface {
  name = 'Initialize1672668063733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Email" character varying NOT NULL, "Name" character varying, "Password" character varying NOT NULL, CONSTRAINT "UQ_f73ebcea50dd1c375f20260dbe4" UNIQUE ("Email"), CONSTRAINT "PK_5763954075431ddd0821cd906da" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Description" character varying NOT NULL DEFAULT '', "userID" uuid, CONSTRAINT "UQ_f1038e09bafe73f1fe024d02bb9" UNIQUE ("Title"), CONSTRAINT "PK_0aa094efa82d1d6225b50661075" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "templates" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Description" character varying NOT NULL DEFAULT '', "userID" uuid, CONSTRAINT "UQ_024940cb7e955a71961af0f8fae" UNIQUE ("Title"), CONSTRAINT "PK_fc8ecd76e89352749f47967451f" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Description" character varying NOT NULL DEFAULT '', "groupID" uuid, "userID" uuid, CONSTRAINT "UQ_909ecb74d7b68666d4709e38824" UNIQUE ("Title"), CONSTRAINT "PK_6773a16bbd292dcc2ff41ea1c3e" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "templates_exercises_exercises" ("templatesID" uuid NOT NULL, "exercisesID" uuid NOT NULL, CONSTRAINT "PK_5c7221c3160ab75c28bc2207eb2" PRIMARY KEY ("templatesID", "exercisesID"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_161ce44cf9a5f4fdd7f49a2a80" ON "templates_exercises_exercises" ("templatesID") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d24a6649737b3d19aedca76a2a" ON "templates_exercises_exercises" ("exercisesID") `,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_302502fffc28ba5c87abac76254" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_88ccd738b13d4a4e4ef8ea71612" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_4443fc8ee25357fbc2cdb414db4" FOREIGN KEY ("groupID") REFERENCES "groups"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_26267a466d7960be53dbc1a8f9e" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates_exercises_exercises" ADD CONSTRAINT "FK_161ce44cf9a5f4fdd7f49a2a803" FOREIGN KEY ("templatesID") REFERENCES "templates"("ID") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates_exercises_exercises" ADD CONSTRAINT "FK_d24a6649737b3d19aedca76a2aa" FOREIGN KEY ("exercisesID") REFERENCES "exercises"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates_exercises_exercises" DROP CONSTRAINT "FK_d24a6649737b3d19aedca76a2aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates_exercises_exercises" DROP CONSTRAINT "FK_161ce44cf9a5f4fdd7f49a2a803"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_26267a466d7960be53dbc1a8f9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_4443fc8ee25357fbc2cdb414db4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_88ccd738b13d4a4e4ef8ea71612"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_302502fffc28ba5c87abac76254"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_d24a6649737b3d19aedca76a2a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_161ce44cf9a5f4fdd7f49a2a80"`);
    await queryRunner.query(`DROP TABLE "templates_exercises_exercises"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
    await queryRunner.query(`DROP TABLE "templates"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
