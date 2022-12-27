import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { RegisterDto } from '@/user/dto';
import { sign } from 'jsonwebtoken';
import * as process from 'process';
import { RegisterResponseInterface } from '@/user/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseInterface> {
    const user = new UserEntity();
    Object.assign(user, registerDto);
    const userEntity = await this.userRepository.save(user);
    return {
      ID: userEntity.ID,
      Name: userEntity.Name,
      Email: userEntity.Email,
      Token: this.generateToken(user),
    };
  }

  generateToken(user: UserEntity): RegisterResponseInterface['Token'] {
    return sign(
      {
        ID: user.ID,
        Name: user.Name,
        Email: user.Email,
      },
      process.env.JWT_SECRET,
    );
  }
}
