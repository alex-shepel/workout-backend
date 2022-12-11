import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// interface ExercisesGroupCreationAttr {
//   Title: string;
//   Description: string;
// }

@Entity({ name: 'exercises_groups' })
export class ExercisesGroupEntity /*extends Model<ExercisesGroupModel, ExercisesGroupCreationAttr>*/ {
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
    example: 'Helps to train shoulder and forearm muscles.',
    description: 'Description of represented exercises group',
  })
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  @Column()
  Description: string;
}
