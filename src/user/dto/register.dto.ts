import { ApiProperty } from '@nestjs/swagger';

class RegisterDto {
  @ApiProperty({
    example: 'alex.shepel@gmail.com',
    description: 'Provided email will be associated with the account.',
  })
  readonly Email: string;

  @ApiProperty({
    example: 'Alex',
    description: 'Provided name will used as the nickname inside the application.',
    required: false,
  })
  readonly Name?: string;

  @ApiProperty({
    example: '31415',
    description: 'The password.',
  })
  readonly Password: string;
}

export default RegisterDto;
