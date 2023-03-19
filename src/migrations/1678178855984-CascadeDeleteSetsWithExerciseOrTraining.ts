import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CascadeDeleteSetsWithExerciseOrTraining1678178855984
  implements MigrationInterface
{
  name = 'CascadeDeleteSetsWithExerciseOrTraining1678178855984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_146f173dba03f78ea34b279ed57"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6"`);
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_146f173dba03f78ea34b279ed57" FOREIGN KEY ("exerciseID") REFERENCES "exercises"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6" FOREIGN KEY ("trainingID") REFERENCES "trainings"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6"`);
    await queryRunner.query(`ALTER TABLE "sets" DROP CONSTRAINT "FK_146f173dba03f78ea34b279ed57"`);
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_897b46a74b7e39d98730eb9eeb6" FOREIGN KEY ("trainingID") REFERENCES "trainings"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sets" ADD CONSTRAINT "FK_146f173dba03f78ea34b279ed57" FOREIGN KEY ("exerciseID") REFERENCES "exercises"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
