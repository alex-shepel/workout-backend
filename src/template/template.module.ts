import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TemplateController } from '@/template/template.controller';
import { TemplateService } from '@/template/template.service';
import { TemplateModel } from '@/template/template.model';

@Module({
  providers: [TemplateService],
  controllers: [TemplateController],
  imports: [SequelizeModule.forFeature([TemplateModel])],
})
export class TemplateModule {}
