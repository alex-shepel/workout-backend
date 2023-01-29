import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrainingsAndSetsTables1675004496813 implements MigrationInterface {
  name = 'CreateTrainingsAndSetsTables1675004496813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trainings" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Date" TIMESTAMP NOT NULL DEFAULT '"2023-01-29T15:01:41.954Z"', "userID" uuid, CONSTRAINT "PK_3b66ca94688e3cbf3cc3303f596" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sets" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "Date" TIMESTAMP NOT NULL DEFAULT '"2023-01-29T15:01:41.954Z"', "Weight" integer NOT NULL, "Repetitions" integer NOT NULL, "exerciseID" uuid, "trainingID" uuid, "userID" uuid, CONSTRAINT "PK_83df3eb4c2fd41cc3393e68279a" PRIMARY KEY ("ID"))`,
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
      `CREATE TABLE "exercises_trainings_trainings" ("exercisesID" uuid NOT NULL, "trainingsID" uuid NOT NULL, CONSTRAINT "PK_0cdcfe15803164d9f41b481a3ba" PRIMARY KEY ("exercisesID", "trainingsID"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c88e83928235c230ba5e468fbd" ON "exercises_trainings_trainings" ("exercisesID") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf3da3b8e44ed12d9ccbd270f6" ON "exercises_trainings_trainings" ("trainingsID") `,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" TIMESTAMP NOT NULL DEFAULT '"2023-01-29T15:01:41.959Z"'`,
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
      `ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_254334dcc36301ffa3a6bc36c15" FOREIGN KEY ("trainingsID") REFERENCES "trainings"("ID") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" ADD CONSTRAINT "FK_068696b0584b6893f4235e42e29" FOREIGN KEY ("exercisesID") REFERENCES "exercises"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_trainings_trainings" ADD CONSTRAINT "FK_c88e83928235c230ba5e468fbdd" FOREIGN KEY ("exercisesID") REFERENCES "exercises"("ID") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_trainings_trainings" ADD CONSTRAINT "FK_bf3da3b8e44ed12d9ccbd270f6a" FOREIGN KEY ("trainingsID") REFERENCES "trainings"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises_trainings_trainings" DROP CONSTRAINT "FK_bf3da3b8e44ed12d9ccbd270f6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_trainings_trainings" DROP CONSTRAINT "FK_c88e83928235c230ba5e468fbdd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_068696b0584b6893f4235e42e29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings_exercises_exercises" DROP CONSTRAINT "FK_254334dcc36301ffa3a6bc36c15"`,
    );
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_e5dcccf930a65131113f213992a"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_146f173dba03f78ea34b279ed57"`);
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_feb0d2479b755974f80f73d0c14"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" character varying NOT NULL DEFAULT 'Tue Jan 17 2023 11:57:33 GMT+0200 (Eastern European Standard Time)'`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_bf3da3b8e44ed12d9ccbd270f6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c88e83928235c230ba5e468fbd"`);
    await queryRunner.query(`DROP TABLE "exercises_trainings_trainings"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_068696b0584b6893f4235e42e2"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_254334dcc36301ffa3a6bc36c1"`);
    await queryRunner.query(`DROP TABLE "trainings_exercises_exercises"`);
    await queryRunner.query(`DROP TABLE "sets"`);
    await queryRunner.query(`DROP TABLE "trainings"`);
  }
}
