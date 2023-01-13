import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GroupEntity } from '@/group/group.entity';
import { TemplateEntity } from '@/template/template.entity';
import { UserEntity } from '@/user/user.entity';

@Entity({ name: 'exercises' })
export class ExerciseEntity {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
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

  @ManyToOne(() => GroupEntity, group => group.Exercises, {})
  Group: GroupEntity;

  @ManyToMany(() => TemplateEntity, template => template.Exercises)
  Templates: TemplateEntity[];

  @ManyToOne(() => UserEntity, user => user.Exercises)
  User: UserEntity;
}
