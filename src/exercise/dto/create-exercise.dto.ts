import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateExerciseDto {
  @ApiProperty({
    example: 'Pull-ups',
    description: 'Title of the exercise',
  })
  @IsNotEmpty()
  readonly Title: string;

  @ApiProperty({
    example:
      'The traditional pull-ups on a bar. You could use a weighting material attached to the belt with a chain.',
    description: 'Description of the exercise',
  })
  readonly Description: string;

  @ApiProperty({
    example: 2,
    description: 'The identifier of the correspondent exercises group',
  })
  @IsNotEmpty()
  readonly GroupID: string;
}

export default CreateExerciseDto;
