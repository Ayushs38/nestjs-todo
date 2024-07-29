import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/models/todo.model';
<<<<<<< HEAD
<<<<<<< HEAD
import { User } from 'src/models/user.model';
=======

>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
=======

>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModal: typeof Todo,
  ) {}

  async create(todoDto: TodoDto): Promise<Todo> {
    const todo = this.todoModal.create({
      ...todoDto,
      isCompleted: false,
    });
    return todo;
  }


  findAll(): Promise<Todo[]> {
    return this.todoModal.findAll();
  }


  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoModal.findOne({where: { id} }) || (() => { throw new NotFoundException(`Todo with ID ${id} not found`); })();
    return todo;
  }

  async update(id: number, updateDto: TodoDto): Promise<Todo> {
    const todo = await this.todoModal.findOne({where: { id} });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    Object.assign(todo, updateDto);
    await todo.save();
    return todo
  }


  async markAsCompleted(id: number): Promise<Todo> {
    const todo = await this.todoModal.findOne({where: { id} });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.isCompleted = !(todo.isCompleted) ;
    await todo.save();
    return todo;
  }


  async remove(id: number): Promise<void> {
    const result = await this.todoModal.destroy({where: {id}});
    if (result === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}