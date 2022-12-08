import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TemplateModel } from 'template/template.model';
import { TemplateService } from 'template/template.service';
import { CreateTemplateDto } from 'template/dto';

@Controller('api/templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @ApiOperation({ summary: 'Creates the new template' })
  @ApiResponse({ status: 201, type: TemplateModel })
  @Post()
  create(@Body() templateDto: CreateTemplateDto) {
    return this.templateService.createTemplate(templateDto);
  }

  @ApiOperation({ summary: 'Returns all present templates' })
  @ApiResponse({ status: 200, type: [TemplateModel] })
  @Get()
  getAll() {
    return this.templateService.getAllTemplates();
  }

  @ApiOperation({
    summary: 'Removes template by given ID. Returns deleted template.',
  })
  @ApiResponse({ status: 200, type: TemplateModel })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.templateService.deleteExercisesGroup(Number(id));
  }
}
