import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrainingEntity } from '@/training/training.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
  ) {}
}
