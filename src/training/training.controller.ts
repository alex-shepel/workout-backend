import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from '@/training/training.service';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';
import { TrainingEntity } from '@/training/training.entity';
import { UpdateCurrentTrainingDto } from '@/training/dto';

@ApiTags('Trainings')
@Controller('api/trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiOperation({ summary: 'Returns current training' })
  @ApiResponse({ status: 200, type: [TrainingEntity] })
  @Get('current')
  @UseGuards(AuthGuard)
  async getCurrent(@User('ID') userId: UserEntity['ID']): Promise<TrainingEntity> {
    return await this.trainingService.getCurrent(userId);
  }

  @ApiOperation({ summary: 'Updates current training' })
  @ApiResponse({ status: 200, type: [TrainingEntity] })
  @Post('current')
  @UseGuards(AuthGuard)
  async updateCurrent(
    @User('ID') userId: UserEntity['ID'],
    @Body() dto: UpdateCurrentTrainingDto,
  ): Promise<TrainingEntity> {
    return await this.trainingService.updateCurrent(userId, dto);
  }

  @ApiOperation({ summary: 'Creates new training and sets it as current' })
  @ApiResponse({ status: 200, type: [TrainingEntity] })
  @Get('next')
  @UseGuards(AuthGuard)
  async next(@User() user: UserEntity): Promise<TrainingEntity> {
    return await this.trainingService.next(user);
  }
}
