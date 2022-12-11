import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// interface ExerciseCreationAttr {
//   Title: string;
//   Description: string;
//   GroupID: number;
// }

@Entity({ name: 'exercises' })
export class ExerciseEntity /*extends Model<ExerciseEntity, ExerciseCreationAttr>*/ {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  // @Column({
  //   type: DataType.INTEGER,
  //   unique: true,
  //   autoIncrement: true,
  //   primaryKey: true,
  // })
  @PrimaryGeneratedColumn()
  ID: number;

  @ApiProperty({
    example: 'Arms Muscles',
    description: 'Title of exercises group',
  })
  // @Column({
  //   type: DataType.STRING,
  //   unique: true,
  //   allowNull: false,
  // })
  @Column()
  Title: string;

  @ApiProperty({
    example: 'Trains shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  @Column()
  Description: string;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the correspondent group',
  })
  // @ForeignKey(() => ExercisesGroupModel)
  // @Column({ type: DataType.INTEGER })
  @Column()
  GroupID: number;
}
