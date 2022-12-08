import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TemplateModel } from 'template/template.model';
import { CreateTemplateDto } from 'template/dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(TemplateModel)
    private readonly templatesRepository: typeof TemplateModel,
  ) {}

  async createTemplate(dto: CreateTemplateDto): Promise<TemplateModel> {
    return await this.templatesRepository.create(dto);
  }

  async getAllTemplates() {
    return await this.templatesRepository.findAll();
  }

  async getTemplateById(id: number): Promise<TemplateModel> {
    return await this.templatesRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteTemplateById(id: number): Promise<TemplateModel> {
    const template = await this.getTemplateById(id);
    const deleteCount = await this.templatesRepository.destroy({
      where: { ID: id },
    });
    if (deleteCount === 0) {
      throw new Error(`There is no group with ID=${id}`);
    }
    return template;
  }
}
