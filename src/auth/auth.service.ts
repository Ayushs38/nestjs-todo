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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    email: string,
    pass: string,
  ): Promise<{ message: string; accessToken: string }> {
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

      const payload = { username: user.username, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);

      return { message: 'User created successfully and logged in', accessToken };
    } catch (error) {
      throw new BadRequestException('Failed to create a user');
    }
  }

  async login(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ where: { email } });
    // console.log("user:", user)
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async validateUser(username: string,email: string,  pass: string): Promise<any> {
    const user = await this.userService.findOneUser(username, email);
    // console.log("User while validating:", user)
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toJSON();
      // console.log("result:", result);
      return result;
    }
    return null;
  }
}
