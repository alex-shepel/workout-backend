import { Injectable } from '@nestjs/common';
import { TemplateEntity } from '@/template/template.entity';
import { CreateTemplateDto } from '@/template/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templatesRepository: Repository<TemplateEntity>,
  ) {}

  async createTemplate(dto: CreateTemplateDto): Promise<TemplateEntity> {
    return await this.templatesRepository.create(dto);
  }

  async getAllTemplates() {
    return await this.templatesRepository.find();
  }

  async getTemplateById(id: number): Promise<TemplateEntity> {
    return await this.templatesRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteTemplateById(id: number): Promise<TemplateEntity> {
    const template = await this.getTemplateById(id);
    // const deleteCount = await this.templatesRepository.destroy({
    //   where: { ID: id },
    // });
    // if (deleteCount === 0) {
    //   throw new Error(`There is no group with ID=${id}`);
    // }
    return template;
  }
}
