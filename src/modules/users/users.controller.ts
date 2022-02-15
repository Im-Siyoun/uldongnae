import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.create(createUserDto);

    return user;
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HttpCode(200)
  async find(@Req() request: any): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.find(json.id);
  }

  @HttpCode(200)
  async update(
    @Req() request: any,
    @Body(ValidationPipe) updateUserDTO: UpdateUserDto,
  ): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.update(json.id, updateUserDTO);
  }

  @HttpCode(200)
  async delete(@Req() request: any): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.delete(json.id);
  }

  @Get('/locate')
  async locate(@Req() request: any): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.track(json.id);
  }

  @Post('/interest')
  async addinterest(
    @Req() request: any,
    @Body(ValidationPipe) data: any,
  ): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.addinterest(json.id, data.post);
  }

  @Post('/words')
  async addword(
    @Req() request: any,
    @Body(ValidationPipe) word: string,
  ): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.addword(json.id, word);
  }

  @Patch('/nickname')
  async updatenickname(
    @Req() request: any,
    @Body(ValidationPipe) nickname: string,
  ): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.updateNickname(json.id, nickname);
  }

  @Get('/distance')
  async getdistance(@Req() request: any, @Body() data: any): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.userService.getDistance(json.id, data.id);
  }
}
