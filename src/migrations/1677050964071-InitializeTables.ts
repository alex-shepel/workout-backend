import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InitializeTables1677050964071 implements MigrationInterface {
  name = 'InitializeTables1677050964071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "templates" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Description" character varying NOT NULL DEFAULT '', "SequentialNumber" integer NOT NULL, "userID" uuid, CONSTRAINT "UQ_024940cb7e955a71961af0f8fae" UNIQUE ("Title"), CONSTRAINT "PK_fc8ecd76e89352749f47967451f" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "trainings" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "Completed" boolean NOT NULL DEFAULT false, "templateID" uuid, "userID" uuid, CONSTRAINT "PK_3b66ca94688e3cbf3cc3303f596" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sets" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedDate" TIMESTAMP NOT NULL DEFAULT now(), "SequentialNumber" integer NOT NULL, "Weight" integer NOT NULL DEFAULT '0', "Repetitions" integer NOT NULL DEFAULT '0', "Completed" boolean NOT NULL DEFAULT false, "exerciseID" uuid, "trainingID" uuid, "userID" uuid, CONSTRAINT "PK_83df3eb4c2fd41cc3393e68279a" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monitors" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "LastTemplateSequentialNumber" integer NOT NULL DEFAULT '0', "TrainingsCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_5505d092093320d0d60a27ee3ee" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Email" character varying NOT NULL, "Name" character varying, "Password" character varying NOT NULL, "LastLogoutDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f73ebcea50dd1c375f20260dbe4" UNIQUE ("Email"), CONSTRAINT "PK_5763954075431ddd0821cd906da" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Description" character varying NOT NULL DEFAULT '', "userID" uuid, CONSTRAINT "UQ_f1038e09bafe73f1fe024d02bb9" UNIQUE ("Title"), CONSTRAINT "PK_0aa094efa82d1d6225b50661075" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Title" character varying NOT NULL, "Description" character varying NOT NULL DEFAULT '', "CompletedCount" integer NOT NULL DEFAULT '0', "groupID" uuid, "userID" uuid, CONSTRAINT "PK_6773a16bbd292dcc2ff41ea1c3e" PRIMARY KEY ("ID"))`,
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
      `CREATE TABLE "trainings_exercises_exercises" ("trainingsID" uuid NOT NULL, "exercisesID" uuid NOT NULL, CONSTRAINT "PK_db25d94d1e7d34d63c409d047c6" PRIMARY KEY ("trainingsID", "exercisesID"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_254334dcc36301ffa3a6bc36c1" ON "trainings_exercises_exercises" ("trainingsID") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_068696b0584b6893f4235e42e2" ON "trainings_exercises_exercises" ("exercisesID") `,
    );
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "FK_88ccd738b13d4a4e4ef8ea71612" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_978405406510490129e2c999682" FOREIGN KEY ("templateID") REFERENCES "templates"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_feb0d2479b755974f80f73d0c14" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_146f173dba03f78ea34b279ed57" FOREIGN KEY ("exerciseID") REFERENCES "exercises"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6" FOREIGN KEY ("trainingID") REFERENCES "trainings"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_e5dcccf930a65131113f213992a" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_302502fffc28ba5c87abac76254" FOREIGN KEY ("userID") REFERENCES "users"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_254334dcc36301ffa3a6bc36c15" FOREIGN KEY ("trainingsID") REFERENCES "trainings"("ID") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_068696b0584b6893f4235e42e29" FOREIGN KEY ("exercisesID") REFERENCES "exercises"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_068696b0584b6893f4235e42e29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_254334dcc36301ffa3a6bc36c15"`,
    );
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
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_302502fffc28ba5c87abac76254"`,
    );
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_e5dcccf930a65131113f213992a"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_146f173dba03f78ea34b279ed57"`);
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_feb0d2479b755974f80f73d0c14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_978405406510490129e2c999682"`,
    );
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "FK_88ccd738b13d4a4e4ef8ea71612"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_068696b0584b6893f4235e42e2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_254334dcc36301ffa3a6bc36c1"`);
    await queryRunner.query(`DROP TABLE "trainings_exercises_exercises"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d24a6649737b3d19aedca76a2a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_161ce44cf9a5f4fdd7f49a2a80"`);
    await queryRunner.query(`DROP TABLE "templates_exercises_exercises"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "monitors"`);
    await queryRunner.query(`DROP TABLE "sets"`);
    await queryRunner.query(`DROP TABLE "trainings"`);
    await queryRunner.query(`DROP TABLE "templates"`);
  }
}
