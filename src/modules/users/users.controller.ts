import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/modules/roles/role.enum';
import { Roles } from 'src/modules/roles/roles.decorator';
import { ValidationPipe } from 'src/pipes';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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

  @Get('/:id')
  @HttpCode(200)
  async find(@Param('id') id: string): Promise<User> {
    return this.userService.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDTO: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Get('/locate/:id')
  async locate(@Param('id') id: string): Promise<User> {
    return this.userService.track(id);
  }

  @Post('/interest/:id')
  async addinterest(
    @Param('id') id: string,
    @Body(ValidationPipe) data: any,
  ): Promise<User> {
    return this.userService.addinterest(id, data.post);
  }

  @Post('/words/:id')
  async addword(@Param('id') id: string,
  @Body(ValidationPipe) word: string): Promise<User> {
    return this.userService.addword(id, word);
  }

  @Patch('/nickname/:id')
  async updatenickname(@Param('id') id: string,
  @Body(ValidationPipe) nickname: string): Promise<User> {
    return this.userService.updateNickname(id, nickname);
  }
}
