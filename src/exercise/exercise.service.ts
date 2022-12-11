import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { CreateExerciseDto } from '@/exercise/dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}

  async createExercise(dto: CreateExerciseDto): Promise<ExerciseEntity> {
    return await this.exerciseRepository.create(dto);
  }

  async getAllExercises(): Promise<Array<ExerciseEntity>> {
    return await this.exerciseRepository.find();
  }

  async getExerciseById(id: number): Promise<ExerciseEntity> {
    return await this.exerciseRepository.findOne({
      where: { ID: id },
    });
  }

  async getExercisesByGroupId(groupId: number): Promise<Array<ExerciseEntity>> {
    return await this.exerciseRepository.find({
      where: { GroupID: groupId },
    });
  }

  async deleteExerciseById(id: number): Promise<ExerciseEntity> {
    const exercise = await this.getExerciseById(id);
    // const deleteCount = await this.exerciseRepository.delete({
    //   where: { ID: id },
    // });
    // if (deleteCount === 0) {
    //   throw new Error(`There is no exercise with ID=${id}`);
    // }
    return exercise;
  }
}
