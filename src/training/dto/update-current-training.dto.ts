import { ApiProperty } from '@nestjs/swagger';
import { TemplateEntity } from '@/template/template.entity';

class UpdateCurrentTrainingDto {
  @ApiProperty({
    example: 'fgk1j-sl2fj-213nm-gfk34',
    description: 'The ID of the new template, that will replace the previous one.',
  })
  readonly TemplateID: TemplateEntity['ID'];
}

export default UpdateCurrentTrainingDto;
