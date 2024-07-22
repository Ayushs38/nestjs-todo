import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { sequelizeModule } from './lib/sequelize';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    sequelizeModule,
    TodoModule,
    AuthModule,
    UserModule,

  ],
  
})
export class AppModule {}
