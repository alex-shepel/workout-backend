import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserLastLogoutDateToTimestampz1675278135019 implements MigrationInterface {
  name = 'ChangeUserLastLogoutDateToTimestampz1675278135019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "LastLogoutDate"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "LastLogoutDate" date NOT NULL DEFAULT ('now'::text)::date`,
    );
  }
}
