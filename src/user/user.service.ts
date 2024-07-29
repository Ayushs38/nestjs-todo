import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateDto';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UserService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow<string>('AWS_S3_REGION'),
    credentials:{
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
    }
  });
  constructor(
    private readonly configService: ConfigService,
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

  async getUserDetails(userId: number): Promise<any> {
    const user =
      (await this.userModel.findOne({
        where: {
          id: userId,
        },
      })) ||
      (() => {
        throw new NotFoundException(
          `Can't get the user details with ${userId}`,
        );
      })();
    const { password, updatedAt, ...userDetails } = user.dataValues;
    console.log('User details:', userDetails);
    return userDetails;
  }

 

  async upload(fileName: string, file: Buffer) {
    // console.log('Filename uploaded:', fileName);
     await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjs-todo-upload-bucket',
        Key: fileName,
        Body: file,
      }),
    );

  }

  async updateUser(userId: number, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User not found with ${userId}`);
    }
    return user.update(updateData);
  }

}
