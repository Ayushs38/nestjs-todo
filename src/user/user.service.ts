import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOneUser(
    username: string,
    email: string,
  ): Promise<User | undefined> {
    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return user;
  }

  async createUser(
    username: string,
    email: string,
    pass: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      email,
    });
    return user.save();
  }

  

  
}
