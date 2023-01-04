import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseService } from '@/exercise/exercise.service';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { CreateExerciseDto } from '@/exercise/dto';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { DeleteResult } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { GroupEntity } from '@/group/group.entity';
import { ExerciseWithGroupID } from '@/exercise/types';

@ApiTags('Exercises')
@Controller('api/exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiOperation({ summary: 'Creates the new exercise' })
  @ApiResponse({ status: 201, type: ExerciseEntity })
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@User() user: UserEntity, @Body() dto: CreateExerciseDto): Promise<ExerciseEntity> {
    return await this.exerciseService.create(dto, user);
  }

  @ApiOperation({
    summary:
      "Returns exercises that corresponds to the provided group. Returns all exercises if group wasn't provided.",
  })
  @ApiQuery({ name: 'groupId', required: false })
  @ApiResponse({ status: 200, type: [ExerciseEntity] })
  @Get()
  @UseGuards(AuthGuard)
  async get(
    @User('ID') userId: UserEntity['ID'],
    @Query('groupId') groupId?: GroupEntity['ID'],
  ): Promise<Array<ExerciseWithGroupID>> {
    if (groupId) {
      return await this.exerciseService.getByGroupId(userId, groupId);
    }
    return await this.exerciseService.getAll(userId);
  }

  @ApiOperation({
    summary: 'Removes exercise by given ID. Returns deleted exercise.',
  })
  @ApiResponse({ status: 200, type: DeleteResult })
  @Delete(':exerciseId')
  @UseGuards(AuthGuard)
  async delete(
    @User('ID') userId: UserEntity['ID'],
    @Param('exerciseId') exerciseId: ExerciseEntity['ID'],
  ): Promise<ExerciseEntity> {
    return await this.exerciseService.deleteById(userId, exerciseId);
  }
}
