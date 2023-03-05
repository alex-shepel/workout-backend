import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TemplateEntity } from '@/template/template.entity';
import { CreateTemplateDto } from '@/template/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { TemplateWithExercisesIDs } from '@/template/types';
import RelateTemplateExerciseDto from '@/template/dto/relate-template-exercise.dto';
import { ExerciseService } from '@/exercise/exercise.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    private readonly exerciseService: ExerciseService,
  ) {}

  async create(dto: CreateTemplateDto, user: UserEntity): Promise<TemplateEntity> {
    const template = new TemplateEntity();
    const lastSequentialNumber = await this.templateRepository.maximum('SequentialNumber', {
      User: { ID: user.ID },
    });
    Object.assign(template, { ...dto, SequentialNumber: lastSequentialNumber + 1, User: user });
    return await this.templateRepository.save(template);
  }

  async getAll(
    userId: UserEntity['ID'],
    relations: Array<keyof TemplateEntity> = [],
  ): Promise<Array<TemplateEntity>> {
    return await this.templateRepository.find({
      where: {
        User: { ID: userId },
      },
      relations,
    });
  }

  async getById(
    userId: UserEntity['ID'],
    templateId: TemplateEntity['ID'],
    relations: Array<keyof TemplateEntity> = [],
  ): Promise<TemplateEntity> {
    const template = await this.templateRepository.findOne({
      where: {
        ID: templateId,
        User: { ID: userId },
      },
      relations,
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
    await this.templateRepository.delete({
      ID: templateId,
      User: { ID: userId },
    });
    return template;
  }

  async relateExercise(
    userId: UserEntity['ID'],
    dto: RelateTemplateExerciseDto,
  ): Promise<TemplateEntity> {
    const exercise = await this.exerciseService.getById(userId, dto.ExerciseID);
    const template = await this.getById(userId, dto.TemplateID, ['Exercises']);
    const isRelated = template.Exercises?.some(({ ID }) => ID === exercise.ID);
    if (isRelated === dto.AreRelated) {
      throw new HttpException(
        `Provided template and exercise are ${isRelated ? 'already' : 'not yet'} related.`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (dto.AreRelated) {
      template.Exercises.push(exercise);
    } else {
      template.Exercises = template.Exercises.filter(({ ID }) => ID !== exercise.ID);
    }
    return await this.templateRepository.save(template);
  }

  async next(
    userId: UserEntity['ID'],
    lastSequentialNumber: TemplateEntity['SequentialNumber'],
  ): Promise<TemplateEntity> {
    const sequentialNumber = await this.templateRepository
      .createQueryBuilder('template')
      .leftJoinAndSelect('template.User', 'user')
      .select('MAX(template.SequentialNumber)', 'max')
      .addSelect('MIN(template.SequentialNumber)', 'min')
      .where('user.ID = :userId', { userId })
      .getRawOne<{ max: number; min: number }>();
    return await this.templateRepository.findOne({
      where: {
        SequentialNumber:
          lastSequentialNumber >= sequentialNumber.max
            ? sequentialNumber.min
            : MoreThan(lastSequentialNumber),
        User: { ID: userId },
      },
      order: {
        SequentialNumber: 'ASC',
      },
      relations: {
        Exercises: {
          Group: true,
        },
      },
    });
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
