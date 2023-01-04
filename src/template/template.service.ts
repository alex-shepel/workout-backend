import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TemplateEntity } from '@/template/template.entity';
import { CreateTemplateDto } from '@/template/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { TemplateWithExercisesIDs } from '@/template/types';
import RelateTemplateExerciseDto from '@/template/dto/relate-template-exercise.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templatesRepository: Repository<TemplateEntity>,
  ) {}

  async create(dto: CreateTemplateDto, user: UserEntity): Promise<TemplateEntity> {
    const template = new TemplateEntity();
    Object.assign(template, { ...dto, User: user });
    return await this.templatesRepository.save(template);
  }

  async getAll(userId: UserEntity['ID']): Promise<Array<TemplateEntity>> {
    return await this.templatesRepository.find({
      where: {
        User: { ID: userId },
      },
    });
  }

  async getById(
    userId: UserEntity['ID'],
    templateId: TemplateEntity['ID'],
  ): Promise<TemplateEntity> {
    const template = await this.templatesRepository.findOne({
      where: {
        ID: templateId,
        User: { ID: userId },
      },
    });
    if (!template) {
      throw new HttpException('Template does not exist.', HttpStatus.NOT_FOUND);
    }
    return template;
  }

  async deleteById(
    userId: UserEntity['ID'],
    templateId: TemplateEntity['ID'],
  ): Promise<TemplateEntity> {
    const template = await this.getById(userId, templateId);
    await this.templatesRepository.delete({
      ID: templateId,
      User: { ID: userId },
    });
    return template;
  }

  async relateExercise(
    userId: UserEntity['ID'],
    dto: RelateTemplateExerciseDto,
  ): Promise<TemplateEntity> {
    const template = await this.getById(userId, dto.TemplateID);
    const alreadyExists = template.Exercises.some(exercise => exercise.ID === dto.ExerciseID);
    if (alreadyExists) {
      throw new HttpException('Exercise is already related.', HttpStatus.FORBIDDEN);
    }
    return template;
  }

  buildTemplateWithExercisesIDsResponse(template: TemplateEntity): TemplateWithExercisesIDs {
    return {
      ID: template.ID,
      Title: template.Title,
      Description: template.Description,
      ExercisesIDs: template.Exercises.map(exercise => exercise.ID),
    };
  }
}
