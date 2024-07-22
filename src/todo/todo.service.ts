import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/models/todo.model';
import { User } from 'src/models/user.model';
import { error } from 'console';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModal: typeof Todo,
    @InjectModel(User)
    private userModal: typeof User,
  ) {}

  async createTodo(userId: number, todoDto: TodoDto): Promise<Todo> {
    // console.log("User id is: ",userId);
    const user = await this.userModal.findByPk(userId);

    if (!user) throw new NotFoundException('User not found');

    return this.todoModal.create({ ...todoDto, userId });
  }

  async getTodosByUserId(userId: number): Promise<Todo[]> {
    return this.todoModal.findAll({
      where: { userId },
    });
  }

  async findOneTodo(userId: number, id: number): Promise<Todo> {
    const todo =
      (await this.todoModal.findOne({ where: { id, userId } })) ||
      (() => {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      })();
    return todo;
  }

  async updateTodo(
    userId: number,
    id: number,
    updateDto: TodoDto,
  ): Promise<Todo> {
    const todo = await this.findOneTodo(userId, id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    Object.assign(todo, updateDto);
    await todo.save();
    return todo;
  }

  async markAsCompleted(userId: number, id: number): Promise<Todo> {
    const todo = await this.findOneTodo(userId, id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    return todo;
  }

  async removeTodo(userId: number, id: number): Promise<void> {
    const todo = await this.findOneTodo(userId, id);
    await todo.destroy();
  }
}
