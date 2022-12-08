import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ExercisesGroupModel } from 'exercises-group/exercises-group.model';

interface ExerciseCreationAttr {
  Title: string;
  Description: string;
  GroupID: number;
}

@Table({ tableName: 'exercise', createdAt: false, updatedAt: false })
export class ExerciseModel extends Model<ExerciseModel, ExerciseCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @ApiProperty({
    example: 'Arms Muscles',
    description: 'Title of exercises group',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  Title: string;

  @ApiProperty({
    example: 'Trains shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Description: string;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the correspondent group',
  })
  @ForeignKey(() => ExercisesGroupModel)
  @Column({ type: DataType.INTEGER })
  GroupID: number;
}
