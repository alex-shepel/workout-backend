import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserLastLogoutColumn1673949447988 implements MigrationInterface {
  name = 'AddUserLastLogoutColumn1673949447988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" character varying NOT NULL DEFAULT 'Tue Jan 17 2023 11:57:33 GMT+0200 (Eastern European Standard Time)'`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "UQ_909ecb74d7b68666d4709e38824"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "UQ_909ecb74d7b68666d4709e38824" UNIQUE ("Title")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
  }
}
