import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { GroupEntity } from '@/group/group.entity';
import { MonitorEntity } from '@/monitor/monitor.entity';
import { SetEntity } from '@/set/set.entity';
import { TemplateEntity } from '@/template/template.entity';
import { TrainingEntity } from '@/training/training.entity';
import { UserEntity } from '@/user/user.entity';
import {
  InitializeTables1677050964071,
  JoinMonitorsColumnIntoUsersTable1677058561597,
} from '@/migrations';

const config: DataSourceOptions & TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'workout',
  password: 'root',
  database: 'workout',
  entities: [
    ExerciseEntity,
    GroupEntity,
    MonitorEntity,
    SetEntity,
    TemplateEntity,
    TrainingEntity,
    UserEntity,
  ],
  synchronize: false,
  migrations: [InitializeTables1677050964071, JoinMonitorsColumnIntoUsersTable1677058561597],
};

export default config;
