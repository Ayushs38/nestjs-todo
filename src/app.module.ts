import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { sequelizeModule } from './lib/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as cookieParser from 'cookie-parser'

@Module({
  imports: [
    
    sequelizeModule,
    TodoModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true}),

  ],
  controllers: [UserController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*');
  }

}
