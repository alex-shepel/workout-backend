import { ApiProperty } from '@nestjs/swagger';

class CreateExercisesGroupDto {
  @ApiProperty({
    example: 'Arms Muscles',
    description: 'Title of exercises group',
  })
  readonly Title: string;

  @ApiProperty({
    example: 'Helps to train shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  readonly Description: string;
}

export default CreateExercisesGroupDto;
