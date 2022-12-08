import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExerciseModel } from 'exercise/exercise.model';
import { CreateExerciseDto } from 'exercise/dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(ExerciseModel)
    private readonly exercisesRepository: typeof ExerciseModel,
  ) {}

  async createExercise(dto: CreateExerciseDto): Promise<ExerciseModel> {
    return await this.exercisesRepository.create(dto);
  }

  async getAllExercises(): Promise<Array<ExerciseModel>> {
    return await this.exercisesRepository.findAll();
  }

  async getExerciseById(id: number): Promise<ExerciseModel> {
    return await this.exercisesRepository.findOne({
      where: { ID: id },
    });
  }

  async getExercisesByGroupId(groupId: number): Promise<Array<ExerciseModel>> {
    return await this.exercisesRepository.findAll({
      where: { GroupID: groupId },
    });
  }

  async deleteExerciseById(id: number): Promise<ExerciseModel> {
    const exercise = await this.getExerciseById(id);
    const deleteCount = await this.exercisesRepository.destroy({
      where: { ID: id },
    });
    if (deleteCount === 0) {
      throw new Error(`There is no exercise with ID=${id}`);
    }
    return exercise;
  }
}
