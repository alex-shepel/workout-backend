import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTrainingTable1675238946387 implements MigrationInterface {
  name = 'UpdateTrainingTable1675238946387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "Date"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP COLUMN "Date"`);
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD "CreatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "trainings" ADD "SequentialNumber" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD "Completed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ADD "CreatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "sets" ADD "Completed" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD "CompletedCount" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "LastLogoutDate" SET DEFAULT '"2023-02-01T08:09:11.869Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "LastLogoutDate" SET DEFAULT '2023-01-31 06:56:59.349'`,
    );
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "CompletedCount"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP COLUMN "Completed"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP COLUMN "CreatedDate"`);
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "Completed"`);
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "SequentialNumber"`);
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "UpdatedDate"`);
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "CreatedDate"`);
    await queryRunner.query(
      `ALTER TABLE "sets" ADD "Date" TIMESTAMP NOT NULL DEFAULT '2023-01-31 06:56:59.345'`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD "Date" TIMESTAMP NOT NULL DEFAULT '2023-01-31 06:56:59.344'`,
    );
  }
}
