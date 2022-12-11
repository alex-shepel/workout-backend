import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// interface TemplateCreationAttr {
//   Title: string;
//   Description: string;
// }

@Entity({ name: 'templates' })
export class TemplateEntity /*extends Model<TemplateModel, TemplateCreationAttr>*/ {
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
    example: 'Easy Training',
    description: 'Title of the training template',
  })
  // @Column({
  //   type: DataType.STRING,
  //   unique: true,
  //   allowNull: false,
  // })
  @Column()
  Title: string;

  @ApiProperty({
    example: 'Choose to recover the body muscles after the hard trainings.',
    description: 'Description of the training template',
  })
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  @Column()
  Description: string;
}
