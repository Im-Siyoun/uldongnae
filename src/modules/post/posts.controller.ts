import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Post as p } from './schemas/post.schema';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postservice: PostsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<p> {
    const post = await this.postservice.create(createPostDto);

    return post;
  }

  @Get('/')
  @HttpCode(200)
  async find(): Promise<p[]> {
    return this.postservice.findAll();
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostDTO: UpdatePostDto,
  ): Promise<p> {
    return this.postservice.update(id, updatePostDTO);
  }
}
