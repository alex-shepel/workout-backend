import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExerciseModel } from './exercises.model';
import { ExercisesGroupModel } from 'exercises-groups';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [SequelizeModule.forFeature([ExerciseModel, ExercisesGroupModel])],
})
export class ExercisesModule {}
