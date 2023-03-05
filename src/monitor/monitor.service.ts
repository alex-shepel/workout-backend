import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorEntity } from '@/monitor/monitor.entity';
import { UserEntity } from '@/user/user.entity';
import { UpdateMonitorStateDto } from '@/monitor/dto';
import { MonitorState } from '@/monitor/types';

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

  async getCurrentState(userId: UserEntity['ID']): Promise<MonitorState> {
    return await this.monitorRepository
      .createQueryBuilder('monitors')
      .leftJoinAndSelect('monitors.User', 'user')
      .where('user.ID = :userId', { userId })
      .addSelect('"LastTemplateSequentialNumber", "TrainingsCount"')
      .getOne();
  }

  async update(userId: UserEntity['ID'], dto: UpdateMonitorStateDto): Promise<MonitorState> {
    const monitor = await this.monitorRepository.findOne({
      where: {
        User: { ID: userId },
      },
    });
    await this.monitorRepository.merge(monitor, dto);
    const { LastTemplateSequentialNumber, TrainingsCount } = await this.monitorRepository.save(
      monitor,
    );
    return { LastTemplateSequentialNumber, TrainingsCount };
  }
}
