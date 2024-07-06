import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions:{
        expiresIn: '3600s',
      }
    }),
],
  controllers: [ AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
