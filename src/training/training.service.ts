import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrainingEntity } from '@/training/training.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { TemplateService } from '@/template/template.service';
import { UpdateCurrentTrainingDto } from '@/training/dto';
import { SetService } from '@/set/set.service';
import { SetEntity } from '@/set/set.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
    private readonly templateService: TemplateService,
    private readonly setService: SetService,
  ) {}

  async getCurrent(userId: UserEntity['ID']): Promise<TrainingEntity> {
    const training = await this.trainingRepository.findOne({
      where: {
        User: { ID: userId },
        Completed: false,
      },
      relations: {
        Template: true,
        Exercises: { Sets: true },
        Sets: true,
      },
    });
    if (!training) {
      throw new HttpException("You don't have any incomplete trainings.", HttpStatus.NOT_FOUND);
    }
    training.Exercises.forEach(exercise => {
      const isCurrentSet = (goalSet: SetEntity) => training.Sets.some(set => set.ID === goalSet.ID);
      exercise.Sets = exercise.Sets.filter(isCurrentSet);
    });
    delete training.Sets;
    return training;
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
    if (templates.length === 0) {
      throw new HttpException(
        'You should create at least one template first.',
        HttpStatus.CONFLICT,
      );
    }
    /* TODO: implement template selection by sequential number */
    const currentTemplate = templates[0];
    const exercises = currentTemplate.Exercises;
    if (exercises.length === 0) {
      throw new HttpException(
        'You should create at least one exercise first.',
        HttpStatus.CONFLICT,
      );
    }
    /* TODO: implement exercises selection by groups and min completed count */
    const currentExercises = exercises;
    delete currentTemplate.Exercises;
    for (const exercise of currentExercises) {
      exercise.Sets = await this.createSets(user, exercise);
    }
    const training = new TrainingEntity();
    this.trainingRepository.merge(training, {
      Template: currentTemplate,
      Exercises: currentExercises,
      Sets: currentExercises.flatMap(exercise => exercise.Sets),
      User: user,
    });
    const result = await this.trainingRepository.save(training);
    delete result.User;
    delete result.Sets;
    return result;
  }

  private createSets(user: UserEntity, exercise: ExerciseEntity): Promise<SetEntity[]> {
    const promisedSets: Promise<SetEntity>[] = [];
    [1, 2, 3, 4].forEach(sequentialNumber =>
      promisedSets.push(this.setService.create(sequentialNumber, user, exercise)),
    );
    return Promise.all(promisedSets);
  }
}
