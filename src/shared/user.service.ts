/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDetail, RegisterDetail } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

    private sanitizeUser(user: User) {
      return user.depopulate('password');
    }

    async create(userDetails: RegisterDetail) {
      const { username } = userDetails;
      if (!username || !userDetails.password) {
        throw new HttpException(
          'All credentials are required!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userModel.findOne({ username });
      if (user) {
        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
      }

      const createdUser = new this.userModel(userDetails);
      await createdUser.save();

      return this.sanitizeUser(createdUser);
    }

  async findByLogin(userDetails: LoginDetail) {
    const { username, password } = userDetails;
    if (!password || !username) {
      throw new HttpException(
        'All credentials are required!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    }

    throw new HttpException(
      'Invalid username or password',
      HttpStatus.BAD_REQUEST,
    );
  }
}
