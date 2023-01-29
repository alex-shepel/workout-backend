import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetEntity } from '@/set/set.entity';
import { SetService } from '@/set/set.service';
import { SetController } from '@/set/set.controller';

@Module({
  providers: [SetService],
  controllers: [SetController],
  imports: [TypeOrmModule.forFeature([SetEntity])],
})
export class SetModule {}
