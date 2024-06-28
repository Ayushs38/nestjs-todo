import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(todoDto: TodoDto): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...todoDto,
      isCompleted: false,
    });
    const newTodo = await this.todosRepository.save(todo);
    return newTodo;
  }


  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }


  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateDto: TodoDto): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    Object.assign(todo, updateDto);
    return this.todosRepository.save(todo);
  }


  async markAsCompleted(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.isCompleted = !(todo.isCompleted) ;
    return this.todosRepository.save(todo);
  }


  async remove(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}