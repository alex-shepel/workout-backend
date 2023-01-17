import { CookieOptions, Response } from 'express';
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
import { AuthResponse, CookiePayload } from '@/user/types';
import { AuthGuard } from '@/user/guards';
import { Cookie, User } from '@/user/decorators';
import { UserEntity } from '@/user/user.entity';
import { verify, VerifyCallback } from 'jsonwebtoken';
import ms, { StringValue } from 'ms';

@ApiTags('Authentication')
@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  @ApiOperation({ summary: 'Registers a new user.' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const user = await this.userService.register(registerDto);
    this.addCookieRefreshToken(user, response);
    return this.buildAuthResponse(user);
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
    this.addCookieRefreshToken(user, response);
    return this.buildAuthResponse(user);
  }

  @ApiOperation({ summary: 'Returns current authenticated user.' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@User() user: UserEntity): Promise<Pick<UserEntity, 'ID' | 'Name' | 'Email'>> {
    return this.userService.buildResponse(user);
  }

  @ApiOperation({
    summary: 'Extends the validity of the access token using the refresh token placed in cookies.',
  })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('refresh')
  async refresh(
    @Cookie('RefreshToken') refreshToken: CookiePayload['RefreshToken'],
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
    return this.buildAuthResponse(verifiedUser);
  }

  @ApiOperation({
    summary:
      'Invalidates current access and refresh tokens. Removes refresh token from the cookies.',
  })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(
    @Res({ passthrough: true }) response: Response,
    @User() user: UserEntity,
  ): Promise<Pick<UserEntity, 'ID' | 'Name' | 'Email'>> {
    const key: keyof CookiePayload = 'RefreshToken';
    response.clearCookie(key, this.COOKIE_OPTIONS);
    const logoutUser = await this.userService.logout(user);
    return this.userService.buildResponse(logoutUser);
  }

  private buildAuthResponse(user: UserEntity): AuthResponse {
    const accessToken = this.userService.generateToken(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_LIFETIME,
    );
    const userResponse = this.userService.buildResponse(user);
    return { ...userResponse, AccessToken: accessToken };
  }

  private addCookieRefreshToken(user: UserEntity, response: Response): void {
    const refreshToken: CookiePayload['RefreshToken'] = this.userService.generateToken(
      user,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_LIFETIME,
    );
    const key: keyof CookiePayload = 'RefreshToken';
    response.cookie(key, refreshToken, {
      ...this.COOKIE_OPTIONS,
      maxAge: ms(process.env.REFRESH_TOKEN_LIFETIME as StringValue),
    });
  }
}
