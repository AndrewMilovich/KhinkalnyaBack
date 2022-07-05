import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsEmail()
  @IsString()
  public email: string;
  @IsString()
  @IsNotEmpty()
  public name: string;
  @IsNumber()
  public age: number;
  @IsString()
  public city: string;
  @IsBoolean()
  public status?: boolean;
  @IsString()
  readonly password: string;
}
