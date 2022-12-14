import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { ExerciseModel } from './exercises.model';
import { CreateExerciseDto } from './dto';

@ApiTags('Exercises')
@Controller('api/exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @ApiOperation({ summary: 'Creates the new exercise' })
  @ApiResponse({ status: 201, type: ExerciseModel })
  @Post()
  create(@Body() exerciseDto: CreateExerciseDto) {
    return this.exercisesService.createExercise(exerciseDto);
  }

  @ApiOperation({
    summary:
      "Returns exercises that corresponds to the provided group. Returns all exercises if group wasn't provided.",
  })
  @ApiQuery({ name: 'groupId', required: false })
  @ApiResponse({ status: 200, type: [ExerciseModel] })
  @Get()
  getExercises(@Query('groupId') groupId?: number) {
    if (groupId) {
      return this.exercisesService.getExercisesByGroupId(groupId);
    }
    return this.exercisesService.getAllExercises();
  }

  @ApiOperation({
    summary: 'Removes exercise by given ID. Returns deleted exercise.',
  })
  @ApiResponse({ status: 200, type: ExerciseModel })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.exercisesService.deleteExercise(Number(id));
  }
}
