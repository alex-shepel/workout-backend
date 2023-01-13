import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secret, sign, SignOptions } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserEntity } from '@/user/user.entity';
import { LoginDto, RegisterDto } from '@/user/dto';
import { AuthResponse } from '@/user/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const userByEmail = await this.getByEmail(registerDto.Email);
    if (userByEmail) {
      throw new HttpException('Email is taken.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const userEntity = new UserEntity();
    Object.assign(userEntity, registerDto);
    return await this.userRepository.save(userEntity);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const userByEmail = await this.getByEmail(loginDto.Email, ['ID', 'Email', 'Name', 'Password']);
    if (!userByEmail) {
      throw new HttpException('Incorrect email.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isPasswordCorrect = await compare(loginDto.Password, userByEmail.Password);
    if (!isPasswordCorrect) {
      throw new HttpException('Incorrect password.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return userByEmail;
  }

  async getById(id: UserEntity['ID'], select: Array<keyof UserEntity> = []): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { ID: id },
      select,
    });
  }

  async getByEmail(
    email: UserEntity['Email'],
    select: Array<keyof UserEntity> = [],
  ): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { Email: email },
      select,
    });
  }

  buildResponse(user: UserEntity): AuthResponse {
    return {
      ID: user.ID,
      Name: user.Name,
      Email: user.Email,
      AccessToken: this.generateToken(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_LIFETIME,
      ),
    };
  }

  generateToken(
    user: UserEntity,
    secret: Secret,
    expiresIn: SignOptions['expiresIn'],
  ): AuthResponse['AccessToken'] {
    return sign({ ID: user.ID, Email: user.Email }, secret, { expiresIn });
  }
}
