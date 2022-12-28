import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';
import { AuthGuard } from '@/user/guards';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class UserModule {}
