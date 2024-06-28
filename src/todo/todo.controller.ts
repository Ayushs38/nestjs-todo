import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { Controller, Get, Post, Body,Param, Patch, Delete } from '@nestjs/common';


@Controller('todo')
export class TodoController {
    constructor(private readonly TodoService: TodoService){}

    @Post()
    create(@Body() TodoDto: TodoDto){
        return this.TodoService.create(TodoDto);
    }

    @Get()
    findAll(){
        return this.TodoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.TodoService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() updateDto: TodoDto){
        return this.TodoService.update(id, updateDto);
    }

    @Patch(':id/complete')
    markAsCompleted(@Param('id') id: number) {
    return this.TodoService.markAsCompleted(id)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.TodoService.remove(id);
    }
}