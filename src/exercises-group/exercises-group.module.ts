import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExercisesGroupModel } from './exercises-group.model';
import { ExercisesGroupController } from './exercises-group.controller';
import { ExercisesGroupService } from './exercises-group.service';

@Module({
  controllers: [ExercisesGroupController],
  providers: [ExercisesGroupService],
  imports: [SequelizeModule.forFeature([ExercisesGroupModel])],
})
export class ExercisesGroupModule {}
