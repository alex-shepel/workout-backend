import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveTrainingsTemplatesRelation1678174862397 implements MigrationInterface {
  name = 'RemoveTrainingsTemplatesRelation1678174862397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trainings" DROP CONSTRAINT "FK_978405406510490129e2c999682"`,
    );
    await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "templateID"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "trainings" ADD "templateID" uuid`);
    await queryRunner.query(
      `ALTER TABLE "trainings" ADD CONSTRAINT "FK_978405406510490129e2c999682" FOREIGN KEY ("templateID") REFERENCES "templates"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
