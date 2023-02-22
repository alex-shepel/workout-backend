import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';
import { AuthGuard } from '@/user/guards';
import { MonitorModule } from '@/monitor/monitor.module';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  imports: [TypeOrmModule.forFeature([UserEntity]), MonitorModule],
  exports: [UserService],
})
export class UserModule {}
