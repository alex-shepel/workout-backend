import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TemplateEntity } from '@/template/template.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

class RelateTemplateExerciseDto {
  @ApiProperty({
    example: '1b01bb32-7134-43e4-9cb2-793d602fa924',
    description: 'ID of the targeted template.',
  })
  @IsNotEmpty()
  readonly TemplateID: TemplateEntity['ID'];

  @ApiProperty({
    example: '19f1ba1e-e0f4-4cf7-aef3-f302e60809d3',
    description: 'ID of the targeted exercise.',
  })
  readonly ExerciseID: ExerciseEntity['ID'];
}

export default RelateTemplateExerciseDto;
