import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from '@/training/training.service';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';
import { TrainingEntity } from '@/training/training.entity';
import { TemplateService } from '@/template/template.service';

@ApiTags('Trainings')
@Controller('api/trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly templateService: TemplateService,
  ) {}

  @ApiOperation({ summary: 'Returns the current training' })
  @ApiResponse({ status: 200, type: TrainingEntity })
  @Get('current')
  @UseGuards(AuthGuard)
  async getCurrent(@User() user: UserEntity): Promise<TrainingEntity> {
    const currentTraining = await this.trainingService.current(user);
    return currentTraining || (await this.next(user));
  }

  @ApiOperation({ summary: 'Creates the new training and sets it as the current one' })
  @ApiResponse({ status: 200, type: TrainingEntity })
  @Get('next')
  @UseGuards(AuthGuard)
  async next(@User() user: UserEntity): Promise<TrainingEntity> {
    const nextTemplate = await this.templateService.next(user.ID);
    return await this.trainingService.next(user, nextTemplate);
  }
}
