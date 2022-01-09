import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentservice: CommentsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentservice.create(createCommentDto);

    return comment;
  }

  @Get('/:original')
  @HttpCode(200)
  async find(@Param('original') original: ObjectId): Promise<Comment[]> {
    return this.commentservice.findByOriginalId(original);
  }
}
