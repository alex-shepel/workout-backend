import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExercisesGroupsService } from './exercises-groups.service';
import CreateExercisesGroupDto from './dto/create-exercises-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesGroupModel } from './exercises-groups.model';

@ApiTags('Exercises groups')
@Controller('api/exercises-groups')
export class ExercisesGroupsController {
  constructor(private exercisesGroupsService: ExercisesGroupsService) {}

  @ApiOperation({ summary: 'Creates the new exercises group' })
  @ApiResponse({ status: 201, type: ExercisesGroupModel })
  @Post()
  create(@Body() exercisesGroupDto: CreateExercisesGroupDto) {
    return this.exercisesGroupsService.createExercisesGroup(exercisesGroupDto);
  }

  @ApiOperation({ summary: 'Returns all present exercises group' })
  @ApiResponse({ status: 200, type: [ExercisesGroupModel] })
  @Get()
  getAll() {
    return this.exercisesGroupsService.getAllExercisesGroups();
  }
}
