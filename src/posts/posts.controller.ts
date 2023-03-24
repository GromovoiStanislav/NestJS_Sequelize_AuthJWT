import { Body, Controller, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";


@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto,
             @UploadedFile() image,
             @Request() req
  ) {
    const userId = req.user.id;
    return this.postService.create(userId, dto, image);
  }


}
