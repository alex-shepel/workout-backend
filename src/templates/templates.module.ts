import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TemplateModel } from './templates.model';

@Module({
  providers: [TemplatesService],
  controllers: [TemplatesController],
  imports: [SequelizeModule.forFeature([TemplateModel])],
})
export class TemplatesModule {}
