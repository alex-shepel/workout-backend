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
import { GroupEntity } from '@/group/group.entity';
import { TemplateEntity } from '@/template/template.entity';
import { UserEntity } from '@/user/user.entity';
import { SetEntity } from '@/set/set.entity';
import { TrainingEntity } from '@/training/training.entity';

@Entity({ name: 'exercises' })
export class ExerciseEntity {
  @ApiProperty({ example: '27ed-6f79-40b1-aa4b-d24f', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 'Arms Muscles',
    description: 'Title of exercises group',
  })
  @Column({
    nullable: false,
  })
  Title: string;

  @ApiProperty({
    example: 'Trains shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  @Column({
    default: '',
    nullable: false,
  })
  Description: string;

  @ManyToOne(() => GroupEntity, group => group.Exercises)
  Group: GroupEntity;

  @ManyToMany(() => TemplateEntity, template => template.Exercises)
  Templates: TemplateEntity[];

  @OneToMany(() => SetEntity, set => set.Exercise)
  Sets: SetEntity;

  @ManyToMany(() => TrainingEntity, training => training.Exercises)
  @JoinTable()
  Trainings: TrainingEntity[];

  @ManyToOne(() => UserEntity, user => user.Exercises)
  User: UserEntity;
}
