import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExercisesGroupModel } from 'exercises-group/exercises-group.model';
import { CreateExercisesGroupDto } from 'exercises-group/dto';

@Injectable()
export class ExercisesGroupService {
  constructor(
    @InjectModel(ExercisesGroupModel)
    private readonly exercisesGroupRepository: typeof ExercisesGroupModel,
  ) {}

  async createGroup(dto: CreateExercisesGroupDto): Promise<ExercisesGroupModel> {
    return await this.exercisesGroupRepository.create(dto);
  }

  async getAllGroups(): Promise<Array<ExercisesGroupModel>> {
    return await this.exercisesGroupRepository.findAll();
  }

  async getGroupById(id: number): Promise<ExercisesGroupModel> {
    return await this.exercisesGroupRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteGroupById(id: number): Promise<ExercisesGroupModel> {
    const group = await this.getGroupById(id);
    const deleteCount = await this.exercisesGroupRepository.destroy({
      where: { ID: id },
    });
    if (deleteCount === 0) {
      throw new Error(`There is no group with ID=${id}`);
    }
    return group;
  }
}
