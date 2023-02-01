import { Module } from '@nestjs/common';
import { TemplateController } from '@/template/template.controller';
import { TemplateService } from '@/template/template.service';
import { TemplateEntity } from '@/template/template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from '@/exercise/exercise.module';

@Module({
  providers: [TemplateService],
  controllers: [TemplateController],
  imports: [TypeOrmModule.forFeature([TemplateEntity]), ExerciseModule],
  exports: [TemplateService],
})
export class TemplateModule {}
