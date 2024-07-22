import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/models/todo.model';
import { User } from 'src/models/user.model';


@Module({
  imports: [SequelizeModule.forFeature([Todo, User])],
  controllers: [TodoController],
  providers: [TodoService],
  exports:[TodoService]
})
export class TodoModule {}
