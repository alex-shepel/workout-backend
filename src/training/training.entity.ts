import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
    description: 'The date of training creation.',
  })
  @CreateDateColumn()
  CreatedDate: Date;

  @ApiProperty({
    example: 'Sat Jan 21 2023 10:31:42 GMT+0200',
    description: 'The date of last training update.',
  })
  @UpdateDateColumn()
  UpdatedDate: Date;

  @ApiProperty({
    example: 42,
    description: "The training's sequential number.",
  })
  @Column()
  @Generated('increment')
  SequentialNumber: number;

  @ApiProperty({
    example: true,
    description: 'Is training completed?',
  })
  @Column({
    default: false,
    nullable: false,
  })
  Completed: boolean;

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
