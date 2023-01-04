import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseController } from '@/exercise/exercise.controller';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { ExerciseService } from '@/exercise/exercise.service';
import { GroupModule } from '@/group/group.module';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [TypeOrmModule.forFeature([ExerciseEntity]), forwardRef(() => GroupModule)],
  exports: [ExerciseService],
})
export class ExerciseModule {}
