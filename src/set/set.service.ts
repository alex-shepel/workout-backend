import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetEntity } from '@/set/set.entity';
import { UserEntity } from '@/user/user.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

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
}
