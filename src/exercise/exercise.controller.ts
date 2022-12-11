import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseService } from '@/exercise/exercise.service';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { CreateExerciseDto } from '@/exercise/dto';

@ApiTags('Exercises')
@Controller('api/exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiOperation({ summary: 'Creates the new exercise' })
  @ApiResponse({ status: 201, type: ExerciseEntity })
  @Post()
  async create(@Body() exerciseDto: CreateExerciseDto): Promise<ExerciseEntity> {
    return await this.exerciseService.createExercise(exerciseDto);
  }

  @ApiOperation({
    summary:
      "Returns exercises that corresponds to the provided group. Returns all exercises if group wasn't provided.",
  })
  @ApiQuery({ name: 'groupId', required: false })
  @ApiResponse({ status: 200, type: [ExerciseEntity] })
  @Get()
  async getExercises(@Query('groupId') groupId?: number): Promise<Array<ExerciseEntity>> {
    if (groupId) {
      return await this.exerciseService.getExercisesByGroupId(groupId);
    }
    return await this.exerciseService.getAllExercises();
  }

  @ApiOperation({
    summary: 'Removes exercise by given ID. Returns deleted exercise.',
  })
  @ApiResponse({ status: 200, type: ExerciseEntity })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ExerciseEntity> {
    return await this.exerciseService.deleteExerciseById(Number(id));
  }
}
