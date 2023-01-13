import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '@/user/user.service';
import { LoginDto, RegisterDto } from '@/user/dto';
import { AuthResponse, CookieData } from '@/user/types';
import { AuthGuard } from '@/user/guards';
import { Cookie, User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';
import { verify, VerifyCallback } from 'jsonwebtoken';
import ms, { StringValue } from 'ms';

@ApiTags('Authentication')
@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Registers a new user.' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const user = await this.userService.register(registerDto);
    const refreshToken = this.userService.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_LIFETIME,
    );
    this.addCookieRefreshToken(response, refreshToken);
    return this.userService.buildResponse(user);
  }

  @ApiOperation({ summary: 'Authenticates an existing user.' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const user = await this.userService.login(loginDto);
    const refreshToken = this.userService.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_LIFETIME,
    );
    this.addCookieRefreshToken(response, refreshToken);
    return this.userService.buildResponse(user);
  }

  @ApiOperation({ summary: 'Returns current authenticated user.' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@User() user: UserEntity): Promise<Omit<AuthResponse, 'AccessToken'>> {
    return {
      ID: user.ID,
      Email: user.Email,
      Name: user.Name,
    };
  }

  @ApiOperation({
    summary: 'Extends the validity of the access token using the refresh token placed in cookies.',
  })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('refresh')
  async refresh(
    @Cookie('RefreshToken') refreshToken: CookieData['RefreshToken'],
  ): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    let verifiedUser;
    const handleVerification: VerifyCallback<UserEntity> = async (error, decoded) => {
      if (error || !decoded) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }
      const user = await this.userService.getById(decoded['ID']);
      if (!user) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }
      verifiedUser = user;
    };
    await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, handleVerification);
    return this.userService.buildResponse(verifiedUser);
  }

  private addCookieRefreshToken(response: Response, token: CookieData['RefreshToken']): void {
    const key: keyof CookieData = 'RefreshToken';
    response.cookie(key, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(process.env.REFRESH_TOKEN_LIFETIME as StringValue),
    });
  }
}
