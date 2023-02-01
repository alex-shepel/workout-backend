import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingEntity } from '@/training/training.entity';
import { TrainingService } from '@/training/training.service';
import { TrainingController } from '@/training/training.controller';
import { TemplateModule } from '@/template/template.module';

@Module({
  providers: [TrainingService],
  controllers: [TrainingController],
  imports: [TypeOrmModule.forFeature([TrainingEntity]), TemplateModule],
})
export class TrainingModule {}