import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateGroupDto {
  @ApiProperty({
    example: 'Arms Muscles',
    description: 'Title of exercises group',
  })
  @IsNotEmpty()
  readonly Title: string;

  @ApiProperty({
    example: 'Helps to train shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  readonly Description: string;
}

export default CreateGroupDto;
