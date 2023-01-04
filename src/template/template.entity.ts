import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { ExerciseEntity } from '@/exercise/exercise.entity';

@Entity({ name: 'templates' })
export class TemplateEntity {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
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

  @ManyToMany(() => ExerciseEntity, exercise => exercise.Templates, { eager: true })
  @JoinTable()
  Exercises: ExerciseEntity[];

  @ManyToOne(() => UserEntity, user => user.Templates)
  User: UserEntity;
}
