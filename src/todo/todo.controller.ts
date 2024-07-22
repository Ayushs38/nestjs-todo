import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';


@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private TodoService: TodoService) {}

  @Post()
  async create(@Req() req, @Body() TodoDto: TodoDto) {
    return this.TodoService.createTodo(req.user.userId, TodoDto);
  }

  @Get()
  async findAll(@Req() req) {
    return this.TodoService.getTodosByUserId(req.user.userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: number) {
    return this.TodoService.findOneTodo(req.user.userId, id);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateDto: TodoDto,
  ) {
    return this.TodoService.updateTodo(req.user.userId, id, updateDto);
  }

  @Patch(':id/complete')
  async markAsCompleted(@Req() req, @Param('id') id: number) {
    console.log(req.user);
    return this.TodoService.markAsCompleted(req.user.userId, id);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    return this.TodoService.removeTodo(req.user.userId, id);
  }
}
