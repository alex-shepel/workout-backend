import { Module } from '@nestjs/common';
import { TemplateController } from '@/template/template.controller';
import { TemplateService } from '@/template/template.service';
import { TemplateEntity } from '@/template/template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TemplateService],
  controllers: [TemplateController],
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
})
export class TemplateModule {}
