import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@/ormconfig';
import { ExerciseModule } from '@/exercise/exercise.module';
import { TemplateModule } from '@/template/template.module';
import { ExercisesGroupModule } from '@/exercises-group/exercises-group.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(ormconfig),
    ExerciseModule,
    TemplateModule,
    ExercisesGroupModule,
    UserModule,
  ],
})
export class AppModule {}
