import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { RegisterDto } from '@/user/dto';
import { RegisterResponseInterface } from '@/user/types';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseInterface> {
    return await this.userService.register(registerDto);
  }
}
