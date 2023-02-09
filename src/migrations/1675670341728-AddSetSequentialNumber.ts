import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSetSequentialNumber1675670341728 implements MigrationInterface {
  name = 'AddSetSequentialNumber1675670341728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sets" ADD "SequentialNumber" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sets" DROP COLUMN "SequentialNumber"`);
  }
}
