import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { sequelizeModule } from './lib/sequelize';


@Module({
  imports: [
    sequelizeModule,
    TodoModule,
    AuthModule,

  ],
})
export class AppModule {}
