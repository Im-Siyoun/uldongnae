/* eslint-disable operator-linebreak */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';

const moment = require('moment');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async nickname(): Promise<string> {
    const rawdata = readFileSync('../json/name.json', 'utf8');
    const name = JSON.parse(rawdata);
    const { adjective } = name;
    const { noun } = name;
    const adjectiveIndex = Math.floor(Math.random() * adjective.length);
    const nounIndex = Math.floor(Math.random() * noun.length);

    return `${adjective[adjectiveIndex]}${noun[nounIndex]}`;
  }

  async create(userdto: CreateUserDto): Promise<User> {
    const salt = randomBytes(16).toString('base64');
    const user = {
      id: userdto.id,
      nickname: userdto.nickname ? userdto.nickname : await this.nickname(),
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
    user.recentlyUpdated = new Date();
    user.region = response.data.results[2].formatted_address;
    await this.userModel.findOneAndUpdate({ id }, user);

    return response.data.results[2].formatted_address;
  }

  async getDistance(id1: string, id2: string): Promise<any> {
    const user1 = await this.userModel.findOne({ id: id1 });
    const user2 = await this.userModel.findOne({ id: id2 });
    const lat1 = user1.latitude;
    const lng1 = user1.longitude;
    const lat2 = user2.latitude;
    const lng2 = user2.longitude;

    const deg2rad = (deg) => deg * (Math.PI / 180);
    const r = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c;

    return d;
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

  async updateNickname(id: string, nickname: string): Promise<any> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    } else if (user.nickname === nickname) {
      throw new Error('동일한 닉네임으로 변경할 수 없습니다.');
    } else if (!user.lastNicknameUpdate) {
      await user.update({
        lastNicknameUpdate: new Date(),
        nickname,
      });

      return { message: '닉네임 변경에 성공했습니다.' };
    } else {
      const t1 = moment(user.lastNicknameUpdate);
      const t2 = moment();
      if (moment.duration(t2.diff(t1)).asDays() < 15) {
        throw new Error('15일 이내에 닉네임 변경이 불가능합니다.');
      }
      const result = await user.update({ nickname });

      return result;
    }
  }
}
