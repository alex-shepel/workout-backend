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
import { CreateTemplateDto, RelateTemplateExerciseDto } from '@/template/dto';
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
  async getAll(@User('ID') userId: UserEntity['ID']): Promise<Array<TemplateWithExercisesIDs>> {
    const templates = await this.templateService.getAll(userId);
    return templates.map(this.templateService.buildTemplateWithExercisesIDsResponse);
  }

  @ApiOperation({ summary: 'Creates relation between provided exercise and template.' })
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
