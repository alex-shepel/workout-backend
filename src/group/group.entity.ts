import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseEntity } from '@/exercise/exercise.entity';
import { UserEntity } from '@/user/user.entity';

@Entity({ name: 'groups' })
export class GroupEntity {
  @ApiProperty({ example: '27ed-6f79-40b1-aa4b-d24f', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 'Arms Muscles',
    description: 'Title of exercises group',
  })
  @Column({
    unique: true,
    nullable: false,
  })
  Title: string;

  @ApiProperty({
    example: 'Helps to train shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  @Column({
    default: '',
    nullable: false,
  })
  Description: string;

  @OneToMany(() => ExerciseEntity, exercise => exercise.Group)
  Exercises: ExerciseEntity[];

  @ManyToOne(() => UserEntity, user => user.Groups)
  User: UserEntity;
}
