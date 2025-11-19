import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  productId: number;
}