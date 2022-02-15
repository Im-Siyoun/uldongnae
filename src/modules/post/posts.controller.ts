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
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Post as p } from './schemas/post.schema';

@Controller('/posts')
export class PostsController {
  constructor(
    private readonly postservice: PostsService,
    private readonly authservice: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Req() request: any,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<p> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    createPostDto.writer = json.id;
    const post = await this.postservice.create(createPostDto);

    return post;
  }

  @Get('/')
  @HttpCode(200)
  async find(): Promise<p[]> {
    return this.postservice.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<p> {
    return this.postservice.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Req() request: any,
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostDTO: UpdatePostDto,
  ): Promise<p> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    return this.postservice.update(json.id, id, updatePostDTO);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Req() request: any, @Param('id') id: string): Promise<p> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    return this.postservice.delete(json.id, id);
  }
}
