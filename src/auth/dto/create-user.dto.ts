import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  @ApiProperty({ example: 'username' })
  public name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  public age: number;

  @IsString()
  @Length(2, 10)
  public city: string;

  @IsString()
  @Length(2, 20)
  @IsNotEmpty()
  public password: string;
  // public posts?: CreatePostsDto[];
  // public comments?: CommentCreateDto[];
}