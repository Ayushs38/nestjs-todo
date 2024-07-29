// todo.model.ts
import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Todo extends Model<Todo> {
  @Column({
    allowNull: false,
  })
  title: string;

  @Column
  description: string;

  @Column({
    allowNull: false,
    defaultValue: false,
  })
  isCompleted: boolean;

  // @ForeignKey(() => User)
  // @Column({
  //   allowNull: false, // Changed from false to true
  // })
  // userId: number ;

  // @BelongsTo(() => User)
  // user: User;
}
