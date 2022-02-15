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
import { ObjectId } from 'mongoose';

import { AuthService } from '../auth/auth.service';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';

@Controller('/comments')
export class CommentsController {
  constructor(
    private readonly commentservice: CommentsService,
    private readonly authservice: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @Req() request: any,
  ): Promise<Comment> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);
    createCommentDto.writer = json.id;

    const comment = await this.commentservice.create(createCommentDto);

    return comment;
  }

  @Get('/')
  @HttpCode(200)
  async findAll(): Promise<Comment[]> {
    return this.commentservice.findAll();
  }

  @Get('/:original')
  @HttpCode(200)
  async find(@Param('original') original: string): Promise<Comment[]> {
    return this.commentservice.findByOriginalId(original);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(@Req() request: any, @Param('id') id: string): Promise<Comment> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    return this.commentservice.delete(json.id, id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Req() request: any,
    @Param('id') id: string,
    @Body(ValidationPipe) updateCommentDTO: CreateCommentDto,
  ): Promise<Comment> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authservice.verifyToken(jwt);

    return this.commentservice.update(json.id, id, updateCommentDTO);
  }
}
