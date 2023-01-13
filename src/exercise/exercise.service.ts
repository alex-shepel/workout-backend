import {
  forwardRef,
  ForwardReference,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { CreateExerciseDto } from '@/exercise/dto';
import { UserEntity } from '@/user/user.entity';
import { GroupEntity } from '@/group/group.entity';
import { GroupService } from '@/group/group.service';
import { ExerciseWithGroupID } from '@/exercise/types';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
    @Inject<ForwardReference<GroupService>>(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) {}

  async create(dto: CreateExerciseDto, user: UserEntity): Promise<ExerciseEntity> {
    const group = await this.groupService.getById(user.ID, dto.GroupID);
    const exercise = new ExerciseEntity();
    Object.assign(exercise, {
      Title: dto.Title,
      Description: dto.Description,
      Group: group,
      User: user,
    });
    const exerciseByTitle = await this.exerciseRepository.findOne({
      where: {
        Title: dto.Title,
        User: { ID: user.ID },
      },
    });
    if (exerciseByTitle) {
      throw new HttpException(
        'The title of the exercise is already in use, please change the current title to avoid confusion.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.exerciseRepository.save(exercise);
  }

  async getAll(userId: UserEntity['ID']): Promise<Array<ExerciseWithGroupID>> {
    const exercises = await this.exerciseRepository.find({
      where: {
        User: { ID: userId },
      },
      relations: ['Group'],
    });
    return exercises.map(exercise => ({
      ID: exercise.ID,
      Title: exercise.Title,
      Description: exercise.Description,
      GroupID: exercise.Group.ID,
    }));
  }

  async getById(
    userId: UserEntity['ID'],
    exerciseId: ExerciseEntity['ID'],
    relations: Array<keyof ExerciseEntity> = [],
  ): Promise<ExerciseEntity> {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        ID: exerciseId,
        User: { ID: userId },
      },
      relations,
    });
    if (!exercise) {
      throw new HttpException('Exercise does not exist.', HttpStatus.NOT_FOUND);
    }
    return exercise;
  }

  async getByGroupId(
    userId: UserEntity['ID'],
    groupId: GroupEntity['ID'],
  ): Promise<Array<ExerciseWithGroupID>> {
    const exercises = await this.exerciseRepository.find({
      where: {
        Group: { ID: groupId },
        User: { ID: userId },
      },
    });
    return exercises.map(exercise => ({
      ID: exercise.ID,
      Title: exercise.Title,
      Description: exercise.Description,
      GroupID: groupId,
    }));
  }

  async deleteById(
    userId: UserEntity['ID'],
    exerciseId: ExerciseEntity['ID'],
  ): Promise<ExerciseEntity> {
    const exercise = await this.getById(userId, exerciseId);
    await this.exerciseRepository.delete({
      ID: exerciseId,
      User: { ID: userId },
    });
    return exercise;
  }

  async deleteByGroupId(
    userId: UserEntity['ID'],
    groupId: GroupEntity['ID'],
  ): Promise<Array<ExerciseWithGroupID>> {
    const exercises = await this.getByGroupId(userId, groupId);
    await this.exerciseRepository.delete({
      Group: { ID: groupId },
      User: { ID: userId },
    });
    return exercises;
  }
}
