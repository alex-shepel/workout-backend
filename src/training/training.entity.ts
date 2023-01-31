import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { UserEntity } from '@/user/user.entity';
import { SetEntity } from '@/set/set.entity';
import { TemplateEntity } from '@/template/template.entity';

@Entity({ name: 'trainings' })
export class TrainingEntity {
  @ApiProperty({ example: '27ed-6f79-40b1-aa4b-d24f', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 'Tue Jan 17 2023 10:28:35 GMT+0200',
    description: 'The date of training completion.',
  })
  @Column({
    default: new Date(),
    nullable: false,
  })
  Date: Date;

  @ManyToOne(() => TemplateEntity, template => template.Trainings)
  Template: TemplateEntity;

  @ManyToMany(() => ExerciseEntity, exercise => exercise.Trainings)
  @JoinTable()
  Exercises: ExerciseEntity[];

  @OneToMany(() => SetEntity, set => set.Training)
  Sets: SetEntity;

  @ManyToOne(() => UserEntity, user => user.Groups)
  User: UserEntity;
}
