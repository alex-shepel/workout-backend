import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExercisesGroupService } from 'exercises-group/exercises-group.service';
import { ExercisesGroupModel } from 'exercises-group/exercises-group.model';
import { CreateExercisesGroupDto } from 'exercises-group/dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Exercises groups')
@Controller('api/exercises-groups')
export class ExercisesGroupController {
  constructor(private exercisesGroupService: ExercisesGroupService) {}

  @ApiOperation({ summary: 'Creates the new exercises group' })
  @ApiResponse({ status: 201, type: ExercisesGroupModel })
  @Post()
  create(@Body() exercisesGroupDto: CreateExercisesGroupDto) {
    return this.exercisesGroupService.createExercisesGroup(exercisesGroupDto);
  }

  @ApiOperation({ summary: 'Returns all present exercises groups' })
  @ApiResponse({ status: 200, type: [ExercisesGroupModel] })
  @Get()
  getAll() {
    return this.exercisesGroupService.getAllExercisesGroups();
  }

  @ApiOperation({
    summary: 'Removes exercises group by given ID. Returns deleted group.',
  })
  @ApiResponse({ status: 200, type: ExercisesGroupModel })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.exercisesGroupService.deleteExercisesGroup(Number(id));
  }
}
