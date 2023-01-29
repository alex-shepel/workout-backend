import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainingService } from '@/training/training.service';

@ApiTags('Trainings')
@Controller('api/trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}
}
