import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(commentdto: CreateCommentDto): Promise<Comment> {
    const comment = {
      ...commentdto,
    };
    const result = await this.commentModel.create(comment);

    return result;
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.find();

    return comments;
  }

  async find(id: string): Promise<Comment> {
    const comment = await this.commentModel.findOne({ id });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    return comment;
  }

  async findByOriginalId(original: string): Promise<Comment[]> {
    const comment = await this.commentModel.find({ original });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    }

    return comment;
  }

  async update(
    userid: string,
    id: string,
    commentdto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentModel.findOne({ id });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    } else if (comment.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.commentModel.findOneAndUpdate(
      { id },
      commentdto,
    );

    return result;
  }

  async delete(userid: string, id: string): Promise<Comment> {
    const comment = await this.commentModel.findOne({ id });
    if (!comment) {
      throw new Error('댓글을 찾을 수 없습니다.');
    } else if (comment.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.commentModel.findOneAndDelete({ id });

    return result;
  }
}
