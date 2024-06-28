import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
    private todos: TodoDto[] = [];
    private idCounter = 1;

    create(todoDto: TodoDto):TodoDto{
        todoDto.isCompleted = false;
        const newTodo = {...todoDto, id: this.idCounter++};
        this.todos.push(newTodo);
        return newTodo; 
    }

    findAll(): TodoDto[]{
        return this.todos;
    }

    findOne(id:number): TodoDto{
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
          throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    update(id: number, updateDto: TodoDto): TodoDto{
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if(todoIndex === -1){
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        const updatedTodo = {...this.todos[todoIndex], ...updateDto};
        this.todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }

    markAsCompleted(id: number): TodoDto {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
          throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        this.todos[todoIndex].isCompleted = true;
        return this.todos[todoIndex];
      }

    remove(id: number):void{
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if(todoIndex === -1){
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        this.todos.splice(todoIndex, 1);
    }
}
