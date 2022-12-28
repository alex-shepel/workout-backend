import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class LoginDto {
  @ApiProperty({
    example: 'alex@shepel.com',
    description: 'Email that was specified during registration.',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly Email: string;

  @ApiProperty({
    example: '31415',
    description: 'Password that was specified during registration.',
  })
  @IsNotEmpty()
  readonly Password: string;
}

export default LoginDto;
