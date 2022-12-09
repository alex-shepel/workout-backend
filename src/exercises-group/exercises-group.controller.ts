import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesGroupService } from '@/exercises-group/exercises-group.service';
import { ExercisesGroupModel } from '@/exercises-group/exercises-group.model';
import { CreateExercisesGroupDto } from '@/exercises-group/dto';

@ApiTags('Exercises groups')
@Controller('api/exercises-groups')
export class ExercisesGroupController {
  constructor(private readonly exercisesGroupService: ExercisesGroupService) {}

  @ApiOperation({ summary: 'Creates the new exercises group' })
  @ApiResponse({ status: 201, type: ExercisesGroupModel })
  @Post()
  create(@Body() exercisesGroupDto: CreateExercisesGroupDto): Promise<ExercisesGroupModel> {
    return this.exercisesGroupService.createGroup(exercisesGroupDto);
  }

  @ApiOperation({ summary: 'Returns all present exercises groups' })
  @ApiResponse({ status: 200, type: [ExercisesGroupModel] })
  @Get()
  getAll(): Promise<Array<ExercisesGroupModel>> {
    return this.exercisesGroupService.getAllGroups();
  }

  @ApiOperation({
    summary: 'Removes exercises group by given ID. Returns deleted group.',
  })
  @ApiResponse({ status: 200, type: ExercisesGroupModel })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<ExercisesGroupModel> {
    return this.exercisesGroupService.deleteGroupById(Number(id));
  }
}
