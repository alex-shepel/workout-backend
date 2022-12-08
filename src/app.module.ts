import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { ExercisesGroupModule } from 'exercises-group/exercises-group.module';
import { ExercisesGroupModel } from 'exercises-group/exercises-group.model';

import { ExerciseModule } from 'exercise/exercise.module';
import { ExerciseModel } from 'exercise/exercise.model';

import { TemplateModule } from 'template/template.module';
import { TemplateModel } from 'template/template.model';

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
      models: [ExercisesGroupModel, ExerciseModel, TemplateModel],
      autoLoadModels: true,
    }),
    ExercisesGroupModule,
    ExerciseModule,
    TemplateModule,
  ],
})
export class AppModule {}
