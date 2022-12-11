import { Module } from '@nestjs/common';
import { ExercisesGroupEntity } from '@/exercises-group/exercises-group.entity';
import { ExercisesGroupController } from '@/exercises-group/exercises-group.controller';
import { ExercisesGroupService } from '@/exercises-group/exercises-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExercisesGroupController],
  providers: [ExercisesGroupService],
  imports: [TypeOrmModule.forFeature([ExercisesGroupEntity])],
})
export class ExercisesGroupModule {}
