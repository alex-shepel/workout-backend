import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AllowTemplateTitleDuplicates1679236095037 implements MigrationInterface {
  name = 'AllowTemplateTitleDuplicates1679236095037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" DROP CONSTRAINT "UQ_024940cb7e955a71961af0f8fae"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "templates" ADD CONSTRAINT "UQ_024940cb7e955a71961af0f8fae" UNIQUE ("Title")`,
    );
  }
}
