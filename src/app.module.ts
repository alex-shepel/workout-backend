import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExercisesGroupsModule, ExercisesGroupModel } from 'exercises-groups';
import { ExercisesModule, ExerciseModel } from 'exercises';

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
      models: [ExercisesGroupModel, ExerciseModel],
      autoLoadModels: true,
    }),
    ExercisesGroupsModule,
    ExercisesModule,
  ],
})
export class AppModule {}
