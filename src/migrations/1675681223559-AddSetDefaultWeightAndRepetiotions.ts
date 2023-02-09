import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSetDefaultWeightAndRepetiotions1675681223559 implements MigrationInterface {
  name = 'AddSetDefaultWeightAndRepetiotions1675681223559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sets" ALTER COLUMN "Weight" SET DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE "sets" ALTER COLUMN "Repetitions" SET DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sets" ALTER COLUMN "Repetitions" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "sets" ALTER COLUMN "Weight" DROP DEFAULT`);
  }
}
