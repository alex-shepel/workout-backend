import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TemplateModel } from 'template/template.model';
import { CreateTemplateDto } from 'template/dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(TemplateModel)
    private templatesRepository: typeof TemplateModel,
  ) {}

  async createTemplate(dto: CreateTemplateDto) {
    return await this.templatesRepository.create(dto);
  }

  async getAllTemplates() {
    return await this.templatesRepository.findAll();
  }

  async getTemplateById(id: number) {
    return await this.templatesRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteExercisesGroup(id: number) {
    const group = await this.getTemplateById(id);
    const deleteCount = await this.templatesRepository.destroy({
      where: { ID: id },
    });
    if (deleteCount === 1) {
      return group;
    }
    if (deleteCount > 1) {
      throw new Error(
        'ID property of Template instance in not unique! Check if the DB service is correctly configured.',
      );
    }
    throw new Error(`There is no group with ID=${id}`);
  }
}
