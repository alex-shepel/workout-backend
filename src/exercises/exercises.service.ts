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

  async getExerciseById(id: number) {
    return await this.exercisesRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteExercise(id: number) {
    const exercise = await this.getExerciseById(id);
    const deleteCount = await this.exercisesRepository.destroy({
      where: { ID: id },
    });
    if (deleteCount === 1) {
      return exercise;
    }
    if (deleteCount > 1) {
      throw new Error(
        'ID property of Exercise instance in not unique! Check if the DB service is correctly configured.',
      );
    }
    throw new Error(`There is no exercise with ID=${id}`);
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
