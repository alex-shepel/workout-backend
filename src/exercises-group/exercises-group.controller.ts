import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesGroupService } from '@/exercises-group/exercises-group.service';
import { ExercisesGroupEntity } from '@/exercises-group/exercises-group.entity';
import { CreateExercisesGroupDto } from '@/exercises-group/dto';

@ApiTags('Exercises groups')
@Controller('api/exercises-groups')
export class ExercisesGroupController {
  constructor(private readonly exercisesGroupService: ExercisesGroupService) {}

  @ApiOperation({ summary: 'Creates the new exercises group' })
  @ApiResponse({ status: 201, type: ExercisesGroupEntity })
  @Post()
  create(@Body() exercisesGroupDto: CreateExercisesGroupDto): Promise<ExercisesGroupEntity> {
    return this.exercisesGroupService.createGroup(exercisesGroupDto);
  }

  @ApiOperation({ summary: 'Returns all present exercises groups' })
  @ApiResponse({ status: 200, type: [ExercisesGroupEntity] })
  @Get()
  getAll(): Promise<Array<ExercisesGroupEntity>> {
    return this.exercisesGroupService.getAllGroups();
  }

  @ApiOperation({
    summary: 'Removes exercises group by given ID. Returns deleted group.',
  })
  @ApiResponse({ status: 200, type: ExercisesGroupEntity })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<ExercisesGroupEntity> {
    return this.exercisesGroupService.deleteGroupById(Number(id));
  }
}
