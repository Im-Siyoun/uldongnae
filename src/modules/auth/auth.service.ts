import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(content): Promise<any> {
    try {
      const user = await this.userService.find(content.id);
      const CryptedPassword = pbkdf2Sync(
        content.password,
        user.salt,
        10000,
        64,
        'SHA512',
      ).toString('base64');
      console.log(user)
      if (user.password === CryptedPassword) {
        const cookie = await this.login({ id: content.id });

        return cookie;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }

    return null;
  }

  async login(user: any) {
    return this.jwtService.sign(user);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
