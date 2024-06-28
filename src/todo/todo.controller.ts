import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { Controller, Get, Post, Body,Param, Patch, Delete, Put } from '@nestjs/common';


@Controller('todo')
export class TodoController {
    constructor(private  TodoService: TodoService){}

    @Post()
    async create(@Body() TodoDto: TodoDto){
        return this.TodoService.create(TodoDto);
    }

    @Get()
    async findAll(){
        return this.TodoService.findAll();
    }

    @Get(':id')
    async  findOne(@Param('id') id:number){
        return this.TodoService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id:number, @Body() updateDto: TodoDto){
        return this.TodoService.update(id, updateDto);
    }

    @Patch(':id/complete')
    async markAsCompleted(@Param('id') id: number) {
    return this.TodoService.markAsCompleted(id)
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.TodoService.remove(id);
    }
}