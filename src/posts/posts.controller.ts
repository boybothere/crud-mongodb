import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto)
    }
}
