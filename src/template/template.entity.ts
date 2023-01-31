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
import { UserEntity } from '@/user/user.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { TrainingEntity } from '@/training/training.entity';

@Entity({ name: 'templates' })
export class TemplateEntity {
  @ApiProperty({ example: '27ed-6f79-40b1-aa4b-d24f', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 'Easy Training',
    description: 'Title of the training template',
  })
  @Column({
    unique: true,
    nullable: false,
  })
  Title: string;

  @ApiProperty({
    example: 'Choose to recover the body muscles after the hard trainings.',
    description: 'Description of the training template',
  })
  @Column({
    default: '',
    nullable: false,
  })
  Description: string;

  @OneToMany(() => TrainingEntity, training => training.Template)
  Trainings: TrainingEntity[];

  @ManyToMany(() => ExerciseEntity, exercise => exercise.Templates)
  @JoinTable()
  Exercises: ExerciseEntity[];

  @ManyToOne(() => UserEntity, user => user.Templates)
  User: UserEntity;
}
