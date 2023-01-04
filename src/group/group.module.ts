import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '@/group/group.entity';
import { GroupController } from '@/group/group.controller';
import { GroupService } from '@/group/group.service';
import { ExerciseModule } from '@/exercise/exercise.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [TypeOrmModule.forFeature([GroupEntity]), forwardRef(() => ExerciseModule)],
  exports: [GroupService],
})
export class GroupModule {}
