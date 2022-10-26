import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TemplateCreationAttr {
  Title: string;
  Description: string;
}

@Table({ tableName: 'templates' })
export class TemplateModel extends Model<TemplateModel, TemplateCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;

  @ApiProperty({
    example: 'Easy Training',
    description: 'Title of the training template',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  Title: string;

  @ApiProperty({
    example: 'Choose to recover the body muscles after the hard trainings.',
    description: 'Description of the training template',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Description: string;
}
