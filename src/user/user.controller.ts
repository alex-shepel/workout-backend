import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { LoginDto, RegisterDto } from '@/user/dto';
import { IAuthResponse } from '@/user/types';
import { AuthGuard } from '@/user/guards';
import { User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto): Promise<IAuthResponse> {
    const user = await this.userService.register(registerDto);
    return this.userService.buildResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<IAuthResponse> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getCurrentUser(@User() user: UserEntity): Promise<IAuthResponse> {
    return this.userService.buildResponse(user);
  }
}
