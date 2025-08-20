import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    userId: string

    @IsString()
    @MaxLength(100)
    title: string

    @IsString()
    @MaxLength(100)
    contents: string
}