import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserEntity } from '@/user/user.entity';
import { LoginDto, RegisterDto } from '@/user/dto';
import { IAuthResponse } from '@/user/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { Email: registerDto.Email },
    });
    if (userByEmail) {
      throw new HttpException('Email is taken.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new UserEntity();
    Object.assign(newUser, registerDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { Email: loginDto.Email },
      select: ['ID', 'Email', 'Name', 'Password'],
    });
    if (!userByEmail) {
      throw new HttpException('Incorrect email.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isPasswordCorrect = await compare(loginDto.Password, userByEmail.Password);
    if (!isPasswordCorrect) {
      throw new HttpException('Incorrect password.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return userByEmail;
  }

  async getById(id: UserEntity['ID']): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { ID: id },
    });
  }

  buildResponse(user: UserEntity): IAuthResponse {
    return {
      ID: user.ID,
      Name: user.Name,
      Email: user.Email,
      Token: this.generateToken(user),
    };
  }

  generateToken(user: UserEntity): IAuthResponse['Token'] {
    return sign(
      {
        ID: user.ID,
        Email: user.Email,
      },
      process.env.JWT_SECRET,
    );
  }
}
