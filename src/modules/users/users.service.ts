import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { pbkdf2Sync, randomBytes } from 'crypto';
import moment from 'moment';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userdto: CreateUserDto): Promise<User> {
    const salt = randomBytes(16).toString('base64');
    const user = {
      id: userdto.id,
      nickname: userdto.nickname,
      password: pbkdf2Sync(
        userdto.password,
        salt,
        10000,
        64,
        'sha512',
      ).toString('base64'),
      salt,
      email: userdto.email,
      birth: userdto.birth,
    };
    const result = await this.userModel.create(user);

    return result;
  }

  async find(id: string): Promise<User> {
    const result = await this.userModel.findOne({ id });
    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }

  async findAll(): Promise<User[]> {
    const result = await this.userModel.find();

    return result;
  }

  async update(id, content: UpdateUserDto): Promise<User> {
    if (content.nickname) {
      throw new Error('nickname is not allowed to update');
    }
    const result = await this.userModel.findOneAndUpdate({ id }, content);
    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }

  async delete(id: string): Promise<User> {
    const result = await this.userModel.findOneAndDelete({ id });
    if (!result) {
      throw new Error('User not found');
    }

    return result;
  }

  async track(id: string): Promise<any> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${user.longitude},${user.latitude}&language=ko&key=${process.env.GOOGLE_API_KEY}`,
    );
    if (!response.data.results) {
      throw new Error('location not found');
    }
    user.region = response.data.results[2].formatted_address;
    await this.userModel.findOneAndUpdate({ id }, user);

    return response.data.results[2].formatted_address;
  }

  async getDistance(id1: string, id2: string): Promise<any> {
    const user1 = await this.userModel.findOne({ id: id1 });
    const user2 = await this.userModel.findOne({ id: id2 });
  }

  async addinterest(id: string, post: string): Promise<any> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    const result = await this.userModel.findOneAndUpdate(
      { id },
      { interests: user.interests.concat(post) },
    );

    return result;
  }

  async addword(id: string, word: string): Promise<any> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    const result = await this.userModel.findOneAndUpdate(
      { id },
      { words: user.words.concat(word) },
    );

    return result;
  }

  async updateNickname(id: string, nickname: string): Promise<User> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }
    const t1 = moment(user.lastNicknameUpdate);
    const t2 = moment();
    if (moment.duration(t2.diff(t1)).asDays() < 15) {
      throw new Error('15일 이내에 닉네임 변경이 불가능합니다.');
    }
    const result = await user.update({ nickname });

    return result;
  }
}
