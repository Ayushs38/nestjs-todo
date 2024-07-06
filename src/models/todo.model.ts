import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class  Todo extends Model<Todo> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isCompleted: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
// import { Sequelize, DataTypes } from 'sequelize';

// const sequelize = new Sequelize('postgres::memory:')

// const TodoSchema = {
//     id:{
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     title:{
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     description:{
//         type:DataTypes.TEXT,
//     },
//     isCompleted:{
//         type:DataTypes.BOOLEAN,
//         default: false
//     }

// }
// export const Todo = sequelize.define('Todo',TodoSchema);