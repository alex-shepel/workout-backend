import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExercisesGroupModel } from './exercises-groups.model';
import CreateExercisesGroupDto from './dto/create-exercises-group.dto';

@Injectable()
export class ExercisesGroupsService {
  constructor(
    @InjectModel(ExercisesGroupModel)
    private exercisesGroupsRepository: typeof ExercisesGroupModel,
  ) {}

  async createExercisesGroup(dto: CreateExercisesGroupDto) {
    return await this.exercisesGroupsRepository.create(dto);
  }

  async getAllExercisesGroups() {
    return await this.exercisesGroupsRepository.findAll();
  }

  async getExercisesGroupById(id: number) {
    return await this.exercisesGroupsRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteExercisesGroup(id: number) {
    const group = await this.getExercisesGroupById(id);
    const deleteCount = await this.exercisesGroupsRepository.destroy({
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
