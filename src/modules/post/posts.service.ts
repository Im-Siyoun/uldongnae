import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async create(postdto: CreatePostDto): Promise<Post> {
    const post = {
      ...postdto,
    };
    const result = await this.postModel.create(post);

    return result;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find();

    return posts;
  }

  async find(id: string): Promise<Post> {
    const post = await this.postModel.findOne({ id });
    if (!post) {
      throw new Error('글을 찾지 못했습니다.');
    }

    return post;
  }

  async findByOriginalId(original: ObjectId): Promise<Post> {
    const post = await this.postModel.findOne({ original });
    if (!post) {
      throw new Error('글을 찾지 못했습니다.');
    }

    return post;
  }

  async update(
    userid: string,
    id: string,
    postdto: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.postModel.findOne({ id });
    if (!post) {
      throw new Error('글을 찾지 못했습니다.');
    } else if (post.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.postModel.findOneAndUpdate(
      { id },
      postdto,
    );

    return result;
  }

  async delete(userid: string, id: string): Promise<Post> {
    const post = await this.postModel.findOne({ id });
    if (!post) {
      throw new Error('글을 찾지 못했습니다.');
    } else if (post.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.postModel.findOneAndDelete({ id });

    return result;
  }
}
