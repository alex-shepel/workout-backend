import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { UserEntity } from '@/user/user.entity';
import { TrainingEntity } from '@/training/training.entity';

@Entity({ name: 'sets' })
export class SetEntity {
  @ApiProperty({ example: '27ed-6f79-40b1-aa4b-d24f', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 'Tue Jan 17 2023 10:28:35 GMT+0200',
    description: 'The date of set completion.',
  })
  @CreateDateColumn()
  CreatedDate: Date;

  @ApiProperty({
    example: 70,
    description: 'The weight of the dumbbell(s) or barbell.',
  })
  @Column({
    nullable: false,
  })
  Weight: number;

  @ApiProperty({
    example: 12,
    description: 'The count of repetitions.',
  })
  @Column({
    nullable: false,
  })
  Repetitions: number;

  @ApiProperty({
    example: true,
    description: 'Is set completed?',
  })
  @Column({
    default: false,
    nullable: false,
  })
  Completed: boolean;

  @ManyToOne(() => ExerciseEntity, exercise => exercise.Sets)
  Exercise: ExerciseEntity;

  @ManyToOne(() => TrainingEntity, training => training.Sets)
  Training: TrainingEntity;

  @ManyToOne(() => UserEntity, user => user.Sets)
  User: UserEntity;
}
