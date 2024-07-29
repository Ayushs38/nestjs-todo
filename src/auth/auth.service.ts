import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/models/user.model';
import { UserService } from '../user/user.service';
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(
    username: string,
    email: string,
    pass: string,
  ): Promise<{ message: string; accessToken: string; user: User }> {
    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    try {
      const user = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      const payload = { username: user.username, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload, 
        {
          expiresIn:'1h'
        }
      );

      return {
        message: 'User created successfully and logged in!',
        accessToken,
        user: user

      };
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new BadRequestException('Failed to create a user');
    }
  }

  async login(email: string, pass: string): Promise<{ accessToken: string, user: User }> {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('Invalid email',);
      }

      const isMatch = await bcrypt.compare(pass, user.password);

      if (!isMatch) {
        throw new BadRequestException('Invalid password');
      }

      const payload = { email: user.email, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken,
        user: user
       };
    } catch (error: any) {
      throw new BadRequestException('error while logging in', error);
    }
  }

  async validateUser(
    username: string,
    email: string,
    pass: string,
  ): Promise<any> {
    try {
      const user = await this.userService.findOneUser(username, email);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user.toJSON();
        return result;
      }
    } catch (error: any) {
        throw new UnauthorizedException("User not authorized", error.message);
    }
  }

  async getCookieWithJwtToken(userId: number){
    const  payload = { userId };
    const token = await this.jwtService.signAsync(payload,{
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=3600`;
  }

  async getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

}
