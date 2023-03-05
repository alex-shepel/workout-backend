import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowGroupTitlesDuplications1678019867641 implements MigrationInterface {
  name = 'AllowGroupTitlesDuplications1678019867641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "UQ_f1038e09bafe73f1fe024d02bb9"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "UQ_f1038e09bafe73f1fe024d02bb9" UNIQUE ("Title")`,
    );
  }
}
