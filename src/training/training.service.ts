import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrainingEntity } from '@/training/training.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { TemplateService } from '@/template/template.service';
import { UpdateCurrentTrainingDto } from '@/training/dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
    private readonly templateService: TemplateService,
  ) {}

  async getCurrent(userId: UserEntity['ID']): Promise<TrainingEntity> {
    return await this.trainingRepository.findOne({
      where: {
        User: { ID: userId },
        Completed: false,
      },
    });
  }

  async updateCurrent(
    userId: UserEntity['ID'],
    dto: UpdateCurrentTrainingDto,
  ): Promise<TrainingEntity> {
    const current = await this.getCurrent(userId);
    const template = await this.templateService.getById(userId, dto.TemplateID);
    this.trainingRepository.merge(current, { Template: template });
    return await this.trainingRepository.save(current);
  }

  async next(user: UserEntity): Promise<TrainingEntity> {
    const incomplete = await this.trainingRepository.findOne({
      where: {
        User: { ID: user.ID },
        Completed: false,
      },
    });
    if (incomplete) {
      throw new HttpException('You should complete previous training first.', HttpStatus.CONFLICT);
    }
    const templates = await this.templateService.getAll(user.ID, ['Exercises']);
    if (!templates) {
      throw new HttpException(
        'You should create at least one template first.',
        HttpStatus.CONFLICT,
      );
    }
    /* TODO: implement template selection by sequential number */
    const currentTemplate = templates[0];
    /* TODO: implement exercises selection by groups and min completed count */
    const currentExercises = currentTemplate.Exercises;
    const training = new TrainingEntity();
    Object.assign(training, {
      Template: currentTemplate,
      Exercises: currentExercises,
      User: user,
    });
    return await this.trainingRepository.save(training);
  }
}
