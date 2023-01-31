import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrainingTemplateRelation1675148214191 implements MigrationInterface {
  name = 'AddTrainingTemplateRelation1675148214191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trainings" ADD "templateID" uuid`);
    await queryRunner.query(
      `ALTER TABLE "trainings" ALTER COLUMN "Date" SET DEFAULT '"2023-01-31T06:56:59.344Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ALTER COLUMN "Date" SET DEFAULT '"2023-01-31T06:56:59.345Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "LastLogoutDate" SET DEFAULT '"2023-01-31T06:56:59.349Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_978405406510490129e2c999682" FOREIGN KEY ("templateID") REFERENCES "templates"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_978405406510490129e2c999682"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "LastLogoutDate" SET DEFAULT '2023-01-29 15:01:41.959'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ALTER COLUMN "Date" SET DEFAULT '2023-01-29 15:01:41.954'`,
    );
    await queryRunner.query(
      `ALTER TABLE "trainings" ALTER COLUMN "Date" SET DEFAULT '2023-01-29 15:01:41.954'`,
    );
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "templateID"`);
  }
}
