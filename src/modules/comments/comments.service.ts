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
      throw new Error('Comment not found');
    }

    return comment;
  }

  async findByOriginalId(original: ObjectId): Promise<Comment[]> {
    const comment = await this.commentModel.find({ original });
    if (!comment) {
      throw new Error('Comment not found');
    }

    return comment;
  }

  async update(id: string, commentdto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.findOneAndUpdate(
      { id },
      commentdto,
    );

    return comment;
  }
}
