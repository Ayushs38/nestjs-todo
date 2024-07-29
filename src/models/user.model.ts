<<<<<<< HEAD
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Todo } from './todo.model';
=======
import { Column, DataType, Model, Table } from "sequelize-typescript";
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)

@Table
export class User extends Model<User>{
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

<<<<<<< HEAD
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  refreshTokenExp: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicUrl: string;


  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dateOfBirth: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber: string;

  @HasMany(() => Todo)
  todos: Todo[];
=======
    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    password: string;
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
}
