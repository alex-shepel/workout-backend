import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorService } from '@/monitor/monitor.service';
import { MonitorController } from '@/monitor/monitor.controller';
import { MonitorEntity } from '@/monitor/monitor.entity';

@Module({
  providers: [MonitorService],
  controllers: [MonitorController],
  imports: [TypeOrmModule.forFeature([MonitorEntity])],
  exports: [MonitorService],
})
export class MonitorModule {}
