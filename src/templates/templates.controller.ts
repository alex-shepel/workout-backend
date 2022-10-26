import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';
import { TemplateModel } from './templates.model';
import { CreateTemplateDto } from './dto';

@Controller('api/templates')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @ApiOperation({ summary: 'Creates the new template' })
  @ApiResponse({ status: 201, type: TemplateModel })
  @Post()
  create(@Body() templateDto: CreateTemplateDto) {
    return this.templatesService.createTemplate(templateDto);
  }

  @ApiOperation({ summary: 'Returns all present templates' })
  @ApiResponse({ status: 200, type: [TemplateModel] })
  @Get()
  getAll() {
    return this.templatesService.getAllTemplates();
  }

  @ApiOperation({
    summary: 'Removes template by given ID. Returns deleted template.',
  })
  @ApiResponse({ status: 200, type: TemplateModel })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.templatesService.deleteExercisesGroup(Number(id));
  }
}
