import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateTemplateDto {
  @ApiProperty({
    example: 'Easy Training',
    description: 'Title of the training template',
  })
  @IsNotEmpty()
  readonly Title: string;

  @ApiProperty({
    example: 'Choose to recover the body muscles after the hard trainings.',
    description: 'Description of the training template',
  })
  readonly Description: string;
}

export default CreateTemplateDto;
