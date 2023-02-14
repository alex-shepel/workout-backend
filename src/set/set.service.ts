import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetEntity } from '@/set/set.entity';
import { UserEntity } from '@/user/user.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { UpdateSetDto } from '@/set/dto';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(SetEntity)
    private readonly setRepository: Repository<SetEntity>,
  ) {}

  async create(
    sequentialNumber: SetEntity['SequentialNumber'],
    user: UserEntity,
    exercise: ExerciseEntity,
  ): Promise<SetEntity> {
    const previous = await this.setRepository.findOne({
      where: {
        SequentialNumber: sequentialNumber,
        Exercise: { ID: exercise.ID },
        User: { ID: user.ID },
      },
    });
    if (previous && !previous.Completed) {
      throw new HttpException(
        'Previous training has incomplete set. Complete or remove it first.',
        HttpStatus.CONFLICT,
      );
    }
    const set = new SetEntity();
    this.setRepository.merge(set, {
      SequentialNumber: sequentialNumber,
      Weight: previous?.Weight,
      Repetitions: previous?.Repetitions,
      User: user,
      Exercise: exercise,
    });
    const result = await this.setRepository.save(set);
    delete result.Exercise;
    delete result.User;
    return result;
  }

  async getById(userId: UserEntity['ID'], setId: SetEntity['ID']): Promise<SetEntity> {
    const set = await this.setRepository.findOne({
      where: {
        ID: setId,
        User: { ID: userId },
      },
    });
    if (!set) {
      throw new HttpException('There are no set with such id.', HttpStatus.NOT_FOUND);
    }
    return set;
  }

  async update(
    userId: UserEntity['ID'],
    setId: SetEntity['ID'],
    dto: UpdateSetDto,
  ): Promise<SetEntity> {
    const set = await this.getById(userId, setId);
    if (set.Completed === dto.Completed) {
      throw new HttpException(
        `Set is already ${set.Completed ? 'complete' : 'incomplete'}.`,
        HttpStatus.CONFLICT,
      );
    }
    this.setRepository.merge(set, dto);
    return await this.setRepository.save(set);
  }
}
