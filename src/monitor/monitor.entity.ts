import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@/user/user.entity';

@Entity({ name: 'monitors' })
export class MonitorEntity {
  @ApiProperty({ example: '27ed-6f79-40b1-aa4b-d24f', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @ApiProperty({
    example: 3,
    description: 'Sequential number of the currently used template.',
  })
  @Column({
    nullable: false,
    default: 0,
  })
  LastTemplateSequentialNumber: number;

  @ApiProperty({
    example: 42,
    description: 'The count of the completed trainings.',
  })
  @Column({
    nullable: false,
    default: 0,
  })
  TrainingsCount: number;

  @OneToOne(() => UserEntity, user => user.Monitor)
  User: UserEntity;
}
