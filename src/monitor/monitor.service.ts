import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorEntity } from '@/monitor/monitor.entity';
import { UserEntity } from '@/user/user.entity';

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(MonitorEntity)
    private readonly monitorRepository: Repository<MonitorEntity>,
  ) {}

  async create(user: UserEntity): Promise<MonitorEntity> {
    const existingMonitor = await this.monitorRepository.findOne({
      where: {
        User: { ID: user.ID },
      },
    });
    if (existingMonitor) {
      throw new HttpException('User already has an activity monitor.', HttpStatus.CONFLICT);
    }
    const monitor = new MonitorEntity();
    this.monitorRepository.merge(monitor, { User: user });
    return await this.monitorRepository.save(monitor);
  }

  async getCurrentTemplate(userId: UserEntity['ID']): Promise<number> {
    const { LastTemplateSequentialNumber } = await this.monitorRepository.findOne({
      select: ['LastTemplateSequentialNumber'],
      where: {
        User: { ID: userId },
      },
    });
    return LastTemplateSequentialNumber;
  }
}
