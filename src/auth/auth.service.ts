import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from 'jsonwebtoken';
import { Op } from 'sequelize';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, email: string, pass: string): Promise<any> {
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
      const user  = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      const payload: JwtPayload = { username: user.username, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);

      return { message: 'User created successfully', accessToken };
    } catch (error) {
      throw new BadRequestException('Failed to create a user');
    }
  }

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

 
}
