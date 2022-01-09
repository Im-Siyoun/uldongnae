import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(content: LoginUserDto): Promise<any> {
    const user = await this.authService.ValidateUser(content);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
