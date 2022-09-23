import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ExercisesGroupCreationAttr {
  Title: string;
  Description: string;
}

@Table({ tableName: 'exercises_groups' })
export class ExercisesGroupModel extends Model<
  ExercisesGroupModel,
  ExercisesGroupCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  ID: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  Title: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Description: string;
}
