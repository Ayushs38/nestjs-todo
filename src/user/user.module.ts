import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { UserController } from './user.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
