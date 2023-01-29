import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetEntity } from '@/set/set.entity';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(SetEntity)
    private readonly exerciseRepository: Repository<SetEntity>,
  ) {}
}
