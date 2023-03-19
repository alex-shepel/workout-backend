import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TemplateEntity } from '@/template/template.entity';
import { TemplateService } from '@/template/template.service';
import {
  CreateTemplateDto,
  RelateTemplateExerciseDto,
  UpdateCurrentTemplateDto,
} from '@/template/dto';
import { TemplateWithExercisesIDs } from '@/template/types';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';

@ApiTags('Templates')
@Controller('api/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @ApiOperation({ summary: 'Creates the new template' })
  @ApiResponse({ status: 201, type: TemplateEntity })
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@User() user: UserEntity, @Body() dto: CreateTemplateDto): Promise<TemplateEntity> {
    return await this.templateService.create(dto, user);
  }

  @ApiOperation({ summary: 'Returns all present templates' })
  @ApiResponse({ status: 200, type: [TemplateEntity] })
  @Get()
  @UseGuards(AuthGuard)
  async getAll(@User('ID') userId: UserEntity['ID']): Promise<TemplateEntity[]> {
    return await this.templateService.getAll(userId);
  }

  @ApiOperation({ summary: 'Returns the current template' })
  @ApiResponse({ status: 200, type: TemplateEntity })
  @Get('current')
  @UseGuards(AuthGuard)
  async current(@User('ID') userId: UserEntity['ID']): Promise<TemplateEntity> {
    return await this.templateService.current(userId);
  }

  @ApiOperation({ summary: 'Changes the current template' })
  @ApiResponse({ status: 200, type: TemplateEntity })
  @Post('current')
  @UseGuards(AuthGuard)
  async updateCurrent(
    @User() user: UserEntity,
    @Body() dto: UpdateCurrentTemplateDto,
  ): Promise<TemplateEntity> {
    return await this.templateService.updateCurrent(user, dto);
  }

  @ApiOperation({ summary: 'Returns next template' })
  @ApiResponse({ status: 200, type: TemplateEntity })
  @Get('next')
  @UseGuards(AuthGuard)
  async next(@User('ID') userId: UserEntity['ID']): Promise<TemplateEntity> {
    return await this.templateService.next(userId);
  }

  @ApiOperation({ summary: 'Returns a template with related exercises.' })
  @ApiResponse({ status: 200, type: [TemplateEntity] })
  @Get(':id/relations')
  @UseGuards(AuthGuard)
  async getRelatedExercises(
    @User('ID') userId: UserEntity['ID'],
    @Param('id') templateId: TemplateEntity['ID'],
  ): Promise<TemplateWithExercisesIDs> {
    const template = await this.templateService.getById(userId, templateId, ['Exercises']);
    return this.templateService.buildTemplateWithExercisesIDsResponse(template);
  }

  @ApiOperation({ summary: 'Relates the provided template and exercise.' })
  @ApiResponse({ status: 200, type: [TemplateEntity] })
  @Post('relations')
  @UseGuards(AuthGuard)
  async relateExercise(
    @User('ID') userId: UserEntity['ID'],
    @Body() dto: RelateTemplateExerciseDto,
  ): Promise<TemplateWithExercisesIDs> {
    const template = await this.templateService.relateExercise(userId, dto);
    return this.templateService.buildTemplateWithExercisesIDsResponse(template);
  }

  @ApiOperation({
    summary: 'Removes template by given ID. Returns deleted template.',
  })
  @ApiResponse({ status: 200, type: TemplateEntity })
  @Delete(':templateId')
  @UseGuards(AuthGuard)
  delete(
    @User('ID') userId: UserEntity['ID'],
    @Param('templateId') templateId: TemplateEntity['ID'],
  ): Promise<TemplateEntity> {
    return this.templateService.deleteById(userId, templateId);
  }
}
