import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinMonitorsColumnIntoUsersTable1677058561597 implements MigrationInterface {
  name = 'JoinMonitorsColumnIntoUsersTable1677058561597';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "monitorID" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_6dd052627f89ae78a2475d67478" UNIQUE ("monitorID")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_6dd052627f89ae78a2475d67478" FOREIGN KEY ("monitorID") REFERENCES "monitors"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6dd052627f89ae78a2475d67478"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6dd052627f89ae78a2475d67478"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "monitorID"`);
  }
}
