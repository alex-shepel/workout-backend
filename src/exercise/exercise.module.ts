import { Module } from '@nestjs/common';
import { ExerciseController } from '@/exercise/exercise.controller';
import { ExerciseService } from '@/exercise/exercise.service';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { ExercisesGroupEntity } from '@/exercises-group/exercises-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [TypeOrmModule.forFeature([ExerciseEntity, ExercisesGroupEntity])],
})
export class ExerciseModule {}
