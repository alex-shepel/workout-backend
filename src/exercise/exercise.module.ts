import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExerciseController } from '@/exercise/exercise.controller';
import { ExerciseService } from '@/exercise/exercise.service';
import { ExerciseModel } from '@/exercise/exercise.model';
import { ExercisesGroupModel } from '@/exercises-group/exercises-group.model';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [SequelizeModule.forFeature([ExerciseModel, ExercisesGroupModel])],
})
export class ExerciseModule {}
