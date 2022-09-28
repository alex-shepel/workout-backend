import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExercisesGroupsModule } from './exercises-groups/exercises-groups.module';
import { ExercisesGroupModel } from './exercises-groups/exercises-groups.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [ExercisesGroupModel],
      autoLoadModels: true,
    }),
    ExercisesGroupsModule,
  ],
})
export class AppModule {}
