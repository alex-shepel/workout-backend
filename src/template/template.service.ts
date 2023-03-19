import {
  forwardRef,
  ForwardReference,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TemplateEntity } from '@/template/template.entity';
import { CreateTemplateDto, UpdateCurrentTemplateDto } from '@/template/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, MoreThan, Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { TemplateWithExercisesIDs } from '@/template/types';
import RelateTemplateExerciseDto from '@/template/dto/relate-template-exercise.dto';
import { ExerciseService } from '@/exercise/exercise.service';
import { TrainingService } from '@/training/training.service';
import { MonitorService } from '@/monitor/monitor.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    private readonly exerciseService: ExerciseService,
    private readonly monitorService: MonitorService,
    @Inject<ForwardReference<TrainingService>>(forwardRef(() => TrainingService))
    private readonly trainingService: TrainingService,
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
    relations: Array<keyof TemplateEntity> | FindOptionsRelations<TemplateEntity> = [],
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

  async current(userId: UserEntity['ID']): Promise<TemplateEntity> {
    const { LastTemplateSequentialNumber } = await this.monitorService.getCurrentState(userId);
    return await this.templateRepository.findOne({
      where: {
        SequentialNumber: LastTemplateSequentialNumber,
        User: { ID: userId },
      },
    });
  }

  async updateCurrent(user: UserEntity, dto: UpdateCurrentTemplateDto): Promise<TemplateEntity> {
    const newCurrent = await this.getById(user.ID, dto.ID, {
      Exercises: { Group: true },
    });
    await this.monitorService.update(user.ID, {
      LastTemplateSequentialNumber: newCurrent.SequentialNumber,
    });
    await this.trainingService.rebuild(user, newCurrent);
    return newCurrent;
  }

  async next(userId: UserEntity['ID']): Promise<TemplateEntity> {
    const { LastTemplateSequentialNumber } = await this.monitorService.getCurrentState(userId);
    const sequentialNumber = await this.templateRepository
      .createQueryBuilder('template')
      .leftJoinAndSelect('template.User', 'user')
      .select('MAX(template.SequentialNumber)', 'max')
      .addSelect('MIN(template.SequentialNumber)', 'min')
      .where('user.ID = :userId', { userId })
      .getRawOne<{ max: number; min: number }>();
    if (!sequentialNumber.max && !sequentialNumber.min) {
      throw new HttpException(
        'You should create at least one template first.',
        HttpStatus.CONFLICT,
      );
    }
    return await this.templateRepository.findOne({
      where: {
        SequentialNumber:
          LastTemplateSequentialNumber >= sequentialNumber.max
            ? sequentialNumber.min
            : MoreThan(LastTemplateSequentialNumber),
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
