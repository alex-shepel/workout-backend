import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExerciseModel } from './exercises.model';
import { CreateExerciseDto } from './dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(ExerciseModel)
    private exercisesRepository: typeof ExerciseModel,
  ) {}

  async createExercise(dto: CreateExerciseDto) {
    return await this.exercisesRepository.create(dto);
  }

  async getAllExercises() {
    return await this.exercisesRepository.findAll();
  }

  async getExercisesByGroupId(groupId: number) {
    return await this.exercisesRepository.findAll({
      where: { GroupID: groupId },
    });
  }
}
