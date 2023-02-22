import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@/ormconfig';
import { ExerciseModule } from '@/exercise/exercise.module';
import { TemplateModule } from '@/template/template.module';
import { GroupModule } from '@/group/group.module';
import { UserModule } from '@/user/user.module';
import { AuthMiddleware } from '@/user/middlewares';
import { SetModule } from '@/set/set.module';
import { TrainingModule } from '@/training/training.module';
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(ormconfig),
    ExerciseModule,
    TemplateModule,
    GroupModule,
    UserModule,
    SetModule,
    TrainingModule,
    MonitorModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
