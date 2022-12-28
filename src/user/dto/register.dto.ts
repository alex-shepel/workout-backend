import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

class RegisterDto {
  @ApiProperty({
    example: 'alex@shepel.com',
    description: 'Provided email will be associated with the account.',
  })
  @IsNotEmpty()
  @IsEmail()
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
  @IsNotEmpty()
  @IsStrongPassword()
  readonly Password: string;
}

export default RegisterDto;
