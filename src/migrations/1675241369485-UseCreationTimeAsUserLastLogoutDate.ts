import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseCreationTimeAsUserLastLogoutDate1675241369485 implements MigrationInterface {
  name = 'UseCreationTimeAsUserLastLogoutDate1675241369485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" date NOT NULL DEFAULT ('now'::text)::date`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" TIMESTAMP NOT NULL DEFAULT '2023-02-01 08:28:38.902'`,
    );
  }
}
