import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

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

  @ApiProperty({
    example: 3,
    description: 'The sequential number of template execution.',
  })
  @Column({
    nullable: false,
  })
  SequentialNumber: number;

  @ManyToMany(() => ExerciseEntity, exercise => exercise.Templates)
  @JoinTable()
  Exercises: ExerciseEntity[];

  @ManyToOne(() => UserEntity, user => user.Templates)
  User: UserEntity;
}
