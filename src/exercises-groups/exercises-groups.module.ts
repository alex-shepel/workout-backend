import { Module } from '@nestjs/common';
import { ExercisesGroupsController } from './exercises-groups.controller';
import { ExercisesGroupsService } from './exercises-groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExercisesGroupModel } from './exercises-groups.model';

@Module({
  controllers: [ExercisesGroupsController],
  providers: [ExercisesGroupsService],
  imports: [SequelizeModule.forFeature([ExercisesGroupModel])],
})
export class ExercisesGroupsModule {}
