import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExercisesGroupModel } from 'exercises-group/exercises-group.model';
import { CreateExercisesGroupDto } from 'exercises-group/dto';

@Injectable()
export class ExercisesGroupService {
  constructor(
    @InjectModel(ExercisesGroupModel)
    private exercisesGroupRepository: typeof ExercisesGroupModel,
  ) {}

  async createExercisesGroup(dto: CreateExercisesGroupDto) {
    return await this.exercisesGroupRepository.create(dto);
  }

  async getAllExercisesGroups() {
    return await this.exercisesGroupRepository.findAll();
  }

  async getExercisesGroupById(id: number) {
    return await this.exercisesGroupRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteExercisesGroup(id: number) {
    const group = await this.getExercisesGroupById(id);
    const deleteCount = await this.exercisesGroupRepository.destroy({
      where: { ID: id },
    });
    if (deleteCount === 1) {
      return group;
    }
    if (deleteCount > 1) {
      throw new Error(
        'ID property of Exercises Group instance in not unique! Check if the DB service is correctly configured.',
      );
    }
    throw new Error(`There is no group with ID=${id}`);
  }
}
