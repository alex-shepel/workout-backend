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
import { MonitorService } from '@/monitor/monitor.service';
import { GroupEntity } from '@/group/group.entity';
import { UpdateMonitorStateDto } from '@/monitor/dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
    private readonly templateService: TemplateService,
    private readonly setService: SetService,
    private readonly monitorService: MonitorService,
  ) {}

  async getCurrent(user: UserEntity): Promise<TrainingEntity> {
    let training = await this.trainingRepository.findOne({
      where: {
        User: { ID: user.ID },
      },
      relations: {
        Template: true,
        Exercises: { Sets: true },
        Sets: true,
      },
      order: {
        UpdatedDate: 'DESC',
      },
    });
    if (!training) {
      training = await this.next(user);
    }
    training.Exercises.forEach(exercise => {
      const isCurrentSet = (goalSet: SetEntity) => training.Sets.some(set => set.ID === goalSet.ID);
      exercise.Sets = exercise.Sets.filter(isCurrentSet).sort(
        (a, b) => a.SequentialNumber - b.SequentialNumber,
      );
    });
    delete training.Sets;
    return training;
  }

  async updateCurrent(user: UserEntity, dto: UpdateCurrentTrainingDto): Promise<TrainingEntity> {
    const current = await this.getCurrent(user);
    const template = await this.templateService.getById(user.ID, dto.TemplateID);
    this.trainingRepository.merge(current, { Template: template });
    return await this.trainingRepository.save(current);
  }

  async next(user: UserEntity): Promise<TrainingEntity> {
    const templates = await this.templateService.getAll(user.ID, ['Exercises']);
    if (templates.length === 0) {
      throw new HttpException(
        'You should create at least one template first.',
        HttpStatus.CONFLICT,
      );
    }
    const monitorState = await this.monitorService.getCurrentState(user.ID);
    const nextTemplate = await this.templateService.next(
      user.ID,
      monitorState.LastTemplateSequentialNumber,
    );
    await this.complete(user.ID, {
      LastTemplateSequentialNumber: nextTemplate.SequentialNumber,
      TrainingsCount: monitorState.TrainingsCount + 1,
    });
    const exercisesByGroups = nextTemplate.Exercises.reduce((exercisesByGroups, exercise) => {
      const groupedExercise = exercisesByGroups.get(exercise.Group.ID);
      if (!groupedExercise || exercise.CompletedCount < groupedExercise.CompletedCount) {
        exercisesByGroups.set(exercise.Group.ID, exercise);
      }
      return exercisesByGroups;
    }, new Map<GroupEntity['ID'], ExerciseEntity>());
    if (exercisesByGroups.size === 0) {
      throw new HttpException(
        'You should create at least one exercise first.',
        HttpStatus.CONFLICT,
      );
    }
    const currentExercises = [...exercisesByGroups.values()];
    delete nextTemplate.Exercises;
    for (const exercise of currentExercises) {
      exercise.Sets = await this.createSets(user, exercise);
    }
    const training = new TrainingEntity();
    this.trainingRepository.merge(training, {
      Template: nextTemplate,
      Exercises: currentExercises,
      Sets: currentExercises.flatMap(exercise => exercise.Sets),
      User: user,
    });
    const result = await this.trainingRepository.save(training);
    delete result.User;
    delete result.Sets;
    return result;
  }

  private async complete(
    userId: UserEntity['ID'],
    updateMonitorDto: UpdateMonitorStateDto,
  ): Promise<void> {
    const incomplete = await this.trainingRepository.findOne({
      where: {
        User: { ID: userId },
        Completed: false,
      },
      relations: {
        Exercises: true,
        Sets: true,
      },
    });
    if (!incomplete) {
      return;
    }
    if (incomplete.Sets.some(set => !set.Completed)) {
      throw new HttpException(
        'You should complete all sets of the previous training first.',
        HttpStatus.CONFLICT,
      );
    }
    incomplete.Completed = true;
    incomplete.Exercises.forEach(exercise => (exercise.CompletedCount += 1));
    await this.trainingRepository.save(incomplete);
    await this.monitorService.update(userId, updateMonitorDto);
  }

  private createSets(user: UserEntity, exercise: ExerciseEntity): Promise<SetEntity[]> {
    const promisedSets: Promise<SetEntity>[] = [];
    [1, 2, 3, 4].forEach(sequentialNumber =>
      promisedSets.push(this.setService.create(sequentialNumber, user, exercise)),
    );
    return Promise.all(promisedSets);
  }
}
