<<<<<<< HEAD
<<<<<<< HEAD
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/updateDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.userService.getUserDetails(req.user.userId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({maxSize: 1000}),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File, 
  ) {
    await this.userService.upload(file.originalname, file.buffer)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUser(@Req() req, @Body() updateData: UpdateUserDto) {
    return this.userService.updateUser(req.user.userId, updateData);
  }
  

}
=======
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
=======
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
>>>>>>> parent of f7e29f6 (authentication changed to passport and guards added)
