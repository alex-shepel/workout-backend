import { Injectable } from '@nestjs/common';
import { ExercisesGroupEntity } from '@/exercises-group/exercises-group.entity';
import { CreateExercisesGroupDto } from '@/exercises-group/dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExercisesGroupService {
  constructor(
    @InjectRepository(ExercisesGroupEntity)
    private readonly exercisesGroupRepository: Repository<ExercisesGroupEntity>,
  ) {}

  async createGroup(dto: CreateExercisesGroupDto): Promise<ExercisesGroupEntity> {
    return await this.exercisesGroupRepository.create(dto);
  }

  async getAllGroups(): Promise<Array<ExercisesGroupEntity>> {
    return await this.exercisesGroupRepository.find();
  }

  async getGroupById(id: number): Promise<ExercisesGroupEntity> {
    return await this.exercisesGroupRepository.findOne({
      where: { ID: id },
    });
  }

  async deleteGroupById(id: number): Promise<ExercisesGroupEntity> {
    const group = await this.getGroupById(id);
    // const deleteCount = await this.exercisesGroupRepository.destroy({
    //   where: { ID: id },
    // });
    // if (deleteCount === 0) {
    //   throw new Error(`There is no group with ID=${id}`);
    // }
    return group;
  }
}
