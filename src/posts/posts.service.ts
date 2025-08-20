import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<Post>,
        private readonly usersService: UsersService
    ) { }

    async createPost(createPostDto: CreatePostDto) {
        const user = await this.usersService.getUserById(createPostDto.userId)
        if (!user) throw new NotFoundException(`User with ID ${createPostDto.userId} not found!`)
        const newPost = await this.postModel.create(createPostDto)
        const savedPost = await newPost.save()
        await user.updateOne(
            {
                $push: {
                    posts: savedPost._id
                }
            })
        return savedPost
    }
}
