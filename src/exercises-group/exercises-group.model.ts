import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ExercisesGroupCreationAttr {
  Title: string;
  Description: string;
}

@Table({ tableName: 'exercises_group', createdAt: false, updatedAt: false })
export class ExercisesGroupModel extends Model<ExercisesGroupModel, ExercisesGroupCreationAttr> {
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
    example: 'Helps to train shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Description: string;
}
