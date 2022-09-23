import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExercisesGroupsService } from './exercises-groups.service';
import CreateExercisesGroupDto from './dto/create-exercises-group.dto';

@Controller('exercises-groups')
export class ExercisesGroupsController {
  constructor(private exercisesGroupsService: ExercisesGroupsService) {}

  @Post()
  create(@Body() exercisesGroupDto: CreateExercisesGroupDto) {
    return this.exercisesGroupsService.createExercisesGroup(exercisesGroupDto);
  }

  @Get()
  getAll() {
    return this.exercisesGroupsService.getAllExercisesGroups();
  }
}
