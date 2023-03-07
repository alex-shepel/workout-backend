import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
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
    example: true,
    description: 'Is training completed?',
  })
  @Column({
    default: false,
    nullable: false,
  })
  Completed: boolean;

  @ManyToMany(() => ExerciseEntity, exercise => exercise.Trainings, { cascade: ['update'] })
  @JoinTable()
  Exercises: ExerciseEntity[];

  @OneToMany(() => SetEntity, set => set.Training)
  Sets: SetEntity[];

  @ManyToOne(() => UserEntity, user => user.Groups)
  User: UserEntity;
}
