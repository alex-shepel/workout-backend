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
}
